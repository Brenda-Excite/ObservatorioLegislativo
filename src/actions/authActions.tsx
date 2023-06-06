import { signInWithEmailAndPassword } from "@firebase/auth";
import { auth } from "../firebase/firebase-config";
import { showAlert } from "../helpers/messagesNotifications";
import { types } from "../types/types";
import { finishLoading, startLoading } from "./globalActions";

export const startLoginEmailPassword = (email: string, password: string) => {
  return (dispatch: any) => {
    dispatch(startLoading());
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        dispatch(login(user.uid, user.displayName));
        dispatch(finishLoading());
      })
      .catch((e) => {
        if (e.code === "auth/user-not-found") {
          showAlert("Usuario incorrecto", "El usuario no esta registrado en el sistema", "danger");
        }
        if (e.code === "auth/wrong-password") {
          showAlert("Contraseña incorrecta", "La contraseña es incorrecta", "danger");
        }
        dispatch(finishLoading());
      });
  };
};

export const startLogout = () => {
  return async (dispatch: any) => {
    await auth.signOut();
    dispatch(logout());
  };
};

export const login = (id: string, displayName: string | null) => ({
  type: types.login,
  payload: {
    id,
    displayName,
  },
});

export const logout = () => ({
  type: types.logout,
});
