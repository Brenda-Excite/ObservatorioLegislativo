import { getDocumentById, loadData } from "./firebaseMethods";
import { collection, getDocs, query, where } from "@firebase/firestore";
import { db, auth } from "../firebase/firebase-config";

export const saveDataUserLogged = async () => {
  //setTimeout(async () => {
  let user_loged = auth.currentUser;
  //console.log({ user_loged });
  if (!user_loged) {
    //localStorage.removeItem("currentUserActive");
    return;
  }
  let user_id = user_loged.uid;
  const q = query(collection(db, "users"), where("user_id", "==", user_id));
  const querySnapshot = await getDocs(q);
  let user = null;
  querySnapshot.forEach((documento) => {
    if (user === null) {
      user = { ...documento.data(), id: documento.id };
    }
  });
  const permissions = await loadData("permissions", "group");
  const role = await getDocumentById("roles", user.role_id);
  const permisos_get = role.permissions.map((per, index) => {
    const permiso = permissions.find((p) => p.id === per);
    return permiso;
  });
  role.permissions = permisos_get;
  user.role = role;
  localStorage.setItem("currentUserActive", JSON.stringify(user));
  //}, 1000);
};

export const validateAction = (permiso) => {
  let user = localStorage.getItem("currentUserActive");
  user = user ? JSON.parse(user) : null;

  if (user) {
    if (user.role) {
      if (user.role.permissions) {
        return user.role.permissions.map((p) => p.permission).includes(permiso);
      }
    }
  }

  return false;
};
