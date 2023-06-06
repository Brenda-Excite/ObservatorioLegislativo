import { InitialState } from "../interfaces/politiciansInterface";
import { types } from "../types/types";

const initialState: InitialState = {
  politicians: [],
  update: false,
  politicianSelected: null,
  politician:null
};

const PoliticiansReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case types.politiciansLoad:
      return {
        ...state,
        politicians: action.payload,
        politicianSelected: null
      };
    case types.politicianAddNew:
      return {
        ...state,
        politicians: [...state.politicians, action.payload],
      };
    case types.politicianActiveUpdated:
      return {
        ...state,
        update: true,
        politicianSelected: action.payload,
      };
    case types.politicianUpdate:
      return {
        ...state,
        politicians: state.politicians.map((politician) =>
          politician.id === action.payload.id ? action.payload : politician
        ),
        update: false,
        politicianSelected: null,
      };
    case types.politicianShow:
      return{
        ...state,
        politician: action.payload,

      }
    case types.politicianDelete:
      return {
        ...state,
        politicians: state.politicians.filter(
          (politician) => politician.id !== action.payload
        ),
      };
    case types.politicianResetState:
      return{
        ...state,
        update: false,
        politicianSelected: null,
      }
    default:
      return state;
  }
};

export default PoliticiansReducer;
