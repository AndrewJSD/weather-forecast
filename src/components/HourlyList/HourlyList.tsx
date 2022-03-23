import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { Context } from '../..';
import HourlyCard from './HourlyCard/HourlyCard';
import style from "./HourlyList.module.scss";

const HourlyList = () => {
  const { store } = useContext(Context);
  const dailyData = store.dailyData;

  const hourlyCards = dailyData.map(item => {
    return <HourlyCard data={item} key={item.dt} />
  });

  return (
    <div className={style.list}>{hourlyCards}</div>
  )
}

export default observer(HourlyList);