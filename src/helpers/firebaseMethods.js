import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, orderBy, query, updateDoc } from "@firebase/firestore";
import { db, firebase } from "../firebase/firebase-config";
import "firebase/compat/storage";

export const loadData = async (path, order) => {
  const dataRef = collection(db, path);

  // const dataRef = await getDocs(collection(db, path ,orderBy("total", "asc")));
  const q = query(dataRef, orderBy(order, "asc"));
  const d = await getDocs(q);
  const data = [];
  d.forEach((d) => {
    data.push({
      id: d.id,
      ...d.data(),
    });
  });

  return data;
};

export const getDocumentById = async (path, id) => {
  const docRef = doc(db, path, id);
  const docSnap = await getDoc(docRef);
  const data = docSnap.data();
  if (data) {
    return { ...data, id };
  }
  return null;
};

export const loadDataSelects = async (path) => {
  const dataRef = await getDocs(collection(db, path));
  const data = [];
  dataRef.forEach((d) => {
    data.push({
      id: d.id,
      ...d.data(),
    });
  });

  return data;
};

export const addData = async (path, data) => {
  const resData = await addDoc(collection(db, `${path}`), data);
  return resData;
};

export const updateData = async (path, id, data) => {
  const dataRef = doc(db, `${path}/${id}`);
  await updateDoc(dataRef, data);
};
export const deleteData = async (path, id) => {
  await deleteDoc(doc(db, `${path}/${id}`));
};

export const uploadFileStorage = async (file, path) => {
  const storageRef = firebase.storage().ref();
  const metadata = {
    contentType: `${file[0].type}`,
  };
  //const path = la ubicacion de la imagen(nombre de la carpeta);
  const uploadFile = await storageRef
    .child(`${path}/` + file[0].name)
    .put(file[0], metadata)
    .then(function (snaptshot) {
      if (snaptshot.state === "success") {
        return snaptshot.ref.fullPath;
      }
    })
    .catch((error) => {
      console.log(error);
    });

  return uploadFile;
};

export const getFileUploadStorage = async (path) => {
  const storageRef = firebase.storage().ref();
  const startsRef = await storageRef.child(path);

  const url = await startsRef
    .getDownloadURL()
    .then((url) => {
      return url;
    })
    .catch((error) => {
      switch (error.code) {
        case "storage/object-not-found":
          console.log("File doesnt exist");
          break;
        case "storage/unauthorized":
          console.log("User doesnt have permission to access the object");
          break;
        case "storage/canceled":
          console.log("User canceled the upload");
          break;
        case "storage/unknown":
          console.log("Unknown error occurred, inspect the server response");
          break;

        default:
          break;
      }
    });

  return url;
};
