import { Districts } from "../interfaces/districtsInterfaces";
import { types } from "../types/types";

const initialState:Districts = {
  districts:[],
  update:false,
  districtSelected:null,
  sections:[]
}

export const districtReducer = (state=initialState , action:any) =>{
   switch (action.type) {
       case types.districtsLoad:
           return{
               ...state,
               districts: action.payload
           }
        case types.districtAddNew:
            return{
                ...state,
                districts:[...state.districts , action.payload]
            }
        case types.districtShowSections:
            return{
                ...state,
                sections:action.payload
            }
        case types.districtUpdate:
            return{
                ...state,
                districts:state.districts.map(district=>district.id === action.payload.id ? action.payload : district),
                update:false,
                districtSelected:null
            }
        case types.districtActiveUpdated:
            return{
                ...state,
                update:true,
                districtSelected:action.payload
            }
        case types.districtResetState:
            return{
                ...state,
                update:false,
                districtSelected: null,
                sections:[]
            }
        case types.districtDelete:
            return{
                ...state,
                districts: state.districts.filter(district=>district.id !== action.payload)
            }
       default:
           return state;
   }
}