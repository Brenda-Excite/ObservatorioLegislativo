import { InitialState } from "../interfaces/politicalsPartiesInterfaces"
import { types } from "../types/types";

const initialState:InitialState={
   politicals:[],
   update:false,
   politicalSelected:null

}
export const politicalPartieReducer = (state=initialState , action:any) =>{
    switch (action.type) {
        case types.politicalPartiesLoad:
            return{
                ...state,
                politicals: action.payload
            }  
        case types.politicalPartyAddNew:  
            return{
                ...state,
                politicals:[...state.politicals, action.payload]
            }
        case types.politicalPartiesActiveUpdated:
            return{
                ...state,
                update:true,
                politicalSelected:action.payload
        }
        case types.politicalPartyUpdate:
            return{
                ...state,
                politicals:state.politicals.map(political=>political.id === action.payload.id ? action.payload : political),
                update:false,
                politicalSelected:null
            }
        case types.politicalPartyDelete:
            return{
                ...state,
                politicals:state.politicals.filter(political=>political.id !== action.payload)
            }
        default:
            return state;
    }

}