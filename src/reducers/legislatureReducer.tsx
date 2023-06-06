import { types } from "../types/types";

interface Legislatures{
   legislatures:Array<Legislature>;
   update:boolean;
   legislatureSelected:Object|null;
}
interface Legislature{
  id:string;
  name:string;
}
const initialState:Legislatures = {
    legislatures:[],
    update:false,
    legislatureSelected:null
}

export const legislatureReducer = (state = initialState , action:any) =>{
   
    switch (action.type) {
        case types.legislatureAddNew:
            return {
                ...state,
                legislatures:[...state.legislatures,action.payload]
            }
        case types.legislaturesLoad:
            return{
                ...state,
                legislatures:[...action.payload]
            }
        case types.legislaturesActiveUpdated:
            return{
                ...state,
                update:true,
                legislatureSelected:action.payload
            }
        case types.legislatureUpdate:
            return{
                ...state,
                legislatures:state.legislatures.map(legislature=>legislature.id === action.payload.id ? action.payload : legislature),
                update:false,
                legislatureSelected:null
            }
        case types.legislatureDelete:
            return{
                ...state,
                legislatures:state.legislatures.filter(legislature=>legislature.id !== action.payload)
            }
        default:
            return state;
    }

}