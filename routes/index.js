var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/special', function(req, res, next) {
  const token = req.query.token
  const payload = jwt.verify(token, process.env.TOKEN_SECRET)
  res.json({
    special: true,
    email: payload.email
  })
});

router.get('/special-header', function(req, res, next) {
  const authorization = req.header('Authorization')
  const token = authorization.split(' ')[1]

  const payload = jwt.verify(token, process.env.TOKEN_SECRET)
  res.json({
    specialheader: true,
    email: payload.email
  })
});


module.exports = router;