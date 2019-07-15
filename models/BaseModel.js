const _ = require('lodash');

class multi
{
	// Inherit method to create base classes.
	static inherit(..._bases)
	{
		class classes {

			// The base classes
  			get base() { return _bases; }

			constructor(..._args)
			{
				var index = 0;

				for (let b of this.base) 
				{
					let obj = new b(_args[index++]);
   					multi.copy(this, obj);
				}
			}
		
		}

		// Copy over properties and methods
		for (let base of _bases) 
		{
   			multi.copy(classes, base);
   			multi.copy(classes.prototype, base.prototype);
		}

		return classes;
	}

	// Copies the properties from one class to another
	static copy(_target, _source) 
	{
    		for (let key of Reflect.ownKeys(_source)) 
			{
        		if (key !== "constructor" && key !== "prototype" && key !== "name") 
				{
	        	    let desc = Object.getOwnPropertyDescriptor(_source, key);
	        	    Object.defineProperty(_target, key, desc);
        		}
    		}
	}
}

class BaseModel {
  getMetaData() {
    if (!_.isUndefined(this.options.metaData)) {
      _.extend(this.metaData, this.options.metaData)
    }

    return this.metaData;
  }

  getSchemaOptions() {
    if (!_.isUndefined(this.options.schemaOptions)) {
      _.extend(this.schemaOptions, this.options.schemaOptions)
    }

    return this.schemaOptions;
  }

  getSchemas() {
    if (!_.isUndefined(this.options.schemas)) {
      _.extend(this.schemas, this.options.schemas)
    }
    
    return this.schemas;
  }

  getPlugins() {
    if (!_.isUndefined(this.options.plugins) && _.isArray(this.options.plugins)) {
      this.plugins = this.plugins.concat(this.options.plugins);
    }

    return this.plugins;
  }

  getActionClass() {
    let optionClass = this.actionClass;

    if (!_.isUndefined(this.options.actionClass) && !_.isNull(this.options.actionClass)) {
      optionClass = class extends multi.inherit(this.actionClass, this.options.actionClass){}
    }

    return optionClass;
  }
};

module.exports = BaseModel;