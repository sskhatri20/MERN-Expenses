const mongoose = require('mongoose')

const expenseSchema = mongoose.Schema({
    id : mongoose.Schema.Types.ObjectId,
    title : String,
    amount : String,
    note : String,
    date : String
})

module.exports = mongoose.model('Expense',expenseSchema)