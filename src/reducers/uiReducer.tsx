import { types } from "../types/types";

interface State {
  loading: boolean;
  msgError: string | null;
}

const initialState: State = {
  loading: false,
  msgError: null,
};

export const uiReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case types.uiStartLoading:
      return {
        ...state,
        loading: true,
      };
    case types.uiFinishLoading:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
};
