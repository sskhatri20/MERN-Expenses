import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import { FaPencilAlt } from 'react-icons/fa'
import { FaTimesCircle } from 'react-icons/fa'
import axios from 'axios'
import '../App.css'
export default class ExpenseCard extends Component {
    deleteExpense = () =>{
        const { data ,refreshExpenses, notify } = this.props
        axios.post('/delete',{
            "id" : data.id
        }).then(res=>{
            console.log(res);
            refreshExpenses()
            notify(data.title + " has been Deleted Successfully!!")
        }).catch(err=>{
            console.log(err);
        })
    }
    render() {
        const { data ,refreshExpenses, setEditData} = this.props
        return (
            <Grid item container xs = {11}  justify="center" alignItems="center">
                <Grid item xs = {2} ><p className = "card-icons" onClick = {()=>setEditData(data)}><FaPencilAlt /><br /> <small>Edit</small></p></Grid>
                <Grid item xs = {8}>
                    <Paper className = "card-paper">
                        <Grid Container >
                            <Grid item xs = {12} ><p className = "pd-mg-0 card-date">{data.date}</p></Grid>
                            <Grid item container xs = {12} spacing={0}>
                                <Grid item xs = {7} ><h3 className = "pd-mg-0 card-title">{data.title}</h3></Grid>
                                <Grid item xs = {4}><h3 className = "pd-mg-0 card-amount">Rs {data.amount}</h3></Grid>
                            </Grid>
                            <Grid item xs = {12}><p className = "pd-mg-0 card-note"><strong>NOTE : </strong>{data.note}</p></Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs = {2} ><p className = "card-icons" onClick = {this.deleteExpense}><FaTimesCircle /><br /> <small>Remove</small></p></Grid>
            </Grid>
        )
    }
}
