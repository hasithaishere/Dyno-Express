/**
 * @file Class make the entry to all the model classes.
 * @author Hasitha Gamage
 */
'use strict';

// Require all model classes in model folder
const models = require('require-all')({
    dirname     :  __dirname,
    filter : function (fileName) {
        console.log(fileName)
        if (fileName === 'index.js') return;
        else {
            return fileName.split('.')[0];
        }
    },    
    excludeDirs :  /^\.(git|svn)$/,
    recursive   : false
});

module.exports = models;