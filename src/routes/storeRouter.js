const express = require( 'express' );
const router = express.Router();

const storesController = require("../controllers/page/storesController");

router.get('/', storesController.list);


module.exports = router;