import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import { FaPencilAlt } from 'react-icons/fa'
import axios from 'axios'
export default class AddForm extends Component {
    constructor(){
        super()
        this.state = {
            title : "",
            amount : "",
            note : "",
            date : "",
            errorMessage : "",
            editing : false,
            datetype : false
        }
    }
    componentDidUpdate(prevProps) {
        if (prevProps.editData !== this.props.editData) {
          this.setState({
              editing : true,
              title : this.props.editData.title,
              amount : this.props.editData.amount,
              note : this.props.editData.note,
              date : this.props.editData.date,
          })
        }
      }
    onChangeHandler = (e,key)=>{
        this.setState({[key] : e.target.value});
    }
    onFocus = (e,key) =>{
        this.setState({errorMessage : "",[key]:""})
        if(key==="date"){
            this.setState({datetype:true})
        }
    }
    addExpense = () => {
        const {title, amount, note, date} = this.state;
        if(title === "" || amount === "" || note === "" || date === ""){
            this.setState({errorMessage : "All Fields Are Mandatory."})
        }else{
            axios.post('/addexpense',{
                "title" : title,
                "amount" : amount,
                "note" : note,
                "date":date 
            }).then(res=>{
                console.log(res)
                this.props.getExpenses()
                this.props.notify(title + " has been Added Successfully!!")
            }).catch(err=>{
                console.log(err)
            })
            this.setState({title:"", amount:"", note:"", date:""})
        }
    }
    editExpense = () => {
        const {title, amount, note, date} = this.state;
        if(title === "" || amount === "" || note === "" || date === ""){
            this.setState({errorMessage : "All Fields Are Mandatory."})
        }else{
            axios.post('/update',{
                "id" : this.props.editData.id,
                "title" : title,
                "amount" : amount,
                "note" : note,
                "date":date 
            }).then(res=>{
                console.log(res)
                this.props.getExpenses()
                this.props.notify(title + " has been Updated Successfully!!")
            }).catch(err=>{
                console.log(err)
            })
            this.setState({title:"", amount:"", note:"", date:"",editing : false})
        }
    }
    render() {
        return (
            <Grid container justify = 'center'spacing={3}>
                <Grid item xs = {10}>
                    {this.state.errorMessage === ""?"":<p className = "error"><small>{this.state.errorMessage}</small></p>}
                </Grid>
                <Grid item xs = {10}>
                    <input className = 'input' type = 'text' placeholder = 'Title' value = {this.state.title} onFocus = {(e)=>this.onFocus(e,"title")} onChange = {(e)=>this.onChangeHandler(e,"title")}></input>
                </Grid>
                <Grid item xs = {10}>
                    <input className = 'input' type = 'number' placeholder = 'Amount' value = {this.state.amount}onFocus = {(e)=>this.onFocus(e,"amount")} onChange = {(e)=>this.onChangeHandler(e,"amount")}></input>
                </Grid>
                <Grid item xs = {10}>
                    <input className = 'input' type = 'text' placeholder = 'Note' value = {this.state.note} onFocus = {(e)=>this.onFocus(e,"note")} onChange = {(e)=>this.onChangeHandler(e,"note")}></input>
                </Grid>
                <Grid item xs = {10}>
                    <input className = 'input' type = {this.state.datetype?'date':'text'} placeholder = 'Date' value = {this.state.date} onFocus = {(e)=>this.onFocus(e,"date")} onChange = {(e)=>this.onChangeHandler(e,"date")} onBlur = {()=>this.setState({datetype:false})}></input>
                </Grid>
                <Grid item xs = {10}></Grid>
                <Grid item xs = {10}>
                    {!this.state.editing ? 
                        <button className = "addbutton" onClick = {this.addExpense} ><big>+ </big> &nbsp;&nbsp;&nbsp;&nbsp;Add Expense</button>
                        : <button className = "addbutton" onClick = {this.editExpense} ><big> <FaPencilAlt /></big> &nbsp;&nbsp;&nbsp;&nbsp;Edit Expense</button>
                    }
                </Grid>
            </Grid>
        )
    }
}
