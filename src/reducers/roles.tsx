import { Roles } from "../interfaces/roles";
import { types } from "../types/types";

const initialState: Roles = {
  roles: [],
  update: false,
  roleSelected: null,
};

const roleReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case types.rolesLoad:
      return {
        ...state,
        roles: action.payload,
      };
    case types.rolesAddNew:
      return {
        ...state,
        roles: [...state.roles, action.payload],
      };
    case types.rolesActiveUpdated:
      return {
        ...state,
        update: true,
        roleSelected: action.payload,
      };

    case types.rolesUpdate:
      return {
        ...state,
        roles: state.roles.map((rol) => (rol.id === action.payload.id ? action.payload : rol)),
        update: false,
        roleSelected: null,
      };

    /*  case types.rolesDelete:
      return {
        ...state,
        roles: state.roles.filter((rol: any) => rol.id !== action.payload),
      }; */
    default:
      return state;
  }
};

export default roleReducer;
