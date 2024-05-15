const path = require( 'path' );
// -------------------------------------------
const db = require('../../database/models');
// // ----------------------------------------
const Product = db.Product;
const Category = db.Category;
// ----------------------------------------------
// const Product =  require('../database/models/admin/Product.js'); 
// const Category= require('../database/models/admin/Category.js'); 

const productsController = {
    list: (req, res) => {
        Product.findAll({
            include: ['category']
        })
        .then(products => {
            res.render('admin/productsList', {products})
        })
    },
    detail: (req, res) => {
        Product.findByPk(req.params.id, { include: ['category'] })
        .then(product => {
            res.render('admin/productsDetail', { product })
        })
    },
    add:  (req, res) => {
        let promCategory =  Category.findAll();
        Promise.all([ promCategory ])
        .then(([categories])=>{
            res.render('admin/productsAdd', { categories });
        })
        .catch(err => console.log(err));
    },
    create: function (req, res){
        Product.create(
            {
                name: req.body.name,
                img: req.file ? req.file.filename : 'default-image.png',
                price: req.body.price,
                stock: req.body.stock,
                category_id: req.body.category_id
            }
        )
        .then(() => {
            return res.redirect('/admin/product')
        })
        .catch(err => console.log(err));
    },
    edit: function(req,res) {
        let id = req.params.id;
        let promProduct = Product.findByPk(id,{include: ['category']});
        let promCategory = Category.findAll();
        Promise
        .all([promProduct, promCategory])
        .then(([product, categories]) => {
            res.render('admin/productsEdit', { product, categories })
        })
        .catch(error => res.send(error))
    }, 
    update: function (req,res) {
        let productId = req.params.id;
        Product.update(
        {
            name: req.body.name,
            img: req.file ? req.file.filename : 'default-image.png',
            price: req.body.price,
            stock: req.body.stock,
            category_id: req.body.category_id
        },
        {
            where: {id: productId}
        })
        .then(()=> {
            return res.redirect('/admin/product')})            
        .catch(error => res.send(error))
    }, 
    // delete:  function(req,res){
    //     let movieId = req.params.id;
    //     Movies.findByPk(movieId)
    //     .then( Movie => {
    //         return res.render(path.resolve(__dirname, '..', 'views',  'moviesDelete'), {Movie})
    //     })
    //     .catch(error => res.send(error))
    // }, 
    destroy: function(req,res){
        let productId = req.params.id;
        Product.destroy({ where:{ id: productId }})
        .then(()=>{return res.redirect('/admin/product')})
        .catch( error => res.send(error))
    }

}


module.exports = productsController;
