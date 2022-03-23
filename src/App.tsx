import "./App.scss";
import { observer } from "mobx-react-lite";
import { useContext, useEffect } from "react";
import { Context } from ".";
import { Preloader } from "./components/Preloader/Preloader";

import Header from "./components/Header/Header";
import FiveDaysList from "./components/FIveDayList/FiveDaysList";
import HourlyList from "./components/HourlyList/HourlyList";

const App: React.FC = () => {
  const { store } = useContext(Context);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      pos => store.fetchForecast(pos.coords.latitude, pos.coords.longitude),
      _ => store.fetchForecast("Riga"));
  }, [store])

  if (store.isLoading) {
    return <Preloader />
  }
  
  return (
    <div className="App">
      <Header />
      <FiveDaysList />
      <HourlyList />
    </div>
  );
}

export default observer(App);
