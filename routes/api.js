const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/', async (req, res, next) => {
  await axios('https://carebaby.herokuapp.com/api/user')
    .then(result => {
      console.log(result);
      res.render('api/canguro', { result });
    })
    .catch(error => console.log(error));
});

module.exports = router;
