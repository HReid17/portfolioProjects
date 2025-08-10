export default function Sunset({time}) {

    if(!time) return null;

    const sunsetTime = new Date(time * 1000).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
    });

    return (
        <div className="sunset-container">
            <p>Sunset</p>
            <h2>{sunsetTime}</h2>
        </div>)
}