const path = require( 'path' );
// -------------------------------------------
const db = require('../../database/models');
// // ----------------------------------------
const Product = db.Product;
const Category = db.Category;
// ----------------------------------------------

const storesController = {
    list: (req, res) => {
        Product.findAll({
            include: ['category']
        })
        .then(products => {
            res.render('index', {products})
        })
    }
}

module.exports = storesController;
