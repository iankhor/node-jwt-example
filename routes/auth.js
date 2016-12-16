var express = require('express');
var jwt = require('jsonwebtoken')
var router = express.Router();

function verifyEmailAndPassword(email, password) {
  if (password === '123') {
    return Promise.resolve(true);
  } else {
    return Promise.resolve(false);
  }
}

/* GET home page. */
router.post('/', function(req, res, next) {
  const { email, password } = req.body
  verifyEmailAndPassword(email, password)
    .then(authentic => {
      if (authentic) {

        const payload = {
          signedIn: true,
          email: email
        }

        const token = jwt.sign(payload, process.env.TOKEN_SECRET, {
            algorithm: 'HS256',
            expiresIn: '1 second',
            audience: 'coderfactory'
          })
          //signs in and give them the token
        res.json({
          token: token
        })
      } else {
        res.status(401).json({
          err: 'Invalid user name and pw !'
        })
      }
    })

});

module.exports = router;