import { addData, deleteData, loadData, updateData } from "../helpers/firebaseMethods";
import { showAlert } from "../helpers/messagesNotifications";
import { User } from "../interfaces/userInterface";
import { types } from "../types/types";
import { finishLoading, startLoading } from "./globalActions";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export const startLoadUsers = () => {
  return async (dispatch: any) => {
    try {
      const users_no_relationed = await loadData("users", "displayName");
      const roles = await loadData("roles", "name");

      const users = users_no_relationed.map((u: any, index: number) => {
        const rol = roles.find((r: any, index: number) => r.id === u.role_id);

        return {
          ...u,
          role: rol,
        };
      });
      console.log({ users });
      dispatch(loadUsers(users));
    } catch (error) {
      console.log(error);
    }
  };
};

export const loadUsers = (users: Array<User>) => ({
  type: types.usersLoad,
  payload: users,
});

export const startNewUser = (data: User) => {
  return async (dispatch: any) => {
    dispatch(startLoading());
    try {
      //*Crear un usuario para el auth
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      console.log({ userCredential });
      data.user_id = `${userCredential.user.uid}`; //* Asignamos el UID de firebase authentication en firestore

      data.password = ""; //Borramos el password paras que no se vea en BD
      console.log({ data });
      const { id } = await addData("users", data);
      data.id = id;

      dispatch(addUser(data));

      showAlert("Registro agregado", "El registro ha sido guardado de forma correcta", "success");
    } catch (error) {
      console.log(error);
    }
    dispatch(finishLoading());
  };
};

export const addUser = (users: User) => ({
  type: types.usersAddNew,
  payload: users,
});

export const startUpdatedUser = (data: User) => {
  return async (dispatch: any, getState: any) => {
    const { userSelected } = getState().user;
    dispatch(startLoading());
    try {
      await updateData("users", userSelected.id, data);
      //data.id = userSelected.id;
      dispatch(startLoadUsers());
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

export const activeUpdate = (users: User) => ({
  type: types.usersActiveUpdated,
  payload: users,
});

export const updateUser = (users: User) => ({
  type: types.usersUpdate,
  payload: users,
});

export const startDeletignUser = (id: string) => {
  return async (dispatch: any) => {
    try {
      await deleteData("users", id);
      dispatch(deleteuser(id));
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteuser = (id: string) => ({
  type: types.usersDelete,
  payload: id,
});
