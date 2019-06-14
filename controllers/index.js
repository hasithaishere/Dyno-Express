/**
 * @file Class make the entry to all the controller classes.
 * @author Hasitha Gamage
 */
'use strict';

// Require all controller classes in controller folder
const controllers = require('require-all')({
    dirname     :  __dirname,
    filter      :  /(.+Controller)\.js$/,
    excludeDirs :  /^\.(git|svn)$/,
    recursive   : false
});

module.exports = controllers;