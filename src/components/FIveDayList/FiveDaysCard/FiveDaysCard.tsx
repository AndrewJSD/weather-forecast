import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Context } from '../../..';
import { iCity, iPoint } from '../../../store/store';
import style from "./FiveDaysCard.module.scss";

const FiveDaysCard: React.FC<{data: iPoint[], city: iCity}> = ({data, city}) => {
  const { store } = useContext(Context);
  const minTemp = Math.floor(Math.min(...data.map(item => item.main.temp_min))) + "°C";
  const maxTemp = Math.floor(Math.max(...data.map(item => item.main.temp_max))) + "°C";

  const sunrise = new Date(city.sunrise * 1000)
    .toLocaleTimeString("it-IT")
    .split(":")
    .slice(0, 2)
    .join(":");

  const sunset = new Date(city.sunset * 1000)
    .toLocaleTimeString("it-IT")
    .split(":")
    .slice(0, 2)
    .join(":");

  const date = new Date(data[0].dt_txt.split(" ")[0]).toLocaleDateString("en-GB", {
    month: "long",
    day: "numeric",
  });

  const handleClick = () => {
    store.selectedDate = data[0].dt_txt.split(" ")[0];
  }

  return (
    <div className={style.card} onClick={handleClick}>
      <p className={style.date}>{date}</p>
      <p className={style.min}>Low: {minTemp}</p>
      <p className={style.max}>High: {maxTemp}</p>
      <p className={style.sunrise}>Sunrise: {sunrise}</p>
      <p className={style.sunset}>Sunset: {sunset}</p>
    </div>
  )
}

export default observer(FiveDaysCard);