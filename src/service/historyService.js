import { readFile, writeFile } from 'fs/promises';
import path from 'path'; 
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid'; // This package allows for the creation of unique IDs for each city


// Resolve __dirname in ES Module scope
const __filename = fileURLToPath(import.meta.url); // Set __filename to the path of the current file
const __dirname = path.dirname(__filename); // Set __dirname to the directory of the current file

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
        const data = await readFile("db/searchHistory.json", "utf-8");
        // console.log(data);
    //     const data = await fs.promises.readFile(dbPath, 'utf-8');
        return JSON.parse(data);
    }

    async saveCity(cityName) {
        if (!cityName) {
            throw new Error('City name is required');
        }
    
        let history = await this.getHistory();
    
        // Check if the city already exists in history
        const existingCity = history.find(city => city.name.toLowerCase() === cityName.toLowerCase());
    
        if (existingCity) {
            // If city exists, return the existing city without creating a new UUID
            return existingCity;
        }
    
        // If city does not exist, create a new city with a new UUID
        const newCity = {
            name: cityName,
            id: uuidv4(),
        };
    
        history.push(newCity);
    
        await writeFile(dbPath, JSON.stringify(history, null, 2), 'utf-8');
        return newCity;
    }

    async deleteCity(id) {
        let history = await this.getHistory();
        history = history.filter(city => city.id !== id);
        await writeFile(dbPath, JSON.stringify(history, null, 2));
        return history;
    }
}
export default new HistoryService();
