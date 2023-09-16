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
        <span className="List-header">
            <p><strong> List of strings added</strong></p>
        </span>
        <p> <strong>Data adder</strong> </p>
        <input type="text" onChange={getValName} />
        <ul class="names ">
          {names.map(name => (
            <li className = 'input'>
              {name.Name}
            </li>
          ))}
        </ul>
    <div>

        <HomeButton buttonText={"Add To Database"} />
        <DeleteButton buttonText={"Remove from Database"} />
        
        </div>
    </div>
  );
}

