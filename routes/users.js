// routes/users.js
var express = require('express');
var router = express.Router();

var User = require('../models').user;

router.param('user_id', function(req, res, next) {
  User.findById(req.params.user_id).then(function(u) {
    req.user = res.locals.user = u;
    next();
  });
});

router.get('/', function(req, res) {
  var page = req.query.page || 1;
  User.findAndCount({ attributes: ['id', 'email' ], limit: 5, offset: (page - 1) * 5 })
    .then(function(results) {
      var users = results.rows;
      res.json({ total: results.count, users: users });
    });
});

router.get('/usernameExists', function(req, res) {
  User.doesUsernameExist(req.query.username)
    .then(res.json.bind(res));
});

router.get('/:user_id', function(req, res) {
  res.render('individualUser');
});

module.exports = router;
