const { User } = require('../models')

module.exports = {
    authenticate: (req, res, next) => {

        const user = new User();

        user.username = req.body.username;
        user.email = req.body.email;
        user.setPassword(req.body.password);

        user.save().then(function(){
            res.json({user: user.toAuthJSON()});
        }).catch(next);
    }
};