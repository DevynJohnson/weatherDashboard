// TODO: Define a City class with name and id properties
class City {
    constructor(name, id) {
        this.name = name;
        this.id = id;
    }
}

// TODO: Complete the HistoryService class
class HistoryService {
    constructor() {
        this.apiKey = process.env.API_KEY;
        this.baseURL = process.env.BASE_URL;
    }

    async getHistory() {
        const url = `${this.baseURL}/history?city=${City.name}&id=${City.id}&appid=${this.apiKey}`;
        const response = await fetch(url);
        const data = await response.json();
        return data;
    }
}
export default new HistoryService();
