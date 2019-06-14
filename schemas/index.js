/**
 * @file Class make the entry to all the schema classes.
 * @author Hasitha Gamage
 */
'use strict';

// Require all schema classes in schemas folder
const Schemas = require('require-all')({
    dirname     :  __dirname,
    filter      :  /(.+Schema)\.js$/,
    excludeDirs :  /^\.(git|svn)$/,
    recursive   : false
});

module.exports = Schemas;