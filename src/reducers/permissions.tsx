import { Permissions } from "../interfaces/permissions";
import { types } from "../types/types";

const initialState: Permissions = {
  permissions: [],
  update: false,
  permissionSelected: null,
};

const permissionsReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case types.permissionsLoad:
      return {
        ...state,
        permissions: action.payload,
      };

    case types.permissionsAddNew:
      return {
        ...state,
        permissions: [...state.permissions, action.payload],
      };

    case types.permissionsActiveUpdated:
      return {
        ...state,
        update: true,
        permissionSelected: action.payload,
      };

    case types.permissionsUpdate:
      return {
        ...state,
        permissions: state.permissions.map((per) => (per.id === action.payload.id ? action.payload : per)),
        update: false,
        permissionSelected: null,
      };

    case types.permissionsDelete:
      return {
        ...state,
        permissions: state.permissions.filter((per: any) => per.id !== action.payload),
      };

    default:
      return state;
  }
};

export default permissionsReducer;
