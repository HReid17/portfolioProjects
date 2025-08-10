export default function Sunrise({time}) {

    if(!time) return null;

    const sunriseTime = new Date(time * 1000).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
    });

    return (
        <div className="sunrise-container">
            <p>Sunrise</p>
            <h2>{sunriseTime}</h2>
        </div>)
}