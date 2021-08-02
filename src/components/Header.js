import React, { useContext, useEffect, useState } from 'react'
import { Tabs, Tab, Typography, AppBar, Toolbar, IconButton, Drawer, ListItem, List, ListItemText, useMediaQuery } from '@material-ui/core';
import { Link } from 'react-router-dom'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { tabsContext } from '../App';
import { logsContext } from '../App';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles(theme => ({
    heading: {
        flex: 1
    },
    drawerItem:{
        color:'#0c0000'
    },
    drawerItemSelected:{
        backgroundColor : theme.palette.secondary.main
    },
    drawerbg:{
        backgroundColor:'blue'
    }
}))
function Header(props) {
    const classes = useStyles()
    const theme = useTheme();
    const matches  = useMediaQuery(theme.breakpoints.down('md'));

    const [openDrawer, setOpenDrawer] = useState(false)
 
    const routes = [

        { name: 'Home', link: '/', activeIndex: 0 },
        { name: 'Details', link: '/details', activeIndex: 1 },
        { name: 'AddProduct', link: '/add', activeIndex: 2 },
        { name: 'Register', link: '/register', activeIndex: 3 },
        { name: 'Login', link: '/login', activeIndex: 4 },

    ]

    const routes1 = [
        { name: 'Home', link: '/', activeIndex: 0 },
        { name: 'Details', link: '/details', activeIndex: 1 },
        { name: 'AddProduct', link: '/add', activeIndex: 2 },
        { name: 'Logout', link: '/logout', activeIndex: 3 }

    ]

    useEffect(() => {
        {routes.map((route, index)=>{
            switch(window.location.pathname){
                case `${route.link}`:
                    if(tabValue !== route.activeIndex){
                        setTabValue(route.activeIndex)
                    }
                    break;
                default :
                break;
            }
            })
        }
    },[])
       
    const { state, dispatch } = useContext(logsContext)
    const { tabValue, setTabValue } = useContext(tabsContext)
    const handleTabs = (e, newValue) => {
        console.log(newValue)
        setTabValue(newValue)
    }
   
    const handleDrawer = () => {
        setOpenDrawer(true)
    }
    return (
        <div>
            <AppBar>
                <Toolbar>
                    <Typography className={classes.heading} variant="h4">MERN</Typography>
                    <Tabs value={tabValue} onChange={handleTabs}>
                        {state ? routes1.map((route, index) => <Tab key={`${route}${index}`} component={Link} to={route.link} label={route.name} selected={route.activeIndex === index}></Tab>) :
                            routes.map((route, index) => <Tab key={`${route}${index}`} component={Link} to={route.link} label={route.name} selected={route.activeIndex === index}></Tab>)}

                    </Tabs>
                    <IconButton onClick={handleDrawer}><MenuIcon /></IconButton>
                        <Drawer open={openDrawer} onClose = {()=>setOpenDrawer(false)}>
 
                        {state ?
                        <List disablePadding classes = {{root: classes.drawerbg}}>
                           {routes1.map((route, index) => (<ListItem className = {tabValue === route.activeIndex ? [classes.drawerItem, classes.drawerItemSelected]: classes.drawerItem}  divider button key={`${route}${index}`}  component={Link} to={route.link} onClick={()=>{setOpenDrawer(false); setTabValue(route.activeIndex); }}  selected={tabValue === route.activeIndex }>
                        <ListItemText >{route.name}</ListItemText>
                        </ListItem>))}
                       </List>: <List disablePadding>
                            {routes.map((route, index) =>(< ListItem className = {tabValue === route.activeIndex ? [classes.drawerItem, classes.drawerItemSelected]: classes.drawerItem} divider button key={`${route}${index}`} component={Link} to={route.link} onClick={()=>{ setOpenDrawer(false); setTabValue(route.activeIndex);}}   selected={tabValue  ==route.activeIndex}>
                        <ListItemText >{route.name}</ListItemText>
                        </ListItem>))}
                       </List>
                       
                       }
                     
                        </Drawer>
                </Toolbar>
            </AppBar>

        </div>
    )
}

export default Header
