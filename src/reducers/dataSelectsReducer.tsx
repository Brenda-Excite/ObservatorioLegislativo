import { types } from "../types/types";

const initialState = {
  politicalParties: [],
  districts: [],
  legislatures: [],
  commissions: [],
  politicians: [],
};

export const dataSelectsReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case types.dataSelectPoliticalParties:
      return {
        ...state,
        politicalParties: action.payload,
      };
    case types.dataSelectDistricts:
      return {
        ...state,
        districts: action.payload,
      };
    case types.dataSelectLegislatures:
      return {
        ...state,
        legislatures: action.payload,
      };
    case types.dataSelectCommissions:
      return {
        ...state,
        commissions: action.payload,
      };
    case types.dataSelectPolitician:
      return {
        ...state,
        politicians: action.payload,
      };
    default:
      return state;
  }
};
