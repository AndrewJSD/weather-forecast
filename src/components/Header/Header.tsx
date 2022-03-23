import style from "./Header.module.scss";
import { useContext } from "react";
import { Context } from "../..";

const Header = () => {
  const { store } = useContext(Context);
  const date = new Date(store.forecast[0].dt * 1000).toLocaleDateString("en-GB", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return (
    <div className={style.header}>
      <span>{store.city.name}, {store.city.country}</span>
      <span>{date}</span>
    </div>
  )
}

export default Header