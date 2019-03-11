'use strict';
const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/location', async (req, res, next) => {
  try {
    const data = await axios('https://api.opencagedata.com/geocode/v1/geojson?q=carrer%20de%20les%20carretes%2050%2C%20barcelona&key=a13d1aa3e5c04193a98708915bca111a')
      .then()
      .catch();
    let coordinateOne = 0;
    let coordinateTwo = 0;
    data.data.features.forEach(val => {
      coordinateOne = val.geometry.coordinates[1];
      coordinateTwo = val.geometry.coordinates[0];
      // console.log(val.geometry.coordinates);

      return coordinateOne && coordinateTwo;
    });
    console.log(data.data.features[0].geometry.coordinates);
    // console.log(coordinateOne);
    // console.log(coordinateTwo);
    res.render('location');
  } catch (error) {
    next(error);
  }
});

router.get('/info', (req, res, next) => {
  const { address } = req.query;
  let url = encodeURIComponent(address);
  console.log(url);
  res.redirect('/api/location');
});

// const address = encodeURIComponent(events.address);
//     const axiosCall = axios(`https://api.opencagedata.com/geocode/v1/geojson?q=${address}&key=a13d1aa3e5c04193a98708915bca111a`);
//     const coordinates = {
//       latitude: axiosCall.data.features[0].geometry.coordinates[1],
//       longitude: axiosCall.data.features[0].geometry.coordinates[1]
//     };

module.exports = router;
