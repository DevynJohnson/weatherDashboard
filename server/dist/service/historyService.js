import { readFileSync, writeFileSync } from "node:fs";
// TODO: Define a City class with name and id properties
class City {
    constructor(name, id) {
        this.name = name;
        this.id = id;
    }
}
// TODO: Complete the HistoryService class
class HistoryService {
    // TODO: Define a read method that reads from the searchHistory.json file
    async read() {
        try {
            const data = readFileSync('searchHistory.json', 'utf-8');
            return JSON.parse(data);
        }
        catch (error) {
            console.log('Error reading search history file');
            return [];
        }
    }
    // TODO: Define a write method that writes the updated cities array to the searchHistory.json file
    async write(cities) {
        writeFileSync('searchHistory.json', JSON.stringify(cities));
    }
    // TODO: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
    async getCities() {
        return this.read();
    }
    // TODO Define an addCity method that adds a city to the searchHistory.json file
    async addCity(city) {
        const cities = await this.read();
        const newCity = new City(city, cities.length + 1);
        cities.push(newCity);
        await this.write(cities);
    }
    // * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file
    async removeCity(id) {
        let cities = await this.read();
        cities = cities.filter(city => city.id !== parseInt(id));
        await this.write(cities);
    }
}
export default new HistoryService();
