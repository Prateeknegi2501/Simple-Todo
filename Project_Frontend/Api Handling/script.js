document.addEventListener("DOMContentLoaded", () => {
  const cityInput = document.getElementById("cityInput");
  const searchButton = document.getElementById("searchWeatherButton");
  const weatherInfo = document.getElementById("weatherInfo");
  const cityname = document.getElementById("cityname");
  const temperature = document.getElementById("temperature");
  const description = document.getElementById("description");
  const errorMsg = document.getElementById("error_msg");

  const API_key = "8662e0272ebc2dcb29602ccd88805229";

  searchButton.addEventListener("click", async () => {
    const city = cityInput.value.trim();
    if (!city) return;
    try {
      const weatherData = await fetchWeatherData(city);
      DisplayWeatherData(weatherData);
    } catch (error) {
      ShowError();
    }
  });

  async function fetchWeatherData(city) {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_key}`;
    const response = await fetch(url);
    if (!response.ok) {
      ShowError();
    }
    const data = await response.json();
    return data;
  }

  function DisplayWeatherData(data) {
    const { name, main, weather } = data;
    cityname.textContent = name;
    temperature.textContent = `Temperature: ${main.temp}`;
    description.textContent = `Description: ${weather[0].description}`;
    console.log(data);

    weatherInfo.classList.remove("hidden");
    errorMsg.classList.add("hidden");
  }

  function ShowError() {
    weatherInfo.classList.add("hidden");
    errorMsg.classList.remove("hidden");
  }
});
