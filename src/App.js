import Search from './WeatherApp/search';
import './App.css';
import CurrentWeather from './WeatherApp/currentWeather/currentWeather';
import { weatherapiurl, weatherapikey } from './api';
import { useState } from 'react';

function App() {
  const [currentWeather, setCurrentWeather] = useState(null)

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");

    const currentWeatherFetch = fetch(`${weatherapiurl}/weather?lat=${lat}&lon=${lon}&appid=${weatherapikey}&units=metric`)

    Promise.all([currentWeatherFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();

        setCurrentWeather({ city: searchData.label, ...weatherResponse });
      })
      .catch((err) => console.log(err));
  }

  console.log(currentWeather)

  return (
    <div className="bg">
      <div className="container">
        <Search onSearchChange={handleOnSearchChange} />
        {currentWeather && <CurrentWeather data={currentWeather} />}
      </div>
    </div>
  );
}

export default App;
