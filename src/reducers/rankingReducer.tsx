import { Politician } from "../interfaces/politiciansInterface";
import {types} from '../types/types';

interface InitialState{
  politicians:Array<Politician>;
  update:boolean
}
const initialState:InitialState = {
    politicians:[],
    update:false
}

export const RankingReducer = (state=initialState , action:any) =>{
    switch (action.type) {
        case types.loadRankigPoliticians:
            return{
                ...state,
                politicians:action.payload,
                update:false
            }  
        case types.rankingUpdate:
            return{
                ...state,
                update:true
            }
        default:
            return state;
    }
}