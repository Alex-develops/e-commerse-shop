const express = require('express');

const {handleErrors} = require('./middlewares');
const usersRepo = require('../../repositories/users');
const signupTemplate = require('../../views/admin/auth/signup');
const signinTemplate = require('../../views/admin/auth/signin');
const { 
    requireEmail, 
    requirePassword, 
    requirePasswordConfirmation, 
    requireEmailExists, 
    requireValidPasswordForUser 
} = require('./validators');

const router = express.Router(); //subrouter the same router as const app, export it and then require it in index.js and link it up to app

router.get('/signup', (req, res) => {
    res.send(signupTemplate({ req }));
  });
  
  router.post('/signup', 
  [
      requireEmail,
      requirePassword,
      requirePasswordConfirmation
      
  ],
  handleErrors(signupTemplate),
  async (req, res) => {
    
    const { email, password } = req.body;
    const user = await usersRepo.create({email: email, password: password});
  
    //Store the id of that user inside the users cookie
    req.session.userId = user.id; //session property is added to req object by cookie session library
    res.redirect('/admin/products');
  }
);
  
  router.get('/signout', (req, res) =>{
    req.session = null;
    res.send('You have signed out');
  });
  
  router.get('/signin', (req, res) =>{
    res.send(signinTemplate({})); 
  });
  
  router.post('/signin', 
  [requireEmailExists, requireValidPasswordForUser ],
  handleErrors(signupTemplate),
  async (req, res) => {
    
    const { email} = req.body;
    const user = await usersRepo.getOneBy({email});
    
    req.session.userId = user.id;
    res.redirect('/admin/products');
    
  });
  
  module.exports = router;