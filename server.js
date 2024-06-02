import express from 'express';
import fetch from 'node-fetch';
const app = express();
const port = process.env.PORT || 3000;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization, X-Requested-With, Pragma, Cache-Control, Expires'
  );
  next();
});

app.get('/api/forecast', async (req, res) => {
  const { lat, lon, q, id, zip, units, appid, lang } = req.query;

  let apiUrl = 'https://api.openweathermap.org/data/2.5/forecast?';
  if (lat && lon) {
    apiUrl += `lat=${lat}&lon=${lon}`;
  } else if (q) {
    apiUrl += `q=${q}`;
  } else if (id) {
    apiUrl += `id=${id}`;
  } else if (zip) {
    apiUrl += `zip=${zip}`;
  } else {
    return res.status(400).send('Bad Request: Missing required parameters.');
  }

  apiUrl += `&units=${units}&appid=${appid}&lang=${lang}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).send('Error fetching data');
  }
});

app.get('/api/geocoding', async (req, res) => {
  const { q, zip, lat, lon, limit, appid } = req.query;

  let apiUrl = 'https://api.openweathermap.org/data/2.5/';
  if (q) {
    apiUrl += `geo/1.0/direct?q=${q}`;
  } else if (zip) {
    apiUrl += `geo/1.0/zip?zip=${zip}`;
  } else if (lat && lon) {
    apiUrl += `geo/1.0/reverse?lat=${lat}&lon=${lon}`;
  } else {
    return res.status(400).send('Bad Request: Missing required parameters.');
  }

  apiUrl += `&limit=${limit}&appid=${appid}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).send('Error fetching data');
  }
});

app.get('/api/time/current', async (req, res) => {
  const { latitude, longitude } = req.query;
  const apiUrl = `https://timeapi.io/api/Time/current/coordinate?latitude=${latitude}&longitude=${longitude}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).send('Error fetching data');
  }
});

app.get('/api/time/zone', async (req, res) => {
  const { zoneName } = req.query;
  const apiUrl = `http://worldtimeapi.org/api/timezone/${zoneName}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).send('Error fetching data');
  }
});

app.get('/api/weather', async (req, res) => {
  const { lat, lon, q, id, zip, units, appid, lang } = req.query;

  let apiUrl = 'https://api.openweathermap.org/data/2.5/weather?';
  if (lat && lon) {
    apiUrl += `lat=${lat}&lon=${lon}`;
  } else if (q) {
    apiUrl += `q=${q}`;
  } else if (id) {
    apiUrl += `id=${id}`;
  } else if (zip) {
    apiUrl += `zip=${zip}`;
  } else {
    return res.status(400).send('Bad Request: Missing required parameters.');
  }

  apiUrl += `&units=${units}&appid=${appid}&lang=${lang}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).send('Error fetching data');
  }
});

app.get('/api/airpollution', async (req, res) => {
  const { lat, lon, start, end, appid, type } = req.query;

  let apiUrl = `https://api.openweathermap.org/data/2.5/air_pollution`;
  if (type === 'current') {
    apiUrl += `?lat=${lat}&lon=${lon}`;
  } else if (type === 'forecast') {
    apiUrl += `/forecast?lat=${lat}&lon=${lon}`;
  } else if (type === 'history') {
    apiUrl += `/history?lat=${lat}&lon=${lon}&start=${start}&end=${end}`;
  } else {
    return res.status(400).send('Bad Request: Missing required parameters.');
  }

  apiUrl += `&appid=${appid}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).send('Error fetching data');
  }
});

app.listen(port, () => {
  console.log(`CORS Proxy server is running on http://localhost:${port}`);
});
