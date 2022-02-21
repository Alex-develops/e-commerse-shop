module.exports = {
    getError (errors, prop) {
        //prop ==='email'|| 'password' || 'passwordConfirmation' - 
        //props from req.body object, which are the input names in the form
        try {
            return errors.mapped()[prop].msg;
        } catch (err) {
            return '';
        }
    }
};