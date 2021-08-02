import React, { useState, useReducer} from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Home from './components/Home'
import Details from './components/Details'
import Contact from './components/Contact'
import NotFound from './components/NotFound'
import { ThemeProvider } from '@material-ui/core/styles'
import theme from './Theme'
import Header from './components/Header';
import AddProduct from './components/AddProduct';
import EditProduct from './components/EditProduct'
import ViewProduct from './components/ViewProduct'
import Register from './components/Register'
import Login from './components/Login'
import Logout from './components/Logout'
import { initialState, reducer } from './components/reducer/logsreducer'

export const tabsContext = React.createContext()
export const logsContext = React.createContext()



function App() {
  const [tabValue, setTabValue] = useState(0)
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [state, dispatch] = useReducer(reducer, initialState);

  console.log(`tabValue is ${tabValue}`)
  return (
    <ThemeProvider theme={theme}>
      <logsContext.Provider value = {{state, dispatch}}>
      <tabsContext.Provider value = {{tabValue, setTabValue}}>
      <BrowserRouter>
        <Header/>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/details" exact component={Details} />
          <Route path ="/add" exact  component={AddProduct}/>
          <Route path ="/edit/:id" component={EditProduct}/>
          <Route path ="/view/:id" component={ViewProduct}/>
          <Route path ="/register" component={Register}/>
          <Route path ="/Login" component={Login}/>
          <Route path ="/Logout" component={Logout}/>
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
      </tabsContext.Provider>
      </logsContext.Provider>
    </ThemeProvider>
  );
}

export default App;
