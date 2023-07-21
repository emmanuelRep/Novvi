import logo from './logo.svg';
import './App.css';
import Nav from './Nav';
import Home from './Home';
import Hero from './Hero';
import Listings from './Listings';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import myProperties from './properties'
import Buy from './Buy';
import Rent from './Rent';


//check if video is supported by browser
const isVideoSupported = !!document.createElement('video').canPlayType;

function App() {
  const [myTint, setMyTint] = useState(false)

  const toggleTint = (isOpen) => {
    setMyTint(isOpen)
  }
  console.log(myTint)

  

  

  return (
    <Router>
    <div>
      <Nav
        tint = {toggleTint}
      />
      
      <Routes>
        <Route exact path="/" Component={Home}/>
        <Route path="/buy" Component={Buy}/>
        <Route path="/rent" Component={Rent}/>
      </Routes>
      
      
      
    </div>
    </Router>
  );
}

export default App;
