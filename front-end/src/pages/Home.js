import React, { useState, useEffect, useRef} from 'react';
import { GetData, addFile, UseSubcollectionLiveData, GetDataSub } from './../BackEndFuncs.js';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { sendMessage } from "./../BackEndFuncs"
import image from './../image.png';
var start = false;


const App = () => {
  const [messages, setArray] = useState([])

  
  console.log(id)
  var logs;
  var id;
  // const [isOverlayVisible, setIsOverlayVisible] = useState(true);
  // const [login, setLogin] = useState(false); // Use state to track login status
  // const [nameofuser, setNameofuser] = useState(''); // Use state to store user's name
  // const getUserName =async (event) => {
  //   setNameofuser(event.target.value);
  //   // var ppl = await GetData('users').docs
  //   // ppl.forEach((user) => {
  //   //   if (user.data().Name === nameofuser) {
  //   //     id = user.id
  //   //   } 
  //   // });


  // };



  // async function signin() {
  //   var created = false;
  //   var users = (await GetData('users')).docs;
  //   users.forEach((user) => {
  //     if (user.data().Name === nameofuser) {
  //       created = true;
  //       id = user.id;
  //     }
  //   });
  //   console.log(created);
  //   if (created) {
  //     setLogin(true); // Update login state to true
  //   } else {
  //     alert("This is not an account. Please create an account")
  //   }
  // }


  // async function createuser() {
  //   var created = false;
  //   var users = (await GetData('users')).docs;
  //   users.forEach((user) => {
  //     if (user.data().Name === nameofuser) {
  //       created = true;
  //     }
  //   });
  //   console.log(created);
  //   if (created) {
  //     alert("This Username is already taken. Please choose a differnt one")
  //   } else {
  //     addFile(nameofuser)
  //     setLogin(true)
  //   }
  // }
  async function getAns(x) {
    start = true;
    var answer = await sendMessage(x)
    setArray(previous => [...previous, answer])
    handleSpeak(answer);
  }

  const [synthesis, setSynthesis] = useState(null);
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition({
    continuous: true,
  });




  const handleSpeak = (text) => {
    if ('speechSynthesis' in window) {
      const synthesis = window.speechSynthesis;
      const utterance = new SpeechSynthesisUtterance(text);
      if (!start) {
        synthesis.cancel();
        synthesis.speak(new SpeechSynthesisUtterance("STOP"))
        return;
      }
      synthesis.cancel(); // Cancel any previous speech
      synthesis.speak(utterance);

      utterance.onend = () => {
        console.log('TTS finished');
        if (start) {
          SpeechRecognition.startListening();
        }



      };

      setSynthesis(synthesis);
    } else {
      console.log('SpeechSynthesis not supported in this browser');
    }
  };
  useEffect(() => {
    if (!listening) {
      // Speech recognition has stopped listening
      handleListeningEnd();
    }
  }, [listening]);

  const handleListeningEnd = () => {
    // This function will be called when listening ends
    console.log('Listening ended');
    if (start) {
      setArray(previous => [...previous, transcript])
      getAns(transcript)
    }

    // Add your custom code here
  };

  function startConvo() {
    if(start){
      start = false;
      handleSpeak("sdsd")
    }else{
      const synthesis = window.speechSynthesis;
      synthesis.speak(new SpeechSynthesisUtterance("START"))
      start = true;
      SpeechRecognition.startListening()
    }
    
  }
  console.log(GetDataSub('users','logs','salman'))
  function resetArray(){
    setArray([])
    const synthesis = window.speechSynthesis;
      synthesis.speak(new SpeechSynthesisUtterance("TRANSCRIPT CLEARED"))
  }

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }
  if (false) {
    return (
      <></>
    );
  } else {
    return (
      <div>
        <nav className='nav' style={{ position: 'relative' }}>
         <img src={image} alt="Image" style={{ position: 'absolute', top: '0rem', left: '0rem', width: '6rem', height: '5rem' }} />
                <button className='speakBut' onClick={startConvo}>Speak | Stop</button>
                <h1 className = 'speak'> <strong>VAI-BOT </strong></h1>
                <h1 className = 'speakIndent'> <i>Information for all</i> </h1>

                <button className='resetBut' onClick={resetArray}>Reset transcript</button>
        </nav>



        <body>
          <div className='test'>
            <div className='logbox'>
              <div className='input'>
                <ul className="chat-list">

                  {messages.map((message, index) => (
                    <li key={index} className={index % 2 === 0 ? 'text-bubble-AI' : 'text-bubble-user'}>
                      {message}
                    </li>
                  ))}
                </ul>
                
              </div>
            </div>
          </div>
        </body>
      </div>
    );
  }
}

export default App;
