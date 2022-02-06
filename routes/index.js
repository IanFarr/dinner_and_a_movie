const express = require('express');
const router = express.Router();
const movie = require('../services/movies.js');
const restaurant = require('../services/restaurants.js');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});


// POST movie criteria selections
router.post('/api/movies', function (req, res, next) {
  movie.get(req.body.service, req.body.genre)
    .then(movies => {
      res.send(movies);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send('Something broke!');
    });
});

const newLocal = '/api/restaurants';
// POST restaurant criteria selections
router.post(newLocal, function (req, res) {
  console.log('in router')
  restaurant.get()
    .then(restaurants => {
      res.send(restaurants);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send('Something broke!');
    });
});


module.exports = router;
