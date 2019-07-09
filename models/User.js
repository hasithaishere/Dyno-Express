const { model, Schema } = require('mongoose');

// Available plugins
const plugins = {
  uniqueValidator: require('mongoose-unique-validator')
};

const UserModel = require('./User_Str');
const User = new UserModel();

const UserSchema = new Schema(User.getSchemas(), User.getSchemaOptions());

const usedPlugins = User.getPlugins();

usedPlugins.forEach((plugin) => {
  switch(plugin.type) {
    case 'uniqueValidator':
      UserSchema.plugin(plugins[plugin.type], plugin.value);
      break;
  }
});

const { modelName } = User.getMetaData();

UserSchema.loadClass(User.getActionClass());
module.exports = model(modelName, UserSchema);
