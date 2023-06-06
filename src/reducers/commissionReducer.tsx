import { Commissions } from "../interfaces/commissionsInterfaces"
import { types } from "../types/types"

const initialState:Commissions = {
    commissions:[],
    update:false,
    commissionSelected:null
}


export const commissionsReducer = (state=initialState , action:any) =>{
    switch (action.type) {
        case types.commissionsLoad:
        return{
            ...state,
            commissions:action.payload
        }
        case types.commissionAddNew:
            return{
                ...state,
                commissions:[...state.commissions, action.payload]
            }
        case types.commissionsActiveUpdated:
            return{
                ...state,
                update:true,
                commissionSelected:action.payload
            }
        case types.commissionUpdate:
            return{
                ...state,
                commissions:state.commissions.map(commission=>commission.id === action.payload.id ? action.payload : commission),
                update:false,
                commissionSelected:null
            }
        case types.commissionDelete:
            return{
                ...state,
                commissions:state.commissions.filter((commission:any)=>commission.id !== action.payload)
            }
        default:
            return state
    }
}