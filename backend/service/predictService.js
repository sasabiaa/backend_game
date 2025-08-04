const axios = require("axios");
const { getAQI, getCity, getPollution, getWeather } = require("./ext-api.js");
const City = require("../model/cityModel.js");

const getListCity = async (name) => {
  try {
    const mainCity = await getCity(name);
    const nearCities = await City.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [parseFloat(mainCity.lon), parseFloat(mainCity.lat)],
          },
        },
      },
    }).limit(10);
    const filter = nearCities.filter((city) => city.city !== mainCity.city);
    filter.push({
      city: mainCity.city,
      location: {
        type: "Point",
        coordinates: [parseFloat(mainCity.lon), parseFloat(mainCity.lat)],
      },
    });

    return filter;
  } catch (error) {
    console.log("Something wrong when get city", error.message);
    return new Error("Something wrong when get city", error.message);
  }
};

const getInputData = async (lat, lon) => {
  const [pollution, weather] = await Promise.all([
    getPollution(lat, lon),
    getWeather(lat, lon),
  ]);
  return {
    PM2_5: pollution.PM2_5,
    PM10: pollution.PM10,
    CO: pollution.CO,
    SO2: pollution.SO2,
    NO2: pollution.NO2,
    Humidity: weather.Humidity,
    Temperature: weather.Temperature,
  };
};

const getHealthLabel = async (inputData) => {
  try {
    const result = (
      await axios.post("http://127.0.0.1:5000/predict/health", inputData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
    ).data;
    return result.prediction_label;
  } catch (error) {
    console.log("Something wrong when get health label", error.message);
    return new Error("Something wrong when get health label", error.message);
  }
};

const getRecomendedPlant = async (inputData) => {
  try {
    const result = (
      await axios.post("http://127.0.0.1:5000/predict/plant", inputData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
    ).data;
    return result;
  } catch (error) {
    console.log("Something wrong when get plant", error.message);
    return new Error("Something wrong when get plant", error.message);
  }
};

const getPredictResult = async (city) => {
  try {
    const listCity = await getListCity(city);
    const result = await listCity.map(async (city) => {
      const lat = city.location.coordinates[1];
      const lon = city.location.coordinates[0];
      const inputData = await getInputData(lat, lon);
      const healtLabel = await getHealthLabel(inputData);
      const AQI = await getAQI(lat, lon);
      const plantResult = await getRecomendedPlant(inputData);
      const plantRecomendation = plantResult.Plant_Recomend.slice(0, 3);
      // console.log(plantRecomendation);
      return {
        geometry: {
          type: "Point",
          coordinates: [lon, lat],
        },
        city: city.city,
        AQI: AQI.AQI,
        health: healtLabel,
        property: inputData,
        plantRecomendation,
      };
    });

    const finalResult = await Promise.all(result);
    console.log(finalResult);
    return finalResult;
  } catch (error) {
    console.log("Something wrong when get Result", error.message);
    return new Error("Something wrong when get Result", error.message);
  }
};

const getDiseaseResult = async (name, cough, fever, fatigue) => {
  try {
    const cgh = cough ? 1 : 0;
    const fvr = fever ? 1 : 0;
    const ftg = fatigue ? 1 : 0;
    const mainCity = await getCity(name);
    const weather = await getWeather(
      parseFloat(mainCity.lat),
      parseFloat(mainCity.lon)
    );
    const inputData = {
      Humidity: weather.Humidity,
      Temperature: weather.Temperature,
      Wind_Speed: weather.Wind_Speed,
      cough: cgh,
      fever: fvr,
      fatigue: ftg,
    };
    const result = (
      await axios.post("http://127.0.0.1:5000/predict/disease", inputData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
    ).data;
    return result;
  } catch (error) {
    console.log("Something wrong when get disease", error.message);
    return new Error("Something wrong when get disease", error.message);
  }
};

module.exports = {
  getPredictResult,
  getDiseaseResult,
};
