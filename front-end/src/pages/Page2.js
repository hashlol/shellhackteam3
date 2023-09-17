import React, { useState , useEffect} from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { sendMessage, GetDataSub, AddDataSub } from "./../BackEndFuncs"
var start = false;
// async function getAns(x){
//   var answer = await sendMessage(x)
//   document.getElementById("answer").innerHTML = answer;
//   setText(answer)
// }
const App = () => {

  
  async function getAns(x) {
    start = true;
    var answer = await sendMessage(x)
    document.getElementById("answer").innerHTML = answer;
    handleSpeak(answer);
  }

  const [synthesis, setSynthesis] = useState(null);
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();




  const handleSpeak = (text) => {
    if ('speechSynthesis' in window) {
      const synthesis = window.speechSynthesis;
      const utterance = new SpeechSynthesisUtterance(text);
      if(!start){
        synthesis.cancel(); 
        return;
      }
      synthesis.cancel(); // Cancel any previous speech
      synthesis.speak(utterance);

      utterance.onend = () => {
        console.log('TTS finished');
        if(start){
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
    if(start){
      getAns(transcript)  
    }

    // Add your custom code here
  };

  function startConvo(){
    start = true;
    SpeechRecognition.startListening()
  }
  function stopConvo(){
    start = false;
    SpeechRecognition.stopListening()
    handleSpeak("sdsd")
  }


  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div>
      <p>Microphone: {listening ? 'on' : 'off'}</p>
      <button onClick={startConvo}>Start</button>
      <button onClick={stopConvo}>Stop</button>
      <button onClick={resetTranscript}>Reset</button>
      <button onClick={() =>GetDataSub('users','logs','salman')}>get logs</button>
      <p>{transcript}</p>
      <p id="answer"></p>
    </div>
  );
};
export default App;
