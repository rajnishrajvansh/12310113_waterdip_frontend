const express = require('express');
const fs = require('fs');
const csv = require('csv-parser');

const app = express();

app.get('/api/hotel-data', (req, res) => {
  const results = [];
  fs.createReadStream('hotel_bookings_1000.csv')
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
      res.json(results);
    });
});

app.listen(5000, () => console.log('Server running on port 5000'));
