import React, { useState, useEffect, useContext } from 'react'
import { Grid, List, ListItem, ListItemText, Typography } from '@material-ui/core';
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { tabsContext } from '../App';
import {makeStyles} from '@material-ui/core/styles'

const useStyles  = makeStyles(theme=>({
        headingStyles: {
                color: theme.palette.primary,
                marginBottom: '2rem',
                textAlign: 'center'
            }
}))
function ViewProduct() {
        const classes = useStyles()
        const params = useParams();
        const { tabValue, setTabValue } = useContext(tabsContext)
        const { id } = params
        const [product, setProduct] = useState({ name: "", brand: "", color: "", price: "", Details: "" });

        useEffect(() => {
                setTabValue(1)
                getProductDetails()
        }, [])

        const getProductDetails = async () => {
                try {
                        let result = await axios.get(`http://localhost:3002/api/v1/product/${id}`);
                        setProduct(result.data.body)
                } catch (error) {
                        console.log(error.message)
                }
        };
        const { name, brand, color, price, Details } = product;
        return (
                <Grid container style={{ marginTop: '100px' }}>
                        <Grid item xs={3} />
                        <Grid item container xs={6} direction="column">
                                <Grid item>
                                        <Typography variant="h4" className={classes.headingStyles}>View Product Details</Typography>
                                </Grid>
                                <Grid item>
                                        <List>
                                                <ListItem divider>
                                                        <ListItemText>Name: {name}</ListItemText>
                                                </ListItem>
                                                <ListItem divider>
                                                        <ListItemText>Brand: {brand}</ListItemText>
                                                </ListItem>
                                                <ListItem divider>
                                                        <ListItemText>Color: {color}</ListItemText>
                                                </ListItem>
                                                <ListItem divider>
                                                        <ListItemText>Price: {price}</ListItemText>
                                                </ListItem>
                                                <ListItem divider>
                                                        <ListItemText>Details: {Details}</ListItemText>
                                                </ListItem>
                                        </List>
                                </Grid>
                        </Grid>
                        <Grid item xs={3} />
                </Grid>


        )
}

export default ViewProduct
