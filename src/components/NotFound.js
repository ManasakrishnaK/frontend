import { makeStyles } from '@material-ui/core/styles'
import { Grid, Typography } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles(theme => ({
    notFound: {
        height: '100vh',
        width:'100%',
        backgroundColor : '#FFFFFF',
        position:'fixed',
        zIndex:9999
    }
}))

function NotFound() {
    const classes = useStyles()
    return (
        <Grid container justifyContent="center" alignContent="center" className={classes.notFound}>
            <Grid item>
                <Typography variant = "h3">404 Error</Typography>
                <Typography variant = "h3">Page Not Found</Typography>
            </Grid>
        </Grid>
    )
}

export default NotFound
