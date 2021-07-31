const express = require('express')
const router = express.Router()
const Expense = require('../models/Expense')
const mongoose = require('mongoose')

router.post('/',(req,res,next)=>{
    const data = req.body
    const expense = new Expense({
        id : new mongoose.Types.ObjectId(),
        title : data.title,
        amount : data.amount,
        note : data.note,
        date : data.date
    })
    expense.save().then(resp=>{
        const response = {
            "status" : 200,
            "message" : "Expense added successfully"
        }
        res.write(JSON.stringify(response))
        res.end()
    }).catch(err=>{
        const response = {
            "status" : 500,
            "message" : "Something Went Wrong!"
        }
        res.write(JSON.stringify(response))
        res.end()
    })
    
})

module.exports = router