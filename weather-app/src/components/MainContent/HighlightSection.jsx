import "../../css/highlightSection.css"
import FeelsLikeCard from "./FeelsLikeCard";
import WindStatusCard from "./WindStatusCard";
import Sunrise from "./SunriseCard";
import Sunset from "./SunsetCard";

export default function HighlightSection({ weatherInfo }) {

    console.log("weatherInfo in HighlightSection:", weatherInfo);

    if (!weatherInfo || !weatherInfo.current) {
        return (
            <div className="highlights-container">
                <h3>Today's Highlights</h3>
                <p>Loading weather data...</p>
            </div>
        );
    }

    return (
        <div className="highlights-container">
            <h3>Today's Highlights</h3>
            <div className="highlight-comps">
                <FeelsLikeCard feelsLike={weatherInfo.current.feels_like} />
                <WindStatusCard speed={weatherInfo.current.wind_speed} dir={weatherInfo.current.wind_deg} />
                <Sunrise time={weatherInfo.current.sunrise} />
                <Sunset time={weatherInfo.current.sunset} />
            </div>
        </div>
    )
}