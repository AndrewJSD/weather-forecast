import { useContext } from 'react'
import { Context } from '../..'
import { observer } from 'mobx-react-lite'
import FiveDaysCard from './FiveDaysCard/FiveDaysCard';
import style from "./FiveDaysList.module.scss";

const FiveDaysList = () => {
  const { store } = useContext(Context);
  const dates = Array.from(new Set(store.forecast.map(item => item.dt_txt.split(" ")[0])));

  const fiveDaysCards = dates.map(date => {
    return <FiveDaysCard 
      key={date} 
      data={store.forecast.filter(item => item.dt_txt.match(date))}
      city={store.city}
      />
  });

  return (
    <div className={style.list}>{fiveDaysCards}</div>
  )
}

export default observer(FiveDaysList);