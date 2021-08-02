import React, { useEffect, useState, useContext } from 'react';
import { Grid, TextField, Typography, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import { tabsContext } from '../App'

const useStyles = makeStyles(theme => ({
    fieldSpacing: {
        marginBottom: '1rem'
    },
    headingStyles: {
        color: theme.palette.primary,
        marginBottom: '2rem',
        textAlign: 'center'
    }
}))

function EditProduct(props) {
    const classes = useStyles();
    const history = useHistory();
    const { id } = useParams();
    console.log(id)
    const { TabValue, setTabValue } = useContext(tabsContext)
    const [product, setProduct] = useState({ name: "", brand: "", color: "", price: "", Details: "" });

    useEffect(() => {
        setTabValue(1)
        getProductDetail()
    }, [])

    const getProductDetail = async () => {
        try {
            let result = await axios.get(`http://localhost:3002/api/v1/product/${id}`);
            setProduct(result.data.body)
        } catch (error) {
            console.log(error.message)
        }
    }

    const changeHandler = (e) => {
        console.log(e.target.name)
        setProduct({ ...product, [e.target.name]: e.target.value })
    }
    const submitProductDetails = async (e) => {
        try {
            e.preventDefault();
            let result = await axios.put(`http://localhost:3002/api/v1/product/${id}`, product)
            console.log(result);
            setTabValue(1)
            history.push("/details");
        } catch (error) {
            console.log(error.message)
        }
    }

    const { name, brand, color, price, Details } = product;
    return (
        <Grid container style={{ marginTop: '100px' }}>
            <Grid item xs={2} />
            <Grid item xs={8} container direction="column">

                <Grid item>
                    <Typography variant="h4" className={classes.headingStyles}>Edit Product Details</Typography>
                </Grid>

                <Grid item>
                    <form onSubmit={submitProductDetails}>
                    <div className={classes.fieldSpacing}>
                            <TextField fullWidth label="Name" variant="filled" name="name" value={name} required onChange={changeHandler} />
                        </div>
                        <div className={classes.fieldSpacing}>
                            <TextField fullWidth label="Brand" variant="filled" name="brand" value={brand} required onChange={changeHandler} />
                        </div>
                        <div className={classes.fieldSpacing}>
                            <TextField fullWidth label="Color" variant="filled" name="color" value={color} required onChange={changeHandler} />
                        </div>
                        <div className={classes.fieldSpacing}>
                            <TextField fullWidth label="Price" variant="filled" name="price" value={price} required onChange={changeHandler} />
                        </div>
                        <div className={classes.fieldSpacing}>
                            <TextField fullWidth label="Details" variant="filled" name="Details" value={Details} required onChange={changeHandler} />
                        </div>
                        <div>
                            <Button type="submit" fullWidth variant="contained" color="primary">Submit Product</Button>
                        </div>                
                    </form>
                </Grid>

            </Grid>
            <Grid item xs={2} />
        </Grid>
    )
}

export default EditProduct
