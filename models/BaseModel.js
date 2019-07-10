class BaseModel {
    getMetaData() {
      throw new Error("Method 'getMetaData()' must be implemented.");
    }

    getSchemaOptions () {
      throw new Error("Method 'getSchemaOptions()' must be implemented.");
    }

    getSchemas () {
      throw new Error("Method 'getSchemas()' must be implemented.");
    }

    getPlugins() {
      throw new Error("Method 'getPlugins()' must be implemented.");
    }

    getActionClass () {
      throw new Error("Method 'getActionClass()' must be implemented.");
    }
};

module.exports = BaseModel;