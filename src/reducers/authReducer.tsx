import { types } from "../types/types";

interface State{
    id:string,
    name:string|null
}

const initialState:State = {
    id: '',
    name: ''
}

export const authReducer = (state=initialState , action:any) =>{

    switch (action.type) {
        case types.login:
            return {
                 id:action.payload.id,
                 name:action.payload.displayName
            }
        case types.logout:
            return{
               id:'',
               name:''
            }
    
        default:
            return state
    }

}