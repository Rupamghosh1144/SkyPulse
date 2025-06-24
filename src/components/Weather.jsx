import React, { useEffect,useRef, useState } from 'react'
import './Weather.css'
import search_icon from '../assets/search.png'
import clear_icon from '../assets/clear.png'
import cloud_icon from '../assets/cloud.png'
import drizzle_icon from '../assets/drizzle.png'
import rain_icon from '../assets/rain.png'
import snow_icon from '../assets/snow.png'
import wind_icon from '../assets/wind.png'
import humidity_icon from '../assets/humidity.png'

const Weather = () => {
  const inputRef =useRef()

  const [weatherData, setWeatherData]= useState(false);
  const allIcon={
    "01d": clear_icon,
    "01n": clear_icon,
    "02d":cloud_icon,
    "02n":cloud_icon,
    "03d":cloud_icon,
    "03n":cloud_icon,
    "04d":drizzle_icon,
    "04n":drizzle_icon,
    "09d":rain_icon,
    "09n":rain_icon,
    "10d":rain_icon,
    "10n":rain_icon,
    "13d":snow_icon,
    "13n":snow_icon,
  }

  const search =async(city)=>{
    if(city === ""){
      alert("Enter City Name Please");
      return;
    }
    try{
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=3e614ccf85d1cae6ed0db2d41d111a47`;


      const response = await fetch(url);
      const data=await response.json();

      if(!response.ok){
        alert(data.message);
      }


      console.log(data);
      const icon = allIcon[data.weather[0].icon] || clear_icon;

      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
        weather_rep:data.weather[0].main,
        min:Math.floor(data.main.temp_min),
        max:Math.floor(data.main.temp_max),
      })
    }catch(error){
      setWeatherData(false);
      console.error("Error in fetching weathing data")
    }
  }

  useEffect(()=>{
    search("Delhi");
  },[])

  return (
    <div className="weather">
      <div className="search-bar">
        <input ref={inputRef} type="text" placeholder='Search' />
        <img src={search_icon} alt="search Image" onClick={()=>search(inputRef.current.value)}/>
      </div>

      {weatherData?<>
      <img src={weatherData.icon} alt="clear image"  className='weather-icon'/>
      <p className='temparature'>{weatherData.temperature}°C</p>
      <p className='location'>{weatherData.location}</p>

      <div className="weather-data">
        <div className="col">
          <img src={humidity_icon} alt="humidity image" />
          <div>
            <p>{weatherData.humidity} %</p>
            <span>Humidity</span>
          </div>
        </div>

        <div className="col">
          <img src={wind_icon} alt="wind image" />
          <div>
            <p>{weatherData.windSpeed} Km/h</p>
            <span>Wind Speed</span>
          </div>
        </div>
      </div>
      <div className="status">
        <p>Weather Status: {weatherData.weather_rep}</p>
      </div>
      </>:<></>}


      
    </div>
  )
}

export default Weather
