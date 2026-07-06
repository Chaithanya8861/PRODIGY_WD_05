const API_KEY = "42f401a227421d5ff43f4b662117403f"; // Replace with your OpenWeatherMap key
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

async function fetchWeather(url) {
  document.getElementById("errorMsg").textContent = "";
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("City not found!");
    const data = await res.json();
    displayWeather(data);
  } catch (err) {
    document.getElementById("weatherCard").style.display = "none";
    document.getElementById("errorMsg").textContent = err.message;
  }
}

function getWeatherByCity() {
  const city = document.getElementById("cityInput").value.trim();
  if (!city) return;
  fetchWeather(`${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`);
}

function getWeatherByLocation() {
  if (!navigator.geolocation) {
    document.getElementById("errorMsg").textContent = "Geolocation not supported.";
    return;
  }
  navigator.geolocation.getCurrentPosition(pos => {
    const { latitude, longitude } = pos.coords;
    fetchWeather(`${BASE_URL}?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`);
  });
}

function displayWeather(data) {
  document.getElementById("cityName").textContent = `${data.name}, ${data.sys.country}`;
  document.getElementById("temperature").textContent = `${Math.round(data.main.temp)}°C`;
  document.getElementById("description").textContent = data.weather[0].description;
  document.getElementById("humidity").textContent = data.main.humidity;
  document.getElementById("wind").textContent = Math.round(data.wind.speed * 3.6);
  document.getElementById("feelsLike").textContent = Math.round(data.main.feels_like);
  document.getElementById("weatherIcon").src =
    `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  document.getElementById("weatherCard").style.display = "block";
}

// Allow Enter key to search
document.getElementById("cityInput").addEventListener("keypress", e => {
  if (e.key === "Enter") getWeatherByCity();
});