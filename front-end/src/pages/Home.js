import React, { useState } from 'react';
import Overlay from './../signin.js'


function App() {
  const [isOverlayVisible, setIsOverlayVisible] = useState(true);

  const showOverlay = () => {
    setIsOverlayVisible(true);
  };

  const hideOverlay = () => {
    setIsOverlayVisible(false);
  };

  return (
    <div>
    <header>
      <img src = './image.png' alt = 'image'/> 
    </header>
    
    <body className='test'>
    <div>
 
    <div className="logbox">
      <div className="element-container">
      <ul className= 'element'>
          <p> monkey</p>
        </ul>
        <ul className= 'element'>
          <p> monkey</p>
        </ul><ul className= 'element'>
          <p> monkey</p>
        </ul><ul className= 'element'>
          <p> monkey</p>
        </ul><ul className= 'element'>
          <p> monkey</p>
        </ul><ul className= 'element'>
          <p> monkey</p>
        </ul><ul className= 'element'>
          <p> monkey</p>
        </ul><ul className= 'element'>
          <p> monkey</p>
        </ul><ul className= 'element'>
          <p> monkey</p>
        </ul>
        
        <Overlay isVisible={isOverlayVisible} />
      <div className="logbox">
        <div className="element-container">

        

        </div>
        <button className = 'speakBut'> Speak </button>
      </div>
      
      
      
      
    
    
    </div></div>
    <div className="content">

        <button onClick={hideOverlay}>Button 1</button>
        <p>This is some content.</p>
      </div>
      
    </body>
  );
}




export default App;
