import "../../css/icon.css"

export default function WeatherIcon({icon}) {

    if(!icon) return null;

    return(
        <img className="weather-icon" src={icon} alt="weather-icon" />
    )
}