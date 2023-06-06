import { InitialState } from "../interfaces/globalSettingsInterface";
import { types } from "../types/types";

const initialState: InitialState = {
  settings: [],
  update: false,
  globalSettingSelected: null,
};

export const GlobalSettingsReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case types.globalSettingsLoad:
      return {
        ...state,
        settings: action.payload,
      };
    case types.globalSettingsLoadAddNew:
      return {
        ...state,
        settings: [...state.settings, action.payload],
      };
    case types.globalSettingsLoadActiveUpdated:
      return {
        ...state,
        update: true,
        globalSettingSelected: action.payload,
      };
    case types.globalSettingsLoadUpdate:
      return {
        ...state,
        settings: state.settings.map((setting) =>
          setting.id === action.payload.id ? action.payload : setting
        ),
      };
    case types.globalSettingsLoadResetState:
      return{
        ...state,
        update:false,
        globalSettingSelected: null
      }
    case types.globalSettingsLoadDelete:
      return {
        ...state,
        settings: state.settings.filter(
          (setting) => setting.id !== action.payload
        ),
      };
    default:
      return state;
  }
};
