var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'I Hangzhou' });
});

router.get('/rec',function(req, res){
	res.render('recommend',{ title: 'Time for recommending'});
});

router.get('/des',function(req, res){
	res.render('gallery-index',{title: 'CLC - Attractions Gallery'})
})

router.get('/data',function(req, res){
	res.render('dataviz-index',{title: '数据可视化'})
})


module.exports = router;
