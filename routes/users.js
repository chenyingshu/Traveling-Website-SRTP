var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/app', function(req, res, next) {
  res.render('appreciation');
});

router.get('/app2', function(req, res, next) {
  res.render('appreciation2');
});

router.get('/wall', function(req, res, next) {
  res.render('imagewall', {title: "杭州－博物馆　纪念馆　艺术馆"});
});

router.get('/wall2', function(req, res, next) {
  res.render('imagewall2', {title: "浙江大学杭州－紫金港 玉泉 西溪 华家池 之江"});
});


router.get('/food', function(req, res, next) {
  res.render('food', {title: "美食走廊"});
});





module.exports = router;