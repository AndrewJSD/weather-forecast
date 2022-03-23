import style from "./Preloader.module.scss";
import cloud from "../../assets/svg/rainy-outline.svg";
export const Preloader: React.FC = () => {
  return(
    <div className={style.container}>
      <img src={cloud} alt="cloud" />
      <h4>Loading...</h4>
    </div>
    )
}