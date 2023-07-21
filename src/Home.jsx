import React from 'react'
import Hero from './Hero'
import Listings from './Listings'


//check if video is supported by browser
const isVideoSupported = !!document.createElement('video').canPlayType;

const Home = () => {
  return (
    <div>
      <Hero
        video={isVideoSupported}
      />
      <Listings/>
    </div>
  )
}

export default Home
