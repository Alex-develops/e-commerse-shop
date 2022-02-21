// req.body is an object that contants all the properties inside of the form
// urlencoded is a middleware func on bodyparser, it is for handling info from HTML form

const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session'); //Middleware function, so we add it to app.use
const authRouter = require('./routes/admin/auth'); //authRouter
const adminProductsRouter = require('./routes/admin/products');
const productsRouter = require('./routes/products');
const cartsRouter = require('./routes/carts');

const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieSession({
  keys: ['ajsdkfgakdhfk']
}));
app.use(authRouter); 
app.use(productsRouter);
app.use(adminProductsRouter);
app.use(cartsRouter);


app.listen(3000, () => {
  console.log('Listening');
});
