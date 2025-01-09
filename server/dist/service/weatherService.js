import dotenv from 'dotenv';
dotenv.config();
// TODO: Define a class for the Weather object
class Weather {
    constructor(city, temperature, windSpeed, humidityPercentage) {
        this.city = city;
        this.temperature = temperature;
        this.windSpeed = windSpeed;
        this.humidityPercentage = humidityPercentage;
    }
}
// TODO: Complete the WeatherService class
class WeatherService {
    constructor(baseURL, apiKey, cityName) {
        this.baseURL = baseURL;
        this.apiKey = apiKey;
        this.cityName = cityName;
    }
    // TODO: Create buildGeocodeQuery method
    buildGeocodeQuery() {
        return `${this.baseURL}/geo/1.0/direct?q=${this.cityName}&appid=${this.apiKey}`;
    }
    // TODO: Create fetchLocationData method
    async fetchLocationData() {
        const geocodeQuery = this.buildGeocodeQuery();
        const response = await fetch(geocodeQuery);
        const data = await response.json();
        return { lat: data[0].lat, lon: data[0].lon };
    }
    // TODO: Create destructureLocationData method
    destructureLocationData(locationData) {
        return { lat: locationData.lat, lon: locationData.lon };
    }
    // TODO: Create buildWeatherQuery method
    buildWeatherQuery(coordinates) {
        return `${this.baseURL}/data/3.0/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${this.apiKey}/`;
    }
    // TODO: Create fetchAndDestructureLocationData method
    async fetchAndDestructureLocationData() {
        const locationData = await this.fetchLocationData();
        return this.destructureLocationData(locationData);
    }
    // TODO: Create fetchWeatherData method
    async fetchWeatherData(coordinates) {
        const weatherQuery = this.buildWeatherQuery(coordinates);
        const response = await fetch(weatherQuery);
        return response.json();
    }
    // TODO: Build parseCurrentWeather method
    parseCurrentWeather(response) {
        const currentWeather = response.current;
        return new Weather(this.cityName, currentWeather.temp, currentWeather.wind_speed, currentWeather.humidity);
    }
    // TODO: Complete buildForecastArray method
    buildForecastArray(weatherData) {
        return weatherData.map((data) => new Weather(this.cityName, data.temp.day, data.wind_speed, data.humidity));
    }
    // TODO: Complete getWeatherForCity method
    async getWeatherForCity(city) {
        this.cityName = city;
        const coordinates = await this.fetchAndDestructureLocationData();
        const weatherData = await this.fetchWeatherData(coordinates);
        const currentWeather = this.parseCurrentWeather(weatherData);
        const forecast = this.buildForecastArray(weatherData.daily);
        return { currentWeather, forecast };
    }
}
export default new WeatherService('https://api.openweathermap.org/data/3.0', process.env.OPENWEATHER_API_KEY || '', '');
