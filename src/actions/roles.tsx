import { addData, loadData, updateData } from "../helpers/firebaseMethods";
import { showAlert } from "../helpers/messagesNotifications";
import { Role } from "../interfaces/roles";
import { types } from "../types/types";
import { finishLoading, startLoading } from "./globalActions";

export const startLoadRoles = () => {
  return async (dispatch: any) => {
    try {
      const roles = await loadData("roles", "name");
      dispatch(loadRoles(roles));
    } catch (error) {
      console.log(error);
    }
  };
};

export const loadRoles = (roles: Array<Role>) => ({
  type: types.rolesLoad,
  payload: roles,
});

export const startNewRole = (data: Role) => {
  return async (dispatch: any) => {
    dispatch(startLoading());
    try {
      //console.log({ data });
      const { id } = await addData("roles", data);
      data.id = id;

      dispatch(addRole(data));

      showAlert("Registro agregado", "El registro ha sido guardado de forma correcta", "success");
      dispatch(startLoadRoles());
    } catch (error) {
      console.log(error);
    }
    dispatch(finishLoading());
  };
};

export const addRole = (role: Role) => ({
  type: types.rolesAddNew,
  payload: role,
});

export const startUpdatedRole = (data: Role) => {
  return async (dispatch: any, getState: any) => {
    const { roleSelected } = getState().role;
    dispatch(startLoading());
    try {
      await updateData("roles", roleSelected.id, data);
      dispatch(startLoadRoles());
      showAlert(
        "Registro Actualizado",
        "El registro ha sido actualizado",

        "success"
      );
    } catch (error) {
      console.log(error);
    }
    dispatch(finishLoading());
  };
};

export const activeUpdate = (role: Role) => ({
  type: types.rolesActiveUpdated,
  payload: role,
});

export const updateRole = (role: Role) => ({
  type: types.rolesUpdate,
  payload: role,
});
