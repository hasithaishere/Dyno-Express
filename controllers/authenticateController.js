const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports = {
    authenticate: (req, res, next) => {

        const user = new User();

        user.username = req.body.username;
        user.email = req.body.email;
        user.setPassword(req.body.password);

        user.save().then(function(){
            return res.json({user: user.toAuthJSON()});
        }).catch(next);



        //res.send('respond with a resource');
    }
};