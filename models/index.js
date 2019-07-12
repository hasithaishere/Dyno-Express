/**
 * @file Class make the entry to all the model classes.
 * @author Hasitha Gamage
 */
'use strict';

const { model, Schema } = require('mongoose');
const _ = require('lodash');

// Require all model classes in model folder
const models = require('require-all')({
    dirname:  __dirname,
    filter: (fileName) => {
        if (fileName === 'index.js' || fileName === 'BaseModel.js') return;
        else {
            return fileName.split('.')[0];
        }
    },
    excludeDirs:  /^\.(git|svn)$/,
    recursive: false
});

// Available plugins
const plugins = {
  uniqueValidator: require('mongoose-unique-validator')
};

const modelList = {};

for (const key in models) {
    const Model = new models[key]();

    // Create model schema
    const ModelSchema = new Schema(Model.getSchemas(), Model.getSchemaOptions());
    // Get used plugin
    const usedPlugins = Model.getPlugins();

    // Bind plugins to schema
    usedPlugins.forEach((plugin) => {
        switch(plugin.type) {
            case 'uniqueValidator':
                ModelSchema.plugin(plugins[plugin.type], plugin.value);
            break;
        }
    });

    const { modelName } = Model.getMetaData();

    const actionClass = Model.getActionClass();

    if (!_.isNull(actionClass)) {
        ModelSchema.loadClass(Model.getActionClass());
    }
    
    modelList[modelName] = model(modelName, ModelSchema);
};

module.exports = modelList;