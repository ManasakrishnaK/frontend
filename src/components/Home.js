import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {Grid,Typography } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    heading: {
        height: '100vh'
    }
}))

function Home() {
    const classes = useStyles()
    return (
        <Grid container className  = {classes.heading} justifyContent = "center" alignItems = "center">
            <Grid item>
                <Typography variant='h2'>Mern Project</Typography>
            </Grid>
        </Grid>


    )
}

export default Home
