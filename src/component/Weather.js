import React, { useEffect, useRef, useState } from "react";
import clear_icon from "../assets/images/clear.png";
import cloud_icon from "../assets/images/cloud.png";
import drizzle_icon from "../assets/images/drizzle.png";
import humidity_icon from "../assets/images/humidity.png";
import rain_icon from "../assets/images/rain.png";
import search_icon from "../assets/images/search.png";
import snow_icon from "../assets/images/snow.png";
import wind_icon from "../assets/images/wind.png";
import "./Weather.css";

export default function Weather() {

  const inputRef = useRef()

  const [wetherData, setWetherData] = useState(false);
    const apiKey="4a6bd49c80fb8438de5b70808ff45a60"
 
  const search1 = async (city) => {
    if(city === ""){
      alert("Enter city name")
      return
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
      const response = await fetch(url);
      const data = await response.json();
      if(!response.ok){
        alert("city not found")
      }
      console.log(data);
      setWetherData({
        humidity:data.main.humidity,
        windSpeed:data.wind.speed,
        temprature:data.main.temp,
        location:data.name,
        icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`      
      })
    } catch (error) {}
  };

  useEffect(() => {
    search1();
  }, []);

  return (
    <div className="weather">
      <div className="search-bar">
        <input ref={inputRef} type="text" placeholder="Search" />
        <img src={search_icon} alt="Loading" onClick={()=>search1(inputRef.current.value)}/>
      </div>
      <img src={wetherData.icon} alt="loading" className="weather-icon" />
      <p className="temprature">{Math.floor(wetherData.temprature)}&#8451;</p>
      <p className="location">{wetherData.location}</p>
      <div className="weather-data">
        <div className="col">
          <img src={humidity_icon} alt="Loading" />
          <div>
            <p>{wetherData.humidity}%</p>
            <span>humidity</span>
          </div>
        </div>
        <div className="col">
          <img src={wind_icon} alt="Loading" />
          <div>
            <p>{wetherData.windSpeed}km/h</p>
            <span>WindSpeed</span>
          </div>
        </div>
      </div>
    </div>
  );
}
