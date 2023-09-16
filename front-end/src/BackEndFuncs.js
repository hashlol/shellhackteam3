import { onSnapshot, collection, setDoc, doc, addDoc, deleteDoc, getDocs } from "@firebase/firestore";
import { useEffect, useState } from "react";
import db from "./firebase";

export function GetDataStream() {
  const [usernames, setUsers] = useState([])
  useEffect(
    () =>
      onSnapshot(collection(db, "users"), (snapshot) =>
        setUsers(snapshot.docs.map((doc) => doc.data()))
      ),
    []
  );
  return usernames;
}

export const GetData = async () => {
  const colRef = collection(db, "users")
  const snapshot = await getDocs(colRef);
  return snapshot;
}

export const addFile = async (name) => {
  const colRef = collection(db, "users")
  const payload = { Name: name };
  await addDoc(colRef, payload)
}

export const removeFileFromName = async (nameToDel) => {
  var id = 0;
  var names = (await GetData()).docs;

  names.forEach((name) => {
    if (name.data().Name === nameToDel) {
      id = name.id
    }
  });

  if (id !== 0) {
    const docRef = doc(db, "users", id);
    await deleteDoc(docRef)
  }
}


export const setFile = async (id, name) => {
  const docRef = doc(db, "users", id);
  const payload = { Name: name };
  await setDoc(docRef, payload)
}





