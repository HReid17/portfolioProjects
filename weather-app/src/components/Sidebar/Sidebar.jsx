import WeatherIcon from "./WeatherIcon"
import Temperature from "./Temperature"
import Location from "./Location"
import "../../css/sidebar.css"


export default function Sidebar({ weatherInfo, submittedSearch }) {

    if (!weatherInfo || !weatherInfo.current || !weatherInfo.current.weather || !weatherInfo.current.weather[0]) {
        return (
            <div className="sidebar-container">
                <p>Loading weather data...</p>
            </div>
        );
    }

    const iconCode = weatherInfo.current.weather[0].icon
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`

    return (
        <div className="sidebar-container">
            <WeatherIcon icon={iconUrl} />
            <Temperature temp={weatherInfo.current.temp}/>
            <Location location={submittedSearch}/>
        </div>
    )
}