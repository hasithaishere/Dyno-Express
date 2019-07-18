/**
 * @file Proxy class for handle mongoDB functionality.
 * @author Hasitha Gamage
 */
'use strict';

const mongoose = require('mongoose');
const config = require('config');
const logo = require('asciiart-logo');
const chalkAnimation = require('chalk-animation');
const { version } = require('../package.json');

module.exports = {
    init() {
        const { appName } = config;
        console.log(
            logo({
                name: appName,
                font: '3D-ASCII',
                lineChars: 20,
                padding: 2,
                margin: 0,
                borderColor: 'grey',
                logoColor: 'bold-green',
                textColor: 'green',
            })
            .right(`ver. ${version}`)
            .emptyLine()
            .render()
        );

        const mongoDBUrl = `mongodb://${config.database.mongodb.host}:${config.database.mongodb.port}/${config.database.mongodb.name}`;

        mongoose.connect(mongoDBUrl, { useNewUrlParser: true, useCreateIndex: true }, (error) => {
            if (error) {
                console.log('Error on connecting to MongoDB');
            } else {
                chalkAnimation.rainbow('Connected to MongoDB | Ready for use.', 0.4).start();
            }
        });
    },
};