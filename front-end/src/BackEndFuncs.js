import { onSnapshot, collection, setDoc, doc, addDoc, deleteDoc, getDocs } from "@firebase/firestore";
import { useEffect, useState } from "react";
import OpenAI from "openai";
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

const openai = new OpenAI({
  apiKey: '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',dangerouslyAllowBrowser: true // defaults to process.env["OPENAI_API_KEY"]
});

async function main(msg) {
  const completion = await openai.chat.completions.create({
    messages: [{ role: 'user', content: msg }],
    model: 'gpt-3.5-turbo',
  });

  console.log(completion.choices[0].message.content);
}

export function req(msg){
    main(msg)
}





