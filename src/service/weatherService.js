import dotenv from 'dotenv';
dotenv.config();

// console.log(process.env.API_KEY);
// console.log(process.env.BASE_URL);

// TODO: Define an interface for the Coordinates object
class Coordinates {
    constructor(latitude, longitude) {
        this.latitude = latitude;
        this.longitude = longitude;
    }
}

// TODO: Define a class for the Weather object
class Weather {
    constructor(temperature, windSpeed, humidity) {
        this.temperature = temperature;
        this.windSpeed = windSpeed;
        this.humidity = humidity;
    }
}
// TODO: Complete the WeatherService class
class WeatherService {
    constructor() {
        this.apiKey = process.env.API_KEY;
        this.baseURL = process.env.BASE_URL;
    }

    async getWeather() {
        const url = `${this.baseURL}/weather?lat=${Coordinates.latitude}&lon=${Coordinates.longitude}&appid=${this.apiKey}`;
        const response = await fetch(url);
        const data = await response.json();
        const temperature = data.main.temp;
        const windSpeed = data.wind.speed;
        const humidity = data.main.humidity;
        return new Weather(temperature, windSpeed, humidity);
    }
}


export default new WeatherService();
