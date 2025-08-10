import "../../css/ForecastList.css"
import ForecastCard from "./ForecastCard";

export default function ForecastList({ weatherInfo }) {

    if (!weatherInfo || !weatherInfo.daily) {
        return (
            <p>Loading weather data...</p>
        );
    }

    const forecast = weatherInfo.daily.slice(0, 5)

    return (
        <div className="forecast-container">
            {forecast.map((day, index) => {
                return (
                    <ForecastCard key={index} dayData={day} />)
            })}
        </div>
    )
}