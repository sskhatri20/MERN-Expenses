const express = require('express')
const router = express.Router()
const Expense = require('../models/Expense')

router.get('/',(req,res,next)=>{
    Expense.find().exec().then(expenses => {
        res.write(JSON.stringify(expenses));
        res.end();
    }).catch(err=>{
        res.status(500).json({
            error : err
        })
    })
    
})

module.exports = router