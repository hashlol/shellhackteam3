import { onSnapshot, collection, setDoc, doc, addDoc, deleteDoc, getDocs, query, orderBy,serverTimestamp } from "@firebase/firestore";
import { useEffect, useState } from "react";
import OpenAI from "openai";
import db from "./firebase";

export const GetDataStream = async (name,name2,userName) => {
  const [usernames, setUsers] = useState([])
  const parentCollectionRef = collection(db, name);
  var users = (await GetData(name)).docs
  var id;
  users.forEach((user) => {
    if (user.data().Name === userName) {
      id = user.id
    } 
  });
  const parentDocumentRef = doc(parentCollectionRef, id);
  const subCollectionRef = collection(parentDocumentRef, name2);

  useEffect(
    () =>
      onSnapshot(subCollectionRef, (snapshot) =>
        setUsers(snapshot.docs.map((doc) => doc.data()))
      ),
    []
  );
  return usernames;
}
export const GetData = async (name) => {
  const colRef = collection(db, name)
  const snapshot = await getDocs(colRef);
  return snapshot;
}
export const GetDataSub = async (name,name2,userName) => {
  const parentCollectionRef = collection(db, name);
  var users = (await GetData(name)).docs
  var id;
  users.forEach((user) => {
    if (user.data().Name === userName) {
      id = user.id
    } 
  });
  const parentDocumentRef = doc(parentCollectionRef, id);
  const subCollectionRef = collection(parentDocumentRef, name2);
  const q = query(subCollectionRef, orderBy('timeStamp', 'asc'));
  const snapshot = (await getDocs(q)).docs;
  return snapshot.data();
}

export const AddDataSub = async (name,name2,userName,log)=>{
  const parentCollectionRef = collection(db, name);
  var users = (await GetData(name)).docs
  var id;
  users.forEach((user) => {
    if (user.data().Name === userName) {
      id = user.id
    } 
  });
  const parentDocumentRef = doc(parentCollectionRef, id);
  const subCollectionRef = collection(parentDocumentRef, name2);


  const payload = { 
    message: log,
    timeStamp: serverTimestamp(),
   };
  await addDoc(subCollectionRef, payload)
}

export const addFile = async (name) => {
  const colRef = collection(db, "users")
  const payload = { Name: name };
  await addDoc(colRef, payload)
  console.log("added")
}

export const removeFileFromName = async (nameToDel) => {
  var id = 0;
  var names = (await GetData("users")).docs;

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
export const getKey = async () => {
  var key = "hello";
  var names = (await GetData("api")).docs;
  key = names[0].data().code;
  return key;

}

const openai = new OpenAI({
  apiKey: await getKey(),dangerouslyAllowBrowser: true // defaults to process.env["OPENAI_API_KEY"]
});

const conversationHistory = [];

export async function sendMessage(userMessage,user) {
  conversationHistory.push({ role: 'user', content: userMessage });
  AddDataSub('users','logs',user,userMessage)

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: conversationHistory,
    });

    // Extract the assistant's reply from the response
    const assistantReply = completion.choices[0].message.content;

    // Add the assistant's reply to the conversation history
    conversationHistory.push({ role: 'assistant', content: assistantReply });
    AddDataSub('users','logs',user,assistantReply)

    return assistantReply;
  } catch (error) {
    console.error('Error sending message:', error);
    return 'An error occurred';
  }
}







