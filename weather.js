require('dotenv').config();

const apikey = process.env.API_KEY;
const city = process.env.CITY;
const current_weather_data=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
const weather_5days = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apikey}&units=metric`;

console.log("Loading weather data...");

fetch(current_weather_data)
  .then((response) => {
    if (!response.ok) {
      if(response.status===404){
        throw new Error("City not found, Please check the spelling");
      }
      else if(response.status===401){
        throw new Error("Invalid API key, Please check the OpenWeather Api Key");
      }
      else{
        throw new Error(`HTTP Error status:${response.status}`);
      }
      
    }
    return response.json();
  })
  .then((data) => {
    // console.log("Weather Data:", data);
    console.log("City:",data.name);
    console.log("Temperature:",data.main.temp);
    console.log("Description:",data.weather[0].description);
    console.log("Humidity:",data.main.humidity);
    console.log("Wind Speed:",data.wind.speed);
  })
  .catch( (error) => {
    console.log("Error Message:",error.message);
  });

fetch(weather_5days)
.then((response)=>{
  if(!response.ok){
    if(response.status===404)
    {
      throw new Error("City not found, Please check the spelling");
    }
    else if(response.status===401){
      throw new Error("Invalid API key, Please check the OpenWeather Api Key");
    }
    else{
      throw new Error(`HTTP Error status:${response.status}`);
    }
  }
  return response.json();
})
.then((data)=>{

  if (data.cod !== "200") {
    throw new Error(`API Error: ${data.message || "Unknown error"}`);
  }

  if (!data.list || data.list.length === 0) {
    throw new Error("No forecast data available.");
  }

  const forecastList=data.list;
  const dailyforecast={};
  forecastList.forEach(entry=>{
    const date=entry.dt_txt.split(" ")[0];
    const time=entry.dt_txt.split(" ")[1];
    if(time==="12:00:00"){
      dailyforecast[date]=entry;
    }
  });
  
  console.log(`🌤️ 5-Day Weather Forecast for ${city}:\n`);
  Object.keys(dailyforecast).forEach((date)=>{
    const temp=dailyforecast[date].main.temp;
    const weather=dailyforecast[date].weather[0].description;
    console.log(`📅 ${date} - 🌡️ ${temp}°C, ${weather}`);
  });
})
.catch((error)=>{
  console.log(error.message);
})

Promise.all([
  fetch(current_weather_data),fetch(weather_5days)
])
  .then(([weather,forecast])=>{
    if(!weather.ok){
      throw new Error(`Error fetching current weather: ${weather.status}`);
    }
    if(!forecast.ok){
      throw new Error(`Error fetching forecast: ${forecast.status}`);
    }

    return Promise.all([weather.json(),forecast.json()]);
  })
  .then(([weather_data,forecast_data])=>{
    const current_weather = weather_data.weather[0].description;
    const current_weather_temp = weather_data.main.temp;
    console.log(`🌤️ Current Weather in ${city}: ${current_weather}, ${current_weather_temp}°C`);

    const forecast_List=forecast_data.list;
    const dailyforecast={};

    forecast_List.forEach((entry)=>{
      const date=entry.dt_txt.split(" ")[0];
      const time=entry.dt_txt.split(" ")[1];
      if(time==="12:00:00"){
        dailyforecast[date]=entry;
      }
    });

    console.log(`🌤️ 5-Day Weather Forecast for ${city}:`);

    Object.keys(dailyforecast).forEach((date)=>{
      const temp=dailyforecast[date].main.temp;
      const weather=dailyforecast[date].weather[0].description;
      console.log(`📅 ${date} - 🌡️ ${temp}°C, ${weather}`);
    })
  })
  .catch((error)=>{
    console.log("Error:", error.message);
  });