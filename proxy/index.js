/**
 * @file Class make the entry to all the Proxy classes.
 * @author Hasitha Gamage
 */
'use strict';

// Require all Proxy classes in Proxy folder
const proxy = require('require-all')({
    dirname     :  __dirname,
    filter      :  /(.+Proxy)\.js$/,
    excludeDirs :  /^\.(git|svn)$/,
    recursive   : false
});

module.exports = proxy;