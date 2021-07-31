import React ,{ useState, useEffect }from 'react';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import 'rc-notification/assets/index.css';
import Notification from 'rc-notification';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import axios from 'axios'

import AddForm from './components/AddForm';
import ExpenseList from './components/ExpenseList'

let notification = null;
Notification.newInstance({}, (n) => notification = n);


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: 'white',
    background:'transparent',
    maxHeight : '70vh',
    overflow : 'auto',
  },
  borderBottom : {
    borderBottom : '1px solid #b07ff6',marginBottom : '8vh'
  }

}));

function App() {
  const classes = useStyles();
  const [total, setTotal] = useState(0)
  const [expenses, setExpenses] = useState([])
  const [editData, setEditData] = useState({})
  const [error, setError] = useState("")

  const getexpenses = () => {
    axios.get('/').then(res=>{
      setExpenses(res.data)
      let total = 0
      res.data.map(x=>{
        total = total+Number(x.amount)
      })
      setTotal(total)
    }).catch(err=>{
      setError("Something Went Wrong.")
    })
  }
  const notify = (message) => {
    notification.notice({
      content: <span>{message}</span>,
      onClose() {
        console.log('closed');
      },
    });
  }
  useEffect(() => {
    getexpenses()
    notify("Welcome to Expense Tracker App")
  }, [])
 
  return (
    <div className={classes.root}>
      <br /><br />
      <Grid container spacing={1} justify="center">

          <Grid item container  xs={11} className = {classes.borderBottom}>

              <Grid item lg = {3} xl = {3} md = {3} xs = {11} sm = {5} >
                <h1 className = "title">MY  EXPENSES</h1>
              </Grid>
              <Grid item lg xl md xs sm></Grid>
              <Grid item container lg = {3} xl = {3} md = {3} xs = {11} sm = {5} spacing={3} justify="center">
                <Grid item  >
                  <h2 className = "total" >Total </h2>
                </Grid>
                <Grid item >
                  <h1 className = "price">{total}</h1>
                </Grid>
              </Grid>

          </Grid>
          <Grid item container spacing={10} justify="center">
            <Grid item xs={11} sm = {11} md = {4} lg = {4} xl = {4}>
              <Paper className={classes.paper}><AddForm getExpenses = {getexpenses} editData = {editData} notify = {notify}/></Paper>
            </Grid>
            <Grid item xs={11} sm = {11} md = {6} lg = {6} xl = {6}>
              <Paper className={classes.paper}><ExpenseList expenses = {expenses} getExpenses = {getexpenses} setEditData = {setEditData} notify = {notify}/></Paper>
            </Grid>
          </Grid>
          
      </Grid>
    </div>
  );
}

export default App;
