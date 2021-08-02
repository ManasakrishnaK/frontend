
export let  initialState = null
export const reducer = (state, action) => {
    switch (action.type) {
        case 'USER': 
            return action.payload;
            break;
        default :
            break;
        
    }
}