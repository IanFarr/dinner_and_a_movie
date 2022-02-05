const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


// POST movie criteria selections
router.post('/', function (req, res, next) {
  const streamServices = req.body.stream_service;
  const genres = req.body.genre;

  res.send({
    'streamServices': streamServices,
    'genres': genres,
  });
});


module.exports = router;
