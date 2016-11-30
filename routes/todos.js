'use strict';

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var Todo = require('../models/todo');

var isAuthenticated = (req, res, next) => {
  if (req.user)
    return next();
  else
   res.redirect('/');
};

router.get('/', isAuthenticated, (req, res) => {
    res.render('todos', { user: req.user });
});

router.post('/', isAuthenticated, (req, res) => {

    console.log('body!', req.body);
    console.log('req.user', req.user);

    new Todo({
        userId: req.user._id,
        title: req.body.title,
        description: req.body.description,
        updateAt: Date.now()
    }).save( (err, item) => {
        if (err) {
            console.log('error yo!', err);
        } else {
            console.log('req', req.body);
            res.redirect('/');
        }
    });
});

module.exports = router;
