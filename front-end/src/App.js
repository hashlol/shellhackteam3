import './App.css';
import { HashRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Data from './pages/Data'
import Page2 from './pages/Page2'
import {NavBar} from './navBar'

function App() {

  return (  
    <div>
    <HashRouter hashType="slash">
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/data" element={<Data />} />
        <Route path="/page2" element={<Page2 />} />
      </Routes>
    </HashRouter>
  </div>
  );

}


export default App;