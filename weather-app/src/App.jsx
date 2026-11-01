
import "./App.css";
import { useState, useEffect } from "react";
const API_KEY = "4c1b9008bddb5c3f38c7aa12be272143";
function App() {  
const [city, setCity] = useState("Ahmedabad");
const [search, setSearch] = useState("");
const [weather, setWeather] = useState(null);
const [loading, setLoading] = useState(false);
const [error, setError] = useState("");

async function fetchWeather(cityName) {
  setLoading(true);
  setError("");

  try {
    const apiKey = API_KEY;

    const response = await fetch(
      'https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cityName)}&appid=${apiKey}&units=metric'
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Weather fetch nahi hua");
    }

    setWeather(data);
    setCity(data.name);
  } catch (err) {
    setError(err.message);
    setWeather(null);
  } finally {
    setLoading(false);
  }
}
  return (
    <div className="app">
      <h1>🌦️ Weather App</h1>
      <p>Check the weather in your city</p>

      <div className="search-box">
        <input
          type="text"
          placeholder="Enter city name..."
             value={search}
             onChange={(e) => setSearch(e.target.value)}
        />
        

<button
  onClick={() => {
    if (search.trim() !== "") {
      fetchWeather(search.trim());
      setSearch("");
    }
  }}
>
  Search
</button>


      </div>
      {loading && <p>Loading weather...</p>}
      {error && <p>{error}</p>}
      <div className="weather-card">
        <h2>{city}</h2>
        <div className="weather-icon">☀️</div>
        <h1>{weather ? `${Math.round(weather.main.temp)}°C` : "--°C"}</h1>
        
<p>
  {weather
    ? weather.weather[0].description
    : "Search a city to see its weather"}
</p>


        <div className="weather-details">
          <div>
            <h3>💧 {weather ? weather.main.humidity : "--"}%</h3>
            <p>Humidity</p>
          </div>

          <div>
            <h3>🌬️ {weather ? Math.round(weather.wind.speed * 3.6) : "--"} km/h</h3>
            <p>Wind Speed</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
