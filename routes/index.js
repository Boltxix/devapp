var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: "DevOps Application" });
  });
/* GET about page. */
router.get('/about', function(req, res, next) {
    res.render('about');
  });
/* GET cocktails page. */
router.get('/cocktails', function(req, res, next) {
    res.render('cocktails');
  });
  
  
  module.exports = router;