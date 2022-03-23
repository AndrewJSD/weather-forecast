import { makeAutoObservable, runInAction } from "mobx";
import $api from "../http";

export interface iCity {
  id: number;
  name: string;
  coord: {
    lat: number;
    lon: number;
  };
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
}

export interface iMain {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  sea_level: number;
  grnd_level: number;
  humidity: number;
  temp_kf: number;
}

export interface iWeather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface iWind {
  speed: number;
  deg: number;
  gust: number;
}

export interface iPoint {
  dt: number;
  main: iMain;
  weather: iWeather[];
  clouds: {
    all: number
  };
  wind: iWind;
  visibility: number;
  pop: number;
  sys: {
    pod: string;
  };
  dt_txt: string;
}

export interface iForecast {
  cod: number;
  cnt: number;
  message: string;
  city: iCity;
  list: iPoint[];
}

export default class Store {
  private _isLoading = true;
  private _forecast = {} as iForecast;
  private _selectedDate = "";

  constructor() {
    makeAutoObservable(this);
  }
  
  public get selectedDate() {
    return this._selectedDate;
  }

  public set selectedDate(date: string) {
    this._selectedDate = date;
  }

  public get city() {
    const { city } = this._forecast;
    return city;
  }

  public get forecast() {
    const { list } = this._forecast;
    return list;
  }

  public get isLoading() {
    return this._isLoading;
  }

  public set isLoading(bool: boolean) {
    this._isLoading = bool;
  }

  public get dailyData() {
    return this._forecast.list.filter(item => item.dt_txt.includes(this._selectedDate));
  }

  public async fetchForecast(city: string): Promise<void>
  public async fetchForecast(latitude: number, longitude: number): Promise<void>
  public async fetchForecast(firstArg: string | number, secondArg?: number): Promise<void> {

    type PositionParams = {
      lat: number;
      lon: number;
      units?: "metric" | "imperial";
    };
    
    type CityParams = {
      q: string;
      units?: "metric" | "imperial";
    };

    const params: PositionParams | CityParams = typeof firstArg === "number" ? {
      lat: firstArg,
      lon: secondArg as number,
      units: "metric"
    } : {
      q: firstArg,
      units: "metric"
    }

    try {
      const response = await $api.get<iForecast>("", {params: params});
      runInAction(() => {
        this._forecast = response.data;
        this._selectedDate = response.data.list[0].dt_txt.split(" ")[0];
      });
    } catch (e) {
      console.log(e);
    } finally {
      this.isLoading = false;
    }
  }
}