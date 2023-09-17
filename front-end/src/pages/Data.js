import React from 'react';
import { GetDataStream, setFile, addFile, removeFileFromName, GetData, getKey } from '../BackEndFuncs';
import { Link } from "react-router-dom";

var name;
function getValName(val) {
  name = val.target.value;
}

function HomeButton({ buttonText }) {
  return (
    <button className="button-link" onClick={() => addFile(name)}>{buttonText}</button>
  );
}
function DeleteButton({ buttonText }) {
  return (
    <button className="button-link" onClick={() => removeFileFromName(name)}>{buttonText}</button>
  );
}


export default function () {
  const names = GetDataStream();

  return (
    <div className = 'List-container'>
        <p> <strong>Input username</strong> </p>
        <input type="text" onChange={getValName} />
        <ul class="names ">
          {names.map(name => (
            <li className = 'input'>
              {name.Name}
            </li>
          ))}
        </ul>
    <div>


        <HomeButton buttonText={"Create username"} />
        <DeleteButton buttonText={"Login with username"} />
        
        </div>
    </div>
  );
}

