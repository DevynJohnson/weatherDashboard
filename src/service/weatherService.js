import dotenv from 'dotenv';
dotenv.config();

// console.log(process.env.API_KEY);
// console.log(process.env.BASE_URL);

// TODO: Define an interface for the Coordinates object

// class Coordinates { // Creating class for Coordinates instead of interface as it is not supported in JavaScript
//     constructor(latitude, longitude) {
//         this.latitude = latitude;
//         this.longitude = longitude;
//     }
// }

// TODO: Define a class for the Weather object
class Weather { 
    constructor(city, date, icon, iconDescription, tempF, windSpeed, humidity) { // Using temperature, windSpeed, and humidity as properties of Weather class as that is what is displayed in the UI
        this.city = city;
        this.date = date;
        this.icon = icon;
        this.iconDescription = iconDescription;
        this.tempF = tempF;
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

    async getWeather(city) { 
        const url = `${this.baseURL}weather?q=${city}&appid=${this.apiKey}`;
        console.log(url);
        try {
            
            const response = await fetch(url);
            const data = await response.json();
            console.log(data);
            const fiveDayUrl = `${this.baseURL}forecast?lat=${data.coord.lat}&lon=${data.coord.lon}&appid=${this.apiKey}`;
            const fiveDayResponse = await fetch(fiveDayUrl);
            const fiveDayData = await fiveDayResponse.json();
            console.log(fiveDayData);
            const temperature = data.main.temp;
            const windSpeed = data.wind.speed;
            const humidity = data.main.humidity;
            return fiveDayData;
        } catch (error) {
            console.error(`Error: ${error}`);
            return error;
        }
    }
}


export default new WeatherService();
