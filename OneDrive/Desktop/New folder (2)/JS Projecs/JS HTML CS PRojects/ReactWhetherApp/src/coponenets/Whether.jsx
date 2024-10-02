import { useEffect, useRef, useState } from "react";
import search_icon from "../assets/images/search.png";
import humidity_icon from "../assets/images/humidity.png";
import { allIcons } from "./utils/constant";
import "./Whether.css";

const Whether = () => {
  const inputRef = useRef();
  const [wetherData, setWetherData] = useState(false);

  console.log("hello");

  const search = async (city) => {
    if (city === "" || undefined || null) {
      alert("Enter City Name");
      return;
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${
        import.meta.env.VITE_APP_ID
      }&units=metric`;

      const response = await fetch(url);
      const data = await response.json();
      console.log(data);

      if (!response.ok) {
        alert(data.message);
        return;
      }

      const icon = allIcons[data.weather[0].icon] || allIcons[0];
      setWetherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temprature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
      });
    } catch (error) {
      setWetherData(false);
      console.log(error);

      console.error("error in fetching data");
    }
  };

  useEffect(() => {
    search("London");
  }, []);

  return (
    <div className="weather">
      {/* this is for search bar*/}
      <div className="search-bar">
        <input ref={inputRef} type="text" placeholder="city name"></input>
        <img
          src={search_icon}
          alt=""
          onClick={() => search(inputRef.current.value)}
        />
      </div>
      {/* this is for main weather data*/}
      {wetherData ? (
        <>
          <div>
            <img src={allIcons[0]} alt="" className="weather-icon" />
            <p className="temperature">{wetherData.temprature}°C</p>
            <p className="cityName">{wetherData.location}</p>
            <div className="weather-data">
              <div className="col">
                <img src={humidity_icon} alt="" />
                <div>
                  <p>{wetherData.humidity}%</p>
                  <span>Humidity</span>
                </div>
              </div>
              <div className="col">
                <img src={wetherData.icon} alt="" />
                <div>
                  <p>{wetherData.windSpeed}km/h</p>
                  <span>Wind Speed</span>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Whether;
