var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var secret = 'wsdfghjrtyuFCV5ybh6FDh';

var UserSchema = new mongoose.Schema({
  username: { type: String, lowercase: true, unique: true, required: [true, "can't be blank"], match: [/^[a-zA-Z0-9]+$/, 'is invalid'], index: true },
  email: { type: String, lowercase: true, unique: true, required: [true, "can't be blank"], match: [/\S+@\S+\.\S+/, 'is invalid'], index: true },
  bio: { type: String },
  image: { type: String },
  hash: { type: String },
  salt: { type: String }
}, { collection: 'User', timestamps: true });

UserSchema.plugin(uniqueValidator, { message: 'is already taken.' });

class UserClass {
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
}

UserSchema.loadClass(UserClass);
module.exports = mongoose.model('User', UserSchema);
