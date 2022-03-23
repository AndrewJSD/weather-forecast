import React from 'react'
import { iPoint } from '../../../store/store'
import style from "./HourlyCard.module.scss";

const HourlyCard: React.FC<{data: iPoint}> = ({ data }) => {

  return (
    <div className={style.card}>
      <p className={style.time}>{data.dt_txt}</p>
      <p>Temperature: {data.main.temp}°C</p>
      <p>Feels like: {data.main.feels_like}°C</p>
      <p>Min: {data.main.temp_min}</p>
      <p>Max: {data.main.temp_max}</p>
      <p>Pressure: {data.main.pressure}</p>
      <p>Sea level: {data.main.sea_level}</p>
      <p>Ground level: {data.main.grnd_level}</p>
      <p>Humidity: {data.main.humidity}</p>
      <p>Wind speed: {data.wind.speed}</p>
      <p>Wind direction: {data.wind.deg}</p>
      <p>Wind gusts: {data.wind.gust}</p>
      <p>Visibility: {data.visibility}</p>
      <p>Weather: {data.weather[0].description}</p>
    </div>
  )
}

export default HourlyCard