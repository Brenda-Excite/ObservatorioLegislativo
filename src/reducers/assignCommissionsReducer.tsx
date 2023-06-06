import { AssignCommissions } from "../interfaces/assignCommissions";
import { types } from "../types/types";

const initialState: AssignCommissions = {
  assignCommissions: [],
  update: false,
  assignCommissionSelected: null,
};

export const assingnCommissionReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case types.assignCommissionLoad:
      return {
        ...state,
        assignCommissions: action.payload,
      };
    case types.assignCommissionAddNew:
      return {
        ...state,
        assignCommissions: [...state.assignCommissions, action.payload],
      };
    case types.assignCommissionActiveUpdated:
      return {
        ...state,
        update: true,
        assignCommissionSelected: action.payload,
      };

    case types.assignCommissionUpdate:
      return {
        ...state,
        assignCommissions: state.assignCommissions.map((assignCommission) => (assignCommission.id === action.payload.id ? action.payload : assignCommission)),
        update: false,
        assignCommissionSelected: null,
      };

    case types.assignCommissionDelete:
      return {
        ...state,
        assignCommissions: state.assignCommissions.filter((assignCommission: any) => assignCommission.id !== action.payload),
      };
    default:
      return state;
  }
};
