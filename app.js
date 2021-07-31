const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const app = express()

//routes
const addRoute = require('./routes/addExpense')
const fetchallRoute = require('./routes/fetchAll')
const updateRoute = require('./routes/updateExpense')
const deleteRoute = require('./routes/deleteExpense')
 
//connect to Mongo DB
mongoose.connect('mongodb+srv://admin:admin@expensecluster.4i2sy.mongodb.net/<dbname>?retryWrites=true&w=majority',
{ useUnifiedTopology: true,useNewUrlParser: true })

//logs the incoming api requests.
app.use(logger('dev'))

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

//deployment
app.use(express.static('client/build'));


//handling cors error
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*')
    res.header('Access-Control-Allow-Headers','Origin,X-Requested-With,Content-Type,Accept,Authorization')
    
    if(req.method === "OPTIONS"){
        res.header("Access-Control-Allow-Methods","PUT,POST,GET,PATCH,DELETE")
        return res.status(200).json({})
    }
    next()
})

//Route to handle api requests.
app.use('/',fetchallRoute)
app.use('/addexpense',addRoute)
app.use('/update',updateRoute)
app.use('/delete',deleteRoute)

//middleware to handle api requests to invalid routes.
app.use((req,res,next)=>{
    const error = new Error('Page Not Found!!')
    error.status = 404
    next(error)
})

//error handling
app.use((error,req,res,next)=>{
    res.status(error.status || 500)
    res.json({
        error : {
            message : error.message
        }
    })
})


module.exports = app