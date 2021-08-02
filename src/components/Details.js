import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { Button, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { tabsContext } from '../App';
axios.defaults.withCredentials = true;


const useStyles = makeStyles(theme => ({
    editbtnbg: {
        backgroundColor: '#cc5500',
        color: theme.palette.common.white,
        '&:hover': {
            backgroundColor: '#cc5500',
        }
    },
    deletebtnbg: {
        backgroundColor: '#981111',
        color: theme.palette.common.white,
        '&:hover': {
            backgroundColor: '#981111',
        }
    },
    btnSpacing: {
        marginRight: '1rem'
    }
}))

function Details() {
    const classes = useStyles()
    const history = useHistory();
    const [users, setUsers] = useState([])
    const [search, setSearch] = useState("")
    const { tabValue, setTabValue } = useContext(tabsContext)

    useEffect(() => {
        getProductDetails();
        setTabValue(1);
    }, [])

    const deleteProduct = async (id) => {
        try {
            let result = await axios.delete(`http://localhost:3002/api/v1/product/${id}`);
            console.log(result);
            getProductDetails();
        } catch (error) {
            console.log(error.message)
        }


    }
    const getProductDetails = async () => {
        try {
            let result = await axios.get('http://localhost:3002/api/v1/product', { withCredentials: true, headers: { 'Content-Type': 'application/json' } })
            console.log('result is', result.status)
            if (!result.Status === 200 || !result) {
                throw new Error(result.error)  
            } else {
                setUsers(result.data.body);
            }
        } catch (error) {
            console.log(error);
            setTabValue(0)
            history.push("/")
        }



        /* let result  = await fetch('http://localhost:3002/api/v1/product',{
            method : 'GET',
            headers:{
                "Accept":"application/json",
                "Content-Type":"application/json"
            },
            credentials: "include"

        }
        )
        console.log(result) */
        //setUsers(result.data.body); 
    }

    const handleSearchChange = (e) => {
        setSearch(e.target.value);


    }
    return (
        <>
            <Grid container style={{ marginTop: '100px' }}>
                <Grid item xs={false} md={1} />
                <Grid item container direction="column" xs={12} md={10}>
                    <Grid>
                        <form align="right">
                            <TextField label="Search" value={search} variant="outlined" onChange={handleSearchChange}></TextField>
                        </form>
                    </Grid>
                    <Grid>
                        <TableContainer>
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>#</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Brand</TableCell>
                                        <TableCell>Color</TableCell>
                                        <TableCell>Price</TableCell>
                                        <TableCell>Details</TableCell>
                                        <TableCell>Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {users.map((user, index) => (
                                        <TableRow key={`${user}${index}`}>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>{user.name}</TableCell>
                                            <TableCell>{user.brand}</TableCell>
                                            <TableCell>{user.color}</TableCell>
                                            <TableCell>{user.price}</TableCell>
                                            <TableCell>{user.Details}</TableCell>
                                            <TableCell>
                                                <Button component={Link} to={`/edit/${user._id}`} variant="contained" className={classes.btnSpacing} classes={{ contained: classes.editbtnbg }}>Edit</Button>
                                                <Button component={Link} to={`/view/${user._id}`} variant="contained" className={classes.btnSpacing} color="primary">View</Button>
                                                <Button onClick={() => deleteProduct(user._id)} variant="contained" classes={{ contained: classes.deletebtnbg }}>Delete</Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>
                <Grid xs={false} md={1} />
            </Grid>

        </>
    )
}

export default Details
