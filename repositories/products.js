const Repository = require ('./repository');

class ProductsRepository extends Repository {}

module.exports = new ProductsRepository('products.json');
//create an instance and export it; then require it in products.js