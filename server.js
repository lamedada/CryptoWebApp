const express = require('express');
const scraper = require('./scraper'); // Assuming your scraper function is in the scraper.js file

const app = express();
const port = 3000;

app.get('/api/events', async (req, res) => {
  try {
    const events = await scraper.scrapeData();
    res.json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ message: 'Error fetching events' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
