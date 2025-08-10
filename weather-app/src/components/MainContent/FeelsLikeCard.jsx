export default function FeelsLikeCard({ feelsLike }) {

    if (feelsLike == null) return null;

    const feelsLikeCelsius = Math.round(feelsLike - 273.15)

    return (
        <div className="feels-container">
            <p>Feels Like</p>
            <h2>{feelsLikeCelsius} °</h2>
        </div>
    )
}