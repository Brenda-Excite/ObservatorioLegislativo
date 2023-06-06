import { addData, deleteData, loadData, updateData } from "../helpers/firebaseMethods";
import { showAlert } from "../helpers/messagesNotifications";
import { AssignCommission } from "../interfaces/assignCommissions";
import { types } from "../types/types";
import { finishLoading, startLoading } from "./globalActions";

export const startLoadAssignCommissions = () => {
  return async (dispatch: any) => {
    try {
      const assignCommissions = await loadData("assign-commissions", "name");
      dispatch(loadAssignCommission(assignCommissions));
    } catch (error) {
      console.log(error);
    }
  };
};

export const loadAssignCommission = (assignCommissions: Array<AssignCommission>) => ({
  type: types.assignCommissionLoad,
  payload: assignCommissions,
});

export const startNewAssignCommission = (data: AssignCommission) => {
  return async (dispatch: any) => {
    dispatch(startLoading());
    try {
      const { id } = await addData("assign-commissions", data);
      data.id = id;
      dispatch(addAssignCommission(data));
      showAlert("Registro agregado", "El registro ha sido guardado de forma correcta", "success");
    } catch (error) {
      console.log(error);
    }
    dispatch(finishLoading());
  };
};
export const addAssignCommission = (assignCommissions: AssignCommission) => ({
  type: types.assignCommissionAddNew,
  payload: assignCommissions,
});

export const startUpdatedAssignCommission = (data: AssignCommission) => {
  return async (dispatch: any, getState: any) => {
    const { assignCommissionSelected } = getState().assignCommission;
    dispatch(startLoading());
    try {
      await updateData("assign-commissions", assignCommissionSelected.id, data);
      data.id = assignCommissionSelected.id;
      dispatch(updateAssignCommission(data));
      showAlert(
        "registro Actualizado",
        "El registro ha sido actualizado",

        "success"
      );
    } catch (error) {
      console.log(error);
    }
    dispatch(finishLoading());
  };
};

export const activeUpdate = (assignCommissions: AssignCommission) => ({
  type: types.assignCommissionActiveUpdated,
  payload: assignCommissions,
});

export const updateAssignCommission = (assignCommissions: AssignCommission) => ({
  type: types.assignCommissionUpdate,
  payload: assignCommissions,
});
export const startDeletignAssingCommission = (id: string) => {
  return async (dispatch: any) => {
    try {
      await deleteData("assign-commissions", id);
      dispatch(deleteAssignCommision(id));
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteAssignCommision = (id: string) => ({
  type: types.assignCommissionDelete,
  payload: id,
});

export const startAddNewAsingComissionExcel = (assignCommission: any) => {
  return async (dispatch: any) => {
    dispatch(startLoading());
    try {
      const { id } = await addData("comission", assignCommission);
      assignCommission.id = id;
      dispatch(assignCommission(assignCommission));
    } catch (error) {
      console.log(error);
      showAlert("Error al guardar", "El registro no se ha guardado de forma correcta , contacta al administrador", "success");
    }
    dispatch(finishLoading());
  };
};
