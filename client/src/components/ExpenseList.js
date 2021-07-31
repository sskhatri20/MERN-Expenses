import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import ExpenseCard from './ExpenseCard'
export default class ExpenseList extends Component {
    render() {
        const {expenses, getExpenses, setEditData, notify} = this.props;
        return (
            <Grid container spacing = {3}>
                {expenses.map((expense,index)=><ExpenseCard key = {index} data = {expense} refreshExpenses = {getExpenses} setEditData = {setEditData} notify = {notify}/>)}                
            </Grid>
        )
    }
}
