const express = require('express');
const { default: generateMovieInfo } = require('../public/javascripts/test');
const router = express.Router();
const movie = require('../services/movies.js')

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});


// POST movie criteria selections
router.post('/api/movies', function (req, res) {
  console.log('called')
  console.log(req.body.service)
  console.log(req.body.genre)


  movie.get(req.body.service, req.body.genre)
    .then(movies => {
      res.send(movies);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send('Something broke!');
    });
});


module.exports = router;
