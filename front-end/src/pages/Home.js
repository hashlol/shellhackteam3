import React, { useState } from 'react';
import { GetData, addFile } from './../BackEndFuncs.js';
import Overlay from './../signin.js';
import image from './../image.png';
function App() {
  const [isOverlayVisible, setIsOverlayVisible] = useState(true);
  const [login, setLogin] = useState(false); // Use state to track login status
  const [nameofuser, setNameofuser] = useState(''); // Use state to store user's name

  const showOverlay = () => {
    setIsOverlayVisible(true);
  };

  const hideOverlay = () => {
    setIsOverlayVisible(false);
  };

  const getUserName = (event) => {
    setNameofuser(event.target.value);
  };

  async function signin() {
    var created = false;
    var users = (await GetData('users')).docs;
    users.forEach((user) => {
      if (user.data().Name === nameofuser) {
        created = true;
      }
    });
    console.log(created);
    if (created) {
      setLogin(true); // Update login state to true
    } else {
      alert("This is not an account. Please create an account")
    }
  }

  async function createuser() {
    var created = false;
    var users = (await GetData('users')).docs;
    users.forEach((user) => {
      if (user.data().Name === nameofuser) {
        created = true;
      }
    });
    console.log(created);
    if (created) {
      alert("This Username is already taken. Please choose a different one")
    } else {
      addFile(nameofuser)
      setLogin(true)
    }
  }

  if (!login) {
    return (
      <div>
      <nav className='nav1' style={{ position: 'relative' }}>
      <img src={image} alt="Image" className="myImage" />
      </nav>

      <div className='login'>
        
        <p className='pText'> <strong> Please sign in or create a user 😊</strong></p>
        <input onChange={getUserName} id='logintext' className='logintext'></input>
        <button onClick={signin} className='signinbut'>Sign in</button>
        <button onClick={createuser} className='createbut'>Create User</button>
      </div></div>
    );
  } else {
    return (
      <div>
            <nav className='nav' style={{ position: 'relative' }}>
  <       img src={image} alt="Image" style={{ position: 'absolute', top: '0rem', left: '0.9rem', width: '6rem', height: '5rem' }} />
        </nav>


    
        <body>
          <div className='test'>
            <div className='logbox'>
              <div className='input'>
                <li className= 'text-bubble-AI'>test</li>
                <p className= 'text-bubble-user'>test</p>
                <p className= 'text-bubble-AI'>test</p>
                <p className= 'text-bubble-user'>test</p>
                <p className= 'text-bubble-AI'>test</p>
                <p className= 'text-bubble-user'>test</p>
                <p className= 'text-bubble-AI'>test</p>
                <p className= 'text-bubble-user'>test</p>
                <p className= 'text-bubble-AI'>test</p>
                <p className= 'text-bubble-user'>test</p>
                <p className= 'text-bubble-AI'>test</p>
                <p className= 'text-bubble-user'>test</p>
                <p className= 'text-bubble-AI'>test</p>
                <p className= 'text-bubble-user'>test</p>
                <p className= 'text-bubble-AI'>test</p>
                <p className= 'text-bubble-user'>test</p>
              </div>
              <button className='speakBut'>Speak</button>
            </div>
          </div>
        </body>
      </div>
    );
  }
}

export default App;
