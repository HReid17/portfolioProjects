export default function WindStatusCard({ speed, dir }) {

    // =========================
    // 1. Guard clause — No data
    // =========================
    if (speed == null || dir == null) return null;

    // =========================
    // 2. Helper function — Convert degrees to compass direction
    // =========================
    function getWindDirection(degrees) {
        const directions = [
            "N", "NNE", "NE", "ENE",
            "E", "ESE", "SE", "SSE",
            "S", "SSW", "SW", "WSW",
            "W", "WNW", "NW", "NNW"
        ];

        const index = Math.round(degrees / 22.5) % 16;
        return directions[index];
    }

    // =========================
    // 3. Wind calculations
    // =========================
    const windSpeedMph = speed * 2.23694; // m/s → mph
    const windSpeed = windSpeedMph.toFixed(1); 
    const windDirection = getWindDirection(dir);
    const windGusts = Math.round(windSpeed * 1.6); // gust estimate

    // =========================
    // 4. Render wind card
    // =========================
    return (
        <div className="wind-status-container">
            <p>Wind</p>
            <h4>Speed: {windSpeed} Mph</h4>
            <h4>Estimated Gust: {windGusts} Mph</h4>
            <h4>Direction: {windDirection}</h4>
        </div>
    );
}
