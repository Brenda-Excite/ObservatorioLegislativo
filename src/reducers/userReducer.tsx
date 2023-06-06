import { Users } from "../interfaces/userInterface";
import { types } from "../types/types";

const initialState: Users = {
  users: [],
  update: false,
  userSelected: null,
};

export const userReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case types.usersLoad:
      return {
        ...state,
        users: action.payload,
      };
    case types.usersAddNew:
      return {
        ...state,
        users: [...state.users, action.payload],
      };
    case types.usersActiveUpdated:
      return {
        ...state,
        update: true,
        userSelected: action.payload,
      };

    case types.usersUpdate:
      return {
        ...state,
        users: state.users.map((user) => (user.id === action.payload.id ? action.payload : user)),
        update: false,
        userSelected: null,
      };

    case types.usersDelete:
      return {
        ...state,
        users: state.users.filter((user: any) => user.id !== action.payload),
      };
    default:
      return state;
  }
};
