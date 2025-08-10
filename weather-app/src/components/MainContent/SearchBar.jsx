// =========================
// Imports
// =========================
import "../../css/searchbar.css"
import { locationData, weatherData } from "../../services/api";
import { useState, useEffect } from "react";

export default function SearchBar({ setWeatherInfo, setSubmittedSearch }) {

    // =========================
    // State Variables
    // =========================
    const [searchInput, setSearchInput] = useState("")
    const [coordinates, setCoordinates] = useState({})
    const [favourites, setFavourites] = useState([])
    const [toggleFavourites, setToggleFavourites] = useState(false)
    const [popupMessage, setPopupMessage] = useState("")

    // =========================
    // Search & Location Handling
    // =========================
    async function searchFunc(e) {
        if (e.key === "Enter") {
            const trimmedInput = searchInput.trim()
            if (!trimmedInput) return;

            const locationResult = await locationData(trimmedInput);

            if (locationResult.length > 0) {
                const locationInfo = locationResult[0]
                const { name, lat, lon, country, state } = locationInfo

                setCoordinates({ lat, lon })
                setSearchInput(trimmedInput)
                setSubmittedSearch(trimmedInput);

                console.log(`Location: ${name}, ${state ? state + ", " : ""}${country}`);
                console.log(`Latitude: ${lat}, Longitude: ${lon}`);
            } else {
                console.log("Location not found.")
                showPopup(`Location: ${searchInput} was not found...`)
            }
        }
    }

    // Fetch weather data when coordinates update
    useEffect(() => {
        if (coordinates.lat && coordinates.lon) {
            const fetchWeather = async () => {
                try {
                    const weatherResult = await weatherData(coordinates.lat, coordinates.lon)
                    setWeatherInfo(weatherResult)
                    console.log("Weather Data:", weatherResult)
                } catch (error) {
                    console.error("Failed to fetch weather data:", error)
                }
            };
            fetchWeather();
        }
    }, [coordinates])

    // =========================
    // Popup Message Handling
    // =========================
    function showPopup(errorMessage) {
        setPopupMessage(errorMessage);
        setTimeout(() => setPopupMessage(""), 3000)
    }

    // =========================
    // Favourites Management
    // =========================
    async function saveLocation() {
        const trimmedInput = searchInput.trim();
        if (trimmedInput === "") return;

        const isDuplicate = favourites.some(
            fav => fav.toLowerCase() === trimmedInput.toLowerCase()
        );
        if (isDuplicate) {
            showPopup(`"${trimmedInput}" is already in your favourites.`);
            return;
        }

        const locationResult = await locationData(trimmedInput);
        if (locationResult.length === 0) {
            showPopup(`Oops, "${trimmedInput}" was not found.`);
            return;
        }

        setFavourites(prev => [...prev, trimmedInput]);
        console.log("Added to favourites:", trimmedInput);
    }

    useEffect(() => {
        console.log("Favourites updated:", favourites);
    }, [favourites]);

    function viewSavedLocation() {
        setToggleFavourites(prev => !prev)
    }

    async function handleFavouriteClick(location) {
        const locationResult = await locationData(location);

        if (locationResult.length > 0) {
            const { lat, lon } = locationResult[0];
            setCoordinates({ lat, lon });
            setWeatherInfo(await weatherData(lat, lon));
            setSubmittedSearch(location);
            setToggleFavourites(false);
        } else {
            showPopup(`Oops! "${location}" was not found...`);
        }
    }

    // =========================
    // JSX Return
    // =========================
    return (
        <div className="search-container">

            {/* Search Input */}
            <input
                className="my-searchbar"
                type="text"
                placeholder="Search for places eg: London..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={searchFunc}
            />

            {/* Popup Message */}
            {popupMessage && (
                <div className="popup-message">{popupMessage}</div>
            )}

            {/* Save Location Button */}
            <div className="input-buttons">
                <button className="save" onClick={saveLocation}>Save Location</button>
            </div>

            {/* My Locations Dropdown */}
            <div className="dropdown">
                <button className="dropbtn" onClick={viewSavedLocation}>
                    My Locations
                </button>
            </div>

            {/* Favourite Locations List */}
            {toggleFavourites && (
                <div className="dropdown-content">
                    {favourites.length > 0 ? (
                        favourites.map((location, index) => (
                            <button
                                key={index}
                                onClick={() => handleFavouriteClick(location)}
                            >
                                {location}
                            </button>
                        ))
                    ) : (
                        <span>No saved Locations...</span>
                    )}
                </div>
            )}
        </div>
    )
}
