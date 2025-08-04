const axios = require("axios");
const { KEY_AQI, KEY_OPENWEATHER } = require("../config/config.js");

const getPollution = async (lat, lon) => {
  try {
    const result = (
      await axios.get(
        `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${KEY_OPENWEATHER}`
      )
    ).data;
    return {
      PM10: result.list[0].components.pm10,
      PM2_5: result.list[0].components.pm2_5,
      CO: result.list[0].components.co,
      SO2: result.list[0].components.so2,
      NO2: result.list[0].components.no2,
    };
  } catch (error) {
    console.log("Failed for get Pollution", error);
    return Error("Failed for get Pollution", error);
  }
};

const getWeather = async (lat, lon) => {
  try {
    const result = (
      await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${KEY_OPENWEATHER}&units=metrics`
      )
    ).data;

    return {
      Temperature: result.main.temp,
      Humidity: result.main.humidity,
      Wind_Speed: result.wind.speed,
    };
  } catch (error) {
    console.log("Failed for get Weather", error);
    return Error("Failed for get Weather", error);
  }
};

const getCity = async (name) => {
  try {
    const result = (
      await axios.get(
        `http://api.openweathermap.org/geo/1.0/direct?q=${name}&appid=${KEY_OPENWEATHER}`
      )
    ).data;
    return {
      city: result[0].name,
      lat: result[0].lat,
      lon: result[0].lon,
    };
  } catch (error) {
    console.log("Failed for get City", error.message);
    return Error("Failed for get City", error.message);
  }
};

const getAQI = async (lat, lon) => {
  try {
    const result = (
      await axios.get(
        `https://api.waqi.info/feed/geo:${lat};${lon}/?token=${KEY_AQI}`
      )
    ).data;
    return {
      AQI: result.data.aqi,
    };
  } catch (error) {
    console.log("Failed for get AQI", error);
    return Error("Failed for get AQI", error);
  }
};
const getForecasting = async (lat, lon) => {};

module.exports = {
  getAQI,
  getCity,
  getPollution,
  getWeather,
};
