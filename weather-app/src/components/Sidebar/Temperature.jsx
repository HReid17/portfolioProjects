import "../../css/temperature.css"

export default function Temperature({temp}) {

    if(!temp) return null;

    const tempCelsius = Math.round(temp - 273.15)

    return(
        <h2 className="temp">{tempCelsius}°</h2>
    )
}