/**
 * @file Class make the entry to all the model classes.
 * @author Hasitha Gamage
 */
'use strict';

const { model, Schema } = require('mongoose');
const _ = require('lodash');
const crypto = require('crypto');

const MultipleInheritance = require('../helpers/multipleInheritance');

// Require all model classes in model folder
const models = require('require-all')({
    dirname: __dirname,
    filter: (fileName) => {
        if (fileName === 'index.js') return;
        else {
            return fileName.split('.')[0];
        }
    },
    excludeDirs: /^\.(git|svn)$/,
    recursive: false
});

// Available plugins
const availablePlugins = {
    uniqueValidator: require('mongoose-unique-validator')
};

// DUMMY - START

const decorators = {
    models: {
        User: {
            actionClass: class {
                setPassword(password) {
                    this.salt = crypto.randomBytes(16).toString('hex');
                    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
                }
            }
        }
    }
}

// DUMMY - END

const modelList = {};

for (const key in models) {
    let { metaData, schemaOptions, schemas, plugins, actionClass } = models[key];

    if (!_.isUndefined(decorators.models[key])) {
        const decorator = decorators.models[key];

        if (!_.isUndefined(decorator.metaData)) {
            _.extend(metaData, decorator.metaData)
        }

        if (!_.isUndefined(decorator.schemaOptions)) {
            _.extend(schemaOptions, decorator.schemaOptions)
        }

        if (!_.isUndefined(decorator.schemas)) {
            _.extend(schemas, decorator.schemas)
        }

        if (!_.isUndefined(decorator.plugins) && _.isArray(decorator.plugins)) {
            plugins = plugins.concat(decorator.plugins);
          }

        if (!_.isUndefined(decorator.actionClass)) {
            actionClass = class extends MultipleInheritance.inherit(actionClass, decorator.actionClass){}
        }

    }

    // Create model schema
    const modelSchema = new Schema(schemas, schemaOptions);

    // Bind plugins to schema
    plugins.forEach((plugin) => {
        switch (plugin.type) {
            case 'uniqueValidator':
                modelSchema.plugin(availablePlugins[plugin.type], plugin.value);
                break;
        }
    });

    const { modelName } = metaData;

    if (!_.isNull(actionClass)) {
        modelSchema.loadClass(actionClass);
    }

    modelList[modelName] = model(modelName, modelSchema);
};

module.exports = modelList;