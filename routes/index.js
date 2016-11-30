'use strict';

var express = require('express');
var passport = require('passport');
var User = require('../models/user');
var router = express.Router();

var isAuthenticated = (req, res, next) => {
  if (req.user)
    return next();
  else
   res.redirect('/');
};

router.get('/', (req, res) => {
  res.render('index', { user : req.user });
});

router.get('/register', (req, res) => {
  res.render('register', { });
});

router.post('/register', (req, res) => {
  User.register(new User({ username : req.body.username }), req.body.password, (err, user) => {
    if (err) {
      return res.render('register', { user : user });
    }

    passport.authenticate('local')(req, res, () => {
      res.redirect('/');
    });
  });
});

router.get('/login', (req, res) => {
  res.render('login', { user : req.user });
});

router.post('/login', passport.authenticate('local'), (req, res) => {
  res.redirect('/todos');
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

router.get('/about', (req, res) => {
    res.render('about', { user: req.user });
});

router.get('/todos', isAuthenticated, (req, res) => {
    res.render('todos', { user: req.user });
});


module.exports = router;
