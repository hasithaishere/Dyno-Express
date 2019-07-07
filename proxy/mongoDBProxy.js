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

/* class mongoDB {
    // Constructor of mongoDB Proxy class for instantiate all prerequisite lib. instances
    constructor () {
        const  { host, port, name: dbName } = config.database.mongodb;
        console.log('>>>>>>>>>>>>>>>', host, port, dbName )
        mongoose.connect(
            `mongodb://${host}:${port}/${dbName}`, { useNewUrlParser: true, useCreateIndex: true },
            (error) => {
                if (error) {
                    // TODO: Need to remove console logs
                    console.log('Error on connecting to MongoDB');
                } else {
                    console.log('**** Connected to MongoDB ****');
                }
            },
        );
        this.mongoose = mongoose;
    }
}

module.exports = mongoDB; */


module.exports = {
    init() {
        const { appName } = config;
        console.log(
            logo({
                name: appName,
                font: '3D-ASCII',
                lineChars: 20,
                padding: 2,
                margin: 3,
                borderColor: 'grey',
                logoColor: 'bold-green',
                textColor: 'green',
            })
            .right(`ver. ${version}`)
            .emptyLine()
            .render()
        );

        mongoose.connect(
            `mongodb://${config.database.mongodb.host}:${config.database.mongodb.port}/${config.database.mongodb.name}`,
            { useNewUrlParser: true, useCreateIndex: true },
            (error) => {
                if (error) {
                    console.log('Error on connecting to MongoDB');
                } else {
                    const radar = chalkAnimation.radar('Lorem ipsum dolor sit amet', 0.5);
                    console.log('**** Connected to MongoDB ****');
                    setTimeout(() => {
                        radar.stop(); // Animation stops
                    }, 10000);
                     
                    setTimeout(() => {
                        radar.start(); // Animation resumes
                    }, 2000);
                }
            },
        );
    },
};