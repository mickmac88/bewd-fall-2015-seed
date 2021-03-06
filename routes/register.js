var express = require('express');
var app = express.Router();

var User = require('../models').user;

// user registration
app.get('/', function(req, res) {
  res.render('register');
});

app.post('/register', function(req, res) {
  if (!req.body.password) {
    req.flash('warning', 'Password required');
    req.session.save(function() {
      res.render('register');
    });
  } else {
    // Does the user exist already?
    models.user.find({ where: { username: req.body.username }})
      .then(function(user) {
          if (user) {
            req.flash('warning', "Username already exists");
            req.session.save(function() {
              res.redirect('/register');
            });
          } else {
            models.user.create(req.body)
              .then(function(newUser) {
                req.session.user_id = newUser.id;
                req.session.save(function() {
                  res.redirect('/games');
                });
              });
          }
      });
  }
});

module.exports = app;
