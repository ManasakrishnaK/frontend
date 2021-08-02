import React, { useState, useContext } from 'react'
import { Grid, Paper, TextField, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import {tabsContext} from '../App'
import {logsContext} from '../App'

const useStyles = makeStyles(theme => ({
    
    fieldSpacing: {
        marginBottom: '1rem'
    },
}))

function Login() {
    const {state, dispatch} = useContext(logsContext);
    const {tabValue, setTabValue} = useContext(tabsContext)
    const classes = useStyles();
    const history = useHistory()
    const [user, setUser] = useState({ email: "", password: "" })
    const changeHandler = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const submitUsertDetails = async (event) => {
        try {
            event.preventDefault();
            let result = await axios.post("http://localhost:3002/api/v1/user/login", user)
            console.log(result);
            dispatch({type:'USER', payload:true})
            setTabValue(0)
            history.push('/');
            
        } catch (error) {
            console.log(`error at ${error}`)
        }
    }

    const { email, password } = user
    return (
        <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
            <Grid item xs={4} >
                <Paper elevation={3}>
                    <div style={{ padding: '2rem' }}>
                        <form onSubmit={submitUsertDetails}>
                            <div className={classes.fieldSpacing}>
                                <TextField fullWidth label="Email" variant="filled" name="email" value={email} required onChange={changeHandler} />
                            </div>
                            <div className={classes.fieldSpacing}>
                                <TextField fullWidth label="Password" variant="filled" name="password" value={password} required onChange={changeHandler} />
                                </div>
                                <div>
                                    <Button type="submit" fullWidth variant="contained" color="primary">Login</Button>
                                </div>
                        </form>
                        </div>
                </Paper>
            </Grid>
        </Grid>
    )
    }
            export default Login
