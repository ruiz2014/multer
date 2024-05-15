const express = require( 'express' );
const router = express.Router();
const multer = require("multer")
var path = require('path');

const productsController = require("../controllers/admin/productsController");

const storage=multer.diskStorage({
    destination:function (req,file,cb){
        cb(null,path.join(__dirname,'../../public/img/products'));
    },
    filename:function(req,file,cb){
        cb(null,`${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({storage});

router.get('/admin/product', productsController.list);
router.get('/admin/products/detail/:id', productsController.detail);
//------------Crear Producto -------------------//
router.get('/admin/products/add', productsController.add);
router.post('/admin/products/create', upload.single('product_img'), productsController.create);
//------------Editar Producto -------------------//
router.get('/admin/products/edit/:id', productsController.edit);
router.put("/admin/products/update/:id", upload.single('product_img'), productsController.update)
//-----------------Eliminar Producto ------------//
router.delete("/admin/products/delete/:id", productsController.destroy)

module.exports = router;