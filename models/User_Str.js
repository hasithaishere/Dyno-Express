const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const secret = 'wsdfghjrtyuFCV5ybh6FDh';

class User {
    constructor (options) {
        this.options = options;
    }

    getMetaData() {
        return { modelName: 'User' };
    }

    getSchemaOptions () {
        return { collection: 'User', timestamps: true };
    }

    getSchemas () {
        return {
            username: { type: String, lowercase: true, unique: true, required: [true, "can't be blank"], match: [/^[a-zA-Z0-9]+$/, 'is invalid'], index: true },
            email: { type: String, lowercase: true, unique: true, required: [true, "can't be blank"], match: [/\S+@\S+\.\S+/, 'is invalid'], index: true },
            bio: { type: String },
            image: { type: String },
            hash: { type: String },
            salt: { type: String }
        };
    }

    getPlugins() {
        return [{
            type: 'uniqueValidator',
            value: { message: 'is already taken.' }
        }];
    }

    getActionClass () {
        return class UserClass {
            validPassword(password) {
              var hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
              return this.hash === hash;
            }
          
            setPassword(password) {
              this.salt = crypto.randomBytes(16).toString('hex');
              this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
            }
          
            generateJWT() {
              var today = new Date();
              var exp = new Date(today);
              exp.setDate(today.getDate() + 60);
            
              return jwt.sign({
                id: this._id,
                username: this.username,
                exp: parseInt(exp.getTime() / 1000),
              }, secret);
            }
          
            toAuthJSON() {
              return {
                username: this.username,
                email: this.email,
                token: this.generateJWT(),
                bio: this.bio,
                image: this.image
              };
            }
          
            toProfileJSONFor(user) {
              return {
                username: this.username,
                bio: this.bio,
                image: this.image || 'https://static.productionready.io/images/smiley-cyrus.jpg'
              };
            }
        };
    }
};

module.exports = User;