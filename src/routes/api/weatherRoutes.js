import { Router } from 'express';
const router = Router();
import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';

// POST Request with city name to retrieve weather data
router.post('/', async (req, res) => {
    const city = req.body.cityName;
    const weather = await WeatherService.getWeather(city);
    await HistoryService.saveCity(city); // Save city to search history
    res.json(weather);
});

// GET weather data from city name
router.get('/:city', async (req, res) => {
    const city = req.params.city;
    const weather = await WeatherService.getWeather(city);
    res.json(weather);
});

// Save city to search history
router.post('/history', async (req, res) => {
    const city = req.body.city;
    const history = await HistoryService.saveCity(city);
    res.json(history);
});

// GET search history
router.get('/history', async (_req, res) => {
    const history = await HistoryService.getHistory();
    res.json(history);
});

// DELETE city from search history
router.delete('/history/:id', async (req, res) => {
    const id = req.params.id;
    const history = await HistoryService.deleteCity(id);
    res.json(history);
});

export default router;