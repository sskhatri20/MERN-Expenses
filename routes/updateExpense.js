const express = require('express')
const router = express.Router()
const Expense = require('../models/Expense')

router.post('/',(req,res,next)=>{
    const id = req.body.id
    const update = {
        title : req.body.title,
        amount : req.body.amount,
        note : req.body.note,
        date : req.body.date
    }
    Expense.updateOne({"id" : id},{$set : update})
    .then(resp=>{
        res.write(JSON.stringify(resp))
        res.end()
    }).catch(err=>{
        res.write(JSON.stringify(err))
        res.end()
    })
})

module.exports = router