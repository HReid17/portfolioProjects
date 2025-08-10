import Sidebar from "./components/Sidebar/Sidebar"
import SearchBar from "./components/MainContent/SearchBar"
import ForecastList from "./components/MainContent/ForecastList"
import HighlightSection from "./components/MainContent/HighlightSection"
import { useState } from "react"
import "./css/app.css"

export default function App() {

  const [weatherInfo, setWeatherInfo] = useState(null)
  const [submittedSearch, setSubmittedSearch] = useState("")

  const currentHour = new Date().getHours()
  const isDayTime = currentHour >= 6 && currentHour < 18

  return (

    <div className="app">
      <aside className="sidebar">
        <h1>Weather-app</h1>
        <Sidebar weatherInfo={weatherInfo} submittedSearch={submittedSearch} />
      </aside>

      <main className={`main-content ${isDayTime ? "light" : "dark"}`} >
        <SearchBar setWeatherInfo={setWeatherInfo} setSubmittedSearch={setSubmittedSearch} />
        <ForecastList weatherInfo={weatherInfo} />
        <HighlightSection weatherInfo={weatherInfo} />
      </main>
    </div>
  )
}