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

export const GetData = async (name) => {
  const colRef = collection(db, name)
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

export async function sendMessage(userMessage) {
  conversationHistory.push({ role: 'user', content: userMessage });

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: conversationHistory,
    });

    // Extract the assistant's reply from the response
    const assistantReply = completion.choices[0].message.content;

    // Add the assistant's reply to the conversation history
    conversationHistory.push({ role: 'assistant', content: assistantReply });

    return assistantReply;
  } catch (error) {
    console.error('Error sending message:', error);
    return 'An error occurred';
  }
}







