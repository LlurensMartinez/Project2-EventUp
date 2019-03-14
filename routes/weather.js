'use strict';
const express = require('express');
const router = express.Router();
const OAuth = require('oauth');
const header = {
  'X-Yahoo-App-Id': 'k6ntkW30'
};
const request = new OAuth.OAuth(
  null,
  null,
  'dj0yJmk9YXg1bElhZU5tRndzJnM9Y29uc3VtZXJzZWNyZXQmc3Y9MCZ4PTAz',
  'e9589da9e4cae38732375a0c40f0f1e51bfe9985',
  '1.0',
  null,
  'HMAC-SHA1',
  null,
  header
);

router.get('/', async (req, res, next) => {
  await request.get(
    'https://weather-ydn-yql.media.yahoo.com/forecastrss?location=barcelona&format=json',
    null,
    null,
    (err, data, result) => {
      if (err) {
        console.log(err);
      } else {
        const weather = JSON.parse(data);
        console.log(weather.forecasts);
        res.render('weather/weather', { weather });
      }
    }
  );
  // res.render('weather/weather', { weather });
});

module.exports = router;
