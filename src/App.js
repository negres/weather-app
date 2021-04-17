import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [location, setLocation] = useState(false);
  const [weather, setWeather] = useState(false);

  const appIdKey = `fa8f3a2f4d059a0d9fa0af2d23cd7d13`;

  let getWeather = async (lat, long, appid) => {
    let response = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${appid}&units=metric`
    );
    setWeather(response.data);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      getWeather(position.coords.latitude, position.coords.longitude, appIdKey);
      setLocation(true);
    });
  }, [appIdKey]);

  if (location === false) {
    return (
      <div>
        <h1>Você precisa habilitar a localização no browser!</h1>
      </div>
    );
  } else if (weather === false) {
    return (
      <h1>Carregando...</h1>
    );
  } else {
    const { main } = weather;
    return (
      <div className="App">
        <h3>Clima nas suas coordenadas </h3>
        <ul>
          <li>Temperatura atual: {Math.trunc(main.temp)}°C</li>
          <li>Temperatura máxima: {Math.trunc(main.temp_max)}°C</li>
          <li>Temperatura mínima: {Math.trunc(main.temp_min)}°C</li>
          <li>Umidade: {weather.main.humidity}</li>
        </ul>
      </div>
    );
  }
}

export default App;
