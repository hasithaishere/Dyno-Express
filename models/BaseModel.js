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
      return [];
    }

    getActionClass () {
      return null;
    }
};

module.exports = BaseModel;