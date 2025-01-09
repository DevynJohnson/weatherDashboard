import { Router } from 'express';
const router = Router();
import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';
// TODO: POST Request with city name to retrieve weather data
router.post('/', async (req, res) => {
    const { cityName } = req.body;
    if (!cityName) {
        return res.status(400).json({ error: `City name is required.` });
    }
    try {
        const weatherData = await WeatherService.getWeatherForCity(cityName);
        await HistoryService.addCity(cityName);
        res.json(weatherData);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to retrieve weather data.' });
    }
});
// TODO: GET weather data from city name
router.get('/', async (req, res) => {
    const { cityName } = req.query;
    if (!cityName) {
        return res.status(400).json({ error: 'City name is required.' });
    }
    try {
        const weatherData = await WeatherService.getWeatherForCity(cityName);
        res.json(weatherData);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to retrieve weather data.' });
    }
});
// TODO: save city to search history
router.post('/history', async (req, res) => {
    const { cityName } = req.body;
    if (!cityName) {
        return res.status(400).json({ error: 'City name is required.' });
    }
    try {
        await HistoryService.addCity(cityName);
        return res.json({ message: 'City added to search history.' });
    }
    catch (error) {
        return res.status(500).json({ error: 'Failed to add city to search history.' });
    }
});
// TODO: GET search history
router.get('/history', async (_, res) => {
    try {
        const cities = await HistoryService.getCities();
        return res.json(cities);
    }
    catch (error) {
        return res.status(500).json({ error: 'Failed to retrieve search history.' });
    }
});
// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await HistoryService.removeCity(id);
        return res.json({ message: 'City removed from search history.' });
    }
    catch (error) {
        return res.status(500).json({ error: 'Failed to remove city from search history.' });
    }
});
export default router;
