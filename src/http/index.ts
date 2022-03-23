import axios from "axios";

const API_KEY = "a3669e93d9d3c02501dbfd2f7021d65f"
const API_URL = "https://api.openweathermap.org/data/2.5/forecast"

const $api = axios.create({
  baseURL: API_URL,
  params: {
    appid: API_KEY,
  }
})

export default $api;