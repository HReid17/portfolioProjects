export default function ForecastCard({ dayData }) {

    const date = new Date(dayData.dt * 1000).toLocaleDateString("en-GB", {
        weekday: "short",
    });

    const iconCode = dayData.weather[0].icon
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`

    const tempCelsius = Math.round(dayData.temp.day - 273)

    return (
        <div className="forecast-card">
            <h2 className="date">{date}</h2>
            <img className="forecast-weather-icon" src={iconUrl} alt="forecast-weather-icon" />
            <h2 className="forecast-temp">{tempCelsius}°</h2>
        </div>
    )
}