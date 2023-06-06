import { addData, deleteData, loadData, updateData } from "../helpers/firebaseMethods";
import { showAlert } from "../helpers/messagesNotifications";
import { Commission } from "../interfaces/commissionsInterfaces";
import { types } from "../types/types";
import { finishLoading, startLoading } from "./globalActions";

export const startLoadCommissions = () => {
  return async (dispatch: any) => {
    try {
      const commissions = await loadData("commissions", "name");
      dispatch(loadCommissions(commissions));
    } catch (error) {
      console.log(error);
    }
  };
};

export const loadCommissions = (commisions: Array<Commission>) => ({
  type: types.commissionsLoad,
  payload: commisions,
});

export const startNewCommission = (data: Commission) => {
  return async (dispatch: any) => {
    dispatch(startLoading());
    try {
      const { id } = await addData("commissions", data);
      data.id = id;
      dispatch(addCommission(data));
      showAlert("Registro agregado", "El registro ha sido guardado de forma correcta", "success");
    } catch (error) {
      console.log(error);
    }
    dispatch(finishLoading());
  };
};

export const addCommission = (commission: Commission) => ({
  type: types.commissionAddNew,
  payload: commission,
});

export const startUpdatedCommission = (data: Commission) => {
  return async (dispatch: any, getState: any) => {
    const { commissionSelected } = getState().commission;
    dispatch(startLoading());
    try {
      await updateData("commissions", commissionSelected.id, data);
      data.id = commissionSelected.id;
      dispatch(updateCommission(data));
      showAlert("Registro Actualizado", "El registro ha sido actualizado de forma correcta", "success");
    } catch (error) {
      console.log(error);
    }
    dispatch(finishLoading());
  };
};

export const activeUpdate = (commission: Commission) => ({
  type: types.commissionsActiveUpdated,
  payload: commission,
});

export const updateCommission = (commission: Commission) => ({
  type: types.commissionUpdate,
  payload: commission,
});

export const startDeletingCommission = (id: string) => {
  return async (dispatch: any) => {
    try {
      await deleteData("commissions", id);
      dispatch(deleteCommission(id));
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteCommission = (id: string) => ({
  type: types.commissionDelete,
  payload: id,
});

export const startAddNewComissionExcel = (comission: any) => {
  return async (dispatch: any) => {
    dispatch(startLoading());
    try {
      const { id } = await addData("comission", comission);
      comission.id = id;
      dispatch(comission(comission));
    } catch (error) {
      console.log(error);
      showAlert("Error al guardar", "El registro no se ha guardado de forma correcta , contacta al administrador", "success");
    }
    dispatch(finishLoading());
  };
};
