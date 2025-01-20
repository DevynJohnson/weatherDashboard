import dotenv from 'dotenv';
dotenv.config();

// TODO: Define a class for the Weather object
class Weather { 
    constructor(city, date, icon, iconDescription, tempF, windSpeed, humidity) { // Using constructor to initialize the properties of the class with same information as the renderCurrentWeather function
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
        const url = `${this.baseURL}weather?q=${city}&appid=${this.apiKey}&units=imperial`;
        try {
            const response = await fetch(url);
            const data = await response.json();

            const fiveDayUrl = `${this.baseURL}forecast?q=${city}&appid=${this.apiKey}&units=imperial`;
            const fiveDayResponse = await fetch(fiveDayUrl);
            const fiveDayData = await fiveDayResponse.json();

            const currentWeather = new Weather(
                data.name,
                new Date(data.dt * 1000).toLocaleDateString(),
                data.weather[0].icon,
                data.weather[0].description,
                data.main.temp,
                data.wind.speed,
                data.main.humidity
            );

             // Get the current date
            const currentDate = new Date().toLocaleDateString();

            // Filter forecast data to show only one forecast per day (12:00 PM) and start from the day after the current date
            const forecast = fiveDayData.list.filter(item => {
                const forecastDate = new Date(item.dt * 1000).toLocaleDateString();
                return forecastDate !== currentDate && item.dt_txt.includes('12:00:00');
            }).map(item => new Weather(
                data.name,
                new Date(item.dt * 1000).toLocaleDateString(),
                item.weather[0].icon,
                item.weather[0].description,
                item.main.temp,
                item.wind.speed,
                item.main.humidity
            ));

            return [currentWeather, ...forecast];
        } catch (error) {
            console.error(`Error: ${error}`);
            return error;
        }
    }
}

export default new WeatherService();
