const express = require('express')
const router = express.Router()
const Expense = require('../models/Expense')

router.post('/',(req,res,next)=>{
    id = req.body.id
    Expense.deleteOne({"id" : id})
    .then(resp=>{
        res.write(JSON.stringify(resp))
        res.end()
    }).catch(err=>{
        res.write(JSON.stringify(err))
        res.end()
    })
})

module.exports = router