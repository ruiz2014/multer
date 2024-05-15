const express = require('express')
const path = require('path')
const app = express()
const methodOverride = require('method-override')

const productsRouter = require('./routes/productsRouter');
const storesRouter = require('./routes/storeRouter');

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, './views'))

app.use(express.static(path.join(__dirname, '../public')))

app.use(express.urlencoded({extend:true}))
app.use(methodOverride("_method"))

app.listen(3001, () =>{
    console.log("ok")
})

app.use("/", storesRouter);
app.use(productsRouter);
