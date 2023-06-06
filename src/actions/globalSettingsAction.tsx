import { addData, deleteData, loadData, updateData } from "../helpers/firebaseMethods";
import { showAlert } from "../helpers/messagesNotifications";
import { GlobalSettings } from "../interfaces/globalSettingsInterface";
import { types } from "../types/types";
import { finishLoading, startLoading } from "./globalActions";

export const startLoadGlobalSettings = () => {
  return async (dispatch: any) => {
    try {
      const globalSettings = await loadData("global-settings", "plenarySessions");
      dispatch(loadGlobalSettings(globalSettings));
    } catch (error) {
      console.log(error);
    }
  };
};

export const loadGlobalSettings = (globalSettings: Array<GlobalSettings>) => ({
  type: types.globalSettingsLoad,
  payload: globalSettings,
});

//registro guardado
export const startAddNewGlobalSettings = (settings: GlobalSettings) => {
  return async (dispatch: any) => {
    dispatch(startLoading());
    try {
      const { id } = await addData("global-settings", settings);
      settings.id = id;
      dispatch(addNewGlobalSettings(settings));
      showAlert("Registro guardado", "El registro ha sido guardado de forma correcta", "success");
    } catch (error) {
      console.log(error);
    }
    dispatch(finishLoading());
  };
};

export const addNewGlobalSettings = (setting: GlobalSettings) => ({
  type: types.globalSettingsLoadAddNew,
  payload: setting,
});

export const startUploadGlobalSettings = (setting: GlobalSettings) => {
  return async (dispatch: any, getState: any) => {
    const {
      globalSettingSelected: { id },
    } = getState().global_settings;
    dispatch(startLoading());
    try {
      await updateData("global-settings", id, setting);
      setting.id = id;
      dispatch(updateGlobalSetting(setting));
      showAlert("Registro actualizado", "El registro ha sido actualizado de forma correcta", "success");
    } catch (error) {}
    dispatch(finishLoading());
  };
};

export const updateGlobalSetting = (setting: GlobalSettings) => ({
  type: types.globalSettingsLoadUpdate,
  payload: setting,
});

//Editar
export const activeUpdatedSetting = (setting: GlobalSettings) => ({
  type: types.globalSettingsLoadActiveUpdated,
  payload: setting,
});

//Eliminar
export const startDeleteGlobalSetting = (id: string) => {
  return async (dispatch: any) => {
    try {
      await deleteData("global-settings", id);
      dispatch(deleteGlobalSetting(id));
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteGlobalSetting = (id: string) => ({
  type: types.globalSettingsLoadDelete,
  payload: id,
});

export const resetStateGlobalSetting = () => ({
  type: types.globalSettingsLoadResetState,
});
