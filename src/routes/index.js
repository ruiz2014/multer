let express = require( 'express' );
let  router = express.Router();

router.get("/", function (req, res) {
    console.log("a ver")
    res.render("index", {title: "Home"});
})

module.exports = router