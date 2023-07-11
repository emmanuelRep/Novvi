import logo from './logo.svg';
import './App.css';
import Nav from './Nav';
import Hero from './Hero';
import Listings from './Listings';
import { useState } from 'react';

//check if video is supported by browser
const isVideoSupported = !!document.createElement('video').canPlayType;

function App() {
  const [myTint, setMyTint] = useState(false)

  const toggleTint = (isOpen) => {
    setMyTint(isOpen)
  }
  console.log(myTint)
  return (
    <div>
      <Nav
        tint = {toggleTint}
      />
      <Hero
        video = {isVideoSupported}
      />
      <Listings/>
    </div>
  );
}

export default App;
