import { addData, loadData, updateData } from "../helpers/firebaseMethods";
import { Permission } from "../interfaces/permissions";
import { types } from "../types/types";
import { finishLoading, startLoading } from "./globalActions";
import { showAlert } from "../helpers/messagesNotifications";

export const startLoadPermissions = () => {
  return async (dispatch: any) => {
    try {
      const permissions = await loadData("permissions", "group");
      dispatch(loadPermissions(permissions));
    } catch (error) {
      console.log(error);
    }
  };
};

export const loadPermissions = (permission: Array<Permission>) => ({
  type: types.permissionsLoad,
  payload: permission,
});

export const startNewPermission = (data: Permission) => {
  return async (dispatch: any) => {
    dispatch(startLoading());
    try {
      const { id } = await addData("permissions", data);
      data.id = id;
      dispatch(addPermission(data));
      showAlert("Registro agregado", "El registro ha sido guardado de forma correcta", "success");
    } catch (error) {
      console.log(error);
    }
    dispatch(finishLoading());
  };
};

export const addPermission = (permission: Permission) => ({
  type: types.commissionAddNew,
  payload: permission,
});

export const activeUpdate = (permission: Permission) => ({
  type: types.permissionsActiveUpdated,
  payload: permission,
});

export const startUpdatedPermission = (data: Permission) => {
  return async (dispatch: any, getState: any) => {
    const { permissionSelected } = getState().permission;
    dispatch(startLoading());
    try {
      await updateData("permissions", permissionSelected.id, data);
      data.id = permissionSelected.id;
      dispatch(updatePermission(data));
      showAlert("Registro Actualizado", "El registro ha sido actualizado", "success");
    } catch (error) {
      console.log(error);
    }
    dispatch(finishLoading());
  };
};

export const updatePermission = (permission: Permission) => ({
  type: types.permissionsUpdate,
  payload: permission,
});
