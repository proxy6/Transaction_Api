require('dotenv').config()
const express = require('express')
const app = express();
const cookieparser = require('cookie-parser')
const indexRouter = require('./router/index')



app.use(cookieparser());
app.use(express.json());
app.use(express.urlencoded({
	extended: false,
}));


app.use('/v1/api', indexRouter)
const port = process.env.PORT || 3500
app.listen(port, ()=>{
    console.log(`App Started in Port ${port}`)
})