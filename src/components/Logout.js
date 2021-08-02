import React, { useEffect, useContext } from 'react';
import axios from 'axios';
import {logsContext} from '../App';
import {tabsContext} from '../App'
import {useHistory} from 'react-router-dom'

function Logout() {
    const {state, dispatch} = useContext(logsContext);
    const {tabValue, setTabValue} = useContext(tabsContext)

    const history = useHistory()
    useEffect(() => {
        logout();
     

    }, [])

    const logout = async () => {
        try {
            let result = await axios.get('http://localhost:3002/api/v1/user/logout', { withCredentials: true, headers: { 'Content-Type': 'application/json' } })
            console.log(result);
            dispatch({type:'USER', payload:false})
            setTabValue(4)
            history.push('/login')
            
        }catch(error){
            console.log(error)
        }
}
    return (
        <div>

        </div>
    )
}

export default Logout
