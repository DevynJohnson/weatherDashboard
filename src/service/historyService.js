import fs from 'fs';
import path from 'path'; 
import { v4 as uuidv4 } from 'uuid'; // This package allows for the creation of unique IDs for each city

const dbPath = path.join(__dirname, '../../db/searchHistory.json'); // Set path to the searchHistory.json file as a variable to make it easier to reference

// TODO: Define a City class with name and id properties

class City {
    constructor(name) {
        this.name = name;
        this.id = uuidv4();
    }
}

// TODO: Complete the HistoryService class
class HistoryService {
    async getHistory() {
        const data = await fs.promises.readFile(dbPath, 'utf-8');
        return JSON.parse(data);
    }

    async saveCity(cityName) {
        const city = new City(cityName);
        const history = await this.getHistory();
        history.push(city);
        await fs.promises.writeFile(dbPath, JSON.stringify(history, null, 2));
        return history;
    }

    async deleteCity(id) {
        let history = await this.getHistory();
        history = history.filter(city => city.id !== id);
        await fs.promises.writeFile(dbPath, JSON.stringify(history, null, 2));
        return history;
    }
}
export default new HistoryService();
