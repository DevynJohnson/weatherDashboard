import dotenv from 'dotenv';
import fetch from 'node-fetch';
dotenv.config();

// TODO: Define an interface for the Coordinates object
interface Coordinates {
  lat: number;
  lon: number;
}
// TODO: Define a class for the Weather object
class Weather {
  city: string;
  temperature: number;
  windSpeed: number;
  humidityPercentage: number;

  constructor(city: string, temperature: number, windSpeed: number, humidityPercentage: number) {
    this.city = city;
    this.temperature = temperature;
    this.windSpeed = windSpeed;
    this.humidityPercentage = humidityPercentage;
  }
}
// TODO: Complete the WeatherService class
class WeatherService {
  // TODO: Define the baseURL, API key, and city name properties
  private baseURL: string;
  private apiKey: string;
  private cityName: string;

  constructor (baseURL: string, apiKey: string, cityName: string) {
    this.baseURL = process.env.BASE_URL || baseURL;
    this.apiKey = process.env.API_KEY || apiKey;
    this.cityName = cityName;
  }
  // TODO: Create buildGeocodeQuery method
  private buildGeocodeQuery(): string {
    return `${this.baseURL}/geo/1.0/direct?q=${this.cityName}&appid=${this.apiKey}`;
  }

  // TODO: Create fetchLocationData method
  private async fetchLocationData(): Promise<Coordinates> {
    const geocodeQuery = this.buildGeocodeQuery();
    const response = await fetch(geocodeQuery);

    if (!response.ok) {
      throw new Error('Failed to fetch location data');
    }

    const data: { lat: number; lon: number }[] = await response.json() as { lat: number; lon: number }[];

    if (data.length === 0) {
      throw new Error('No location data found');
    }

    return {lat: data[0].lat, lon: data[0].lon};
  }

  // TODO: Create destructureLocationData method
  private destructureLocationData(locationData: Coordinates): Coordinates {
    return {lat: locationData.lat, lon: locationData.lon};
  }
  // TODO: Create buildWeatherQuery method
  private buildWeatherQuery(coordinates: Coordinates): string {
    return `${this.baseURL}/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${this.apiKey}`;

  }
  // TODO: Create fetchAndDestructureLocationData method
  private async fetchAndDestructureLocationData() {
    const locationData = await this.fetchLocationData();
    return this.destructureLocationData(locationData);

  }

  // TODO: Create fetchWeatherData method
  private async fetchWeatherData(coordinates: Coordinates) {
    const weatherQuery = this.buildWeatherQuery(coordinates);
    const response = await fetch(weatherQuery);
    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }
    console.log(response.json());
    return response.json();
  }

  // TODO: Build parseCurrentWeather method
  private parseCurrentWeather(response: any): Weather {
    const currentWeather = response.current;
    if (!currentWeather) {
      throw new Error('No current weather data found');
    }
    return new Weather(this.cityName, currentWeather.temp, currentWeather.wind_speed, currentWeather.humidity);

  }
  // TODO: Complete buildForecastArray method
  private buildForecastArray(weatherData: any[]): Weather[] {
      return weatherData.map((data: any) => new Weather (
        this.cityName,
        data.temp.day,
        data.wind_speed,
        data.humidity
      ));
  }
  // TODO: Complete getWeatherForCity method
  async getWeatherForCity(city: string): Promise<any> {
    try {
    this.cityName = city;
    const coordinates = await this.fetchAndDestructureLocationData();
    const weatherData = await this.fetchWeatherData(coordinates) as any;
    const currentWeather = this.parseCurrentWeather(weatherData);
    const forecast = this.buildForecastArray(weatherData.daily);
    return { currentWeather, forecast };
  } catch (error) {
    console.error('Error in getWeatherForCity:', error);
    throw new Error('Failed to retrieve weather data');
  }
  }
}



export default new WeatherService('https://api.openweathermap.org/data/3.0', process.env.API_KEY || '', '');
