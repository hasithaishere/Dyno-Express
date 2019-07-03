/**
 * @file Proxy class for handle mongoDB functionality.
 * @author Hasitha Gamage
 */
'use strict';

const mongoose = require('mongoose');
const config = require('config');

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
        console.log('>>>>>>>>>>>>>>>', config.database.mongodb )
        mongoose.connect(
            `mongodb://${config.database.mongodb.host}:${config.database.mongodb.port}/${config.database.mongodb.name}`,
            { useNewUrlParser: true, useCreateIndex: true },
            (error) => {
                if (error) {
                    console.log('Error on connecting to MongoDB');
                } else {
                    console.log('**** Connected to MongoDB ****');
                }
            },
        );
    },
};