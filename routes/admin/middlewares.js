const {validationResult} = require('express-validator');

module.exports = { //export an object with a couple of different functions or in this case one func called handlerrors
    //it takes func as an arrg and returns another func
    handleErrors(templateFunc, dataCb) {
        return async (req, res, next) => {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {

                let data ={};
                if (dataCb) {
                    data = await dataCb(req);
                }
                return res.send(templateFunc({errors, ...data}));
            }

            next(); // if no errors, call next middleware or envole route handler
        };
    },
    requireAuth(req, res, next) {
        if (!req.session.userId) {
            return res.redirect('/signin');
         }

         next();
    }
};

//if we see duplication between route handlers, we create middleware functions