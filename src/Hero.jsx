import React, { useState } from 'react'

import {styles} from './styles.css'
import resident from './assets/resident.png'
import commercial from './assets/commercial.png'
import offplan from './assets/offplan.png'
import search from './assets/search.png'
import chat from './assets/chat.png'
import heroBG from './assets/hero-background.jpg'
import commerce from './assets/commerce.jpg'
import dubai from './assets/dubai.jpg'
import construction from './assets/construction.jpg'
import const4 from './assets/const4.jpg' 

import { Box, Button, IconButton, MenuItem, Select, TextField } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {Link} from 'react-router-dom'


const Hero = (props) => {
    //User choice state management
    const [myChoice, setMyChoice] = useState('resident');

    //background image state management
    const [backImage, setBackImage] = useState(heroBG);

    //button color state management
    console.log(myChoice)

    //Catchy statemenent state management
    const [myLine, setMyLine] = useState('Your new home awaits');

    //State management for the search bar
    const [mySearch, setMySearch] = useState('')

    //user select state
    const [selectedOption, setSelectedOption] = useState('');

    const handleOptionChange = (event, index, value) => {
        setSelectedOption(event.target.value);
    };


    //tint screen to place focus on mobile menu
    const overlayStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 9998,
      };

    function handleChoice(name){
        //set background color of button to white
        
        setMyChoice(name)

        //set background image to reflect choice
        setBackImage((prevImg) => {
           if(name === 'resident'){
                return heroBG
           }else if(name === 'commerce'){
                return dubai
           }else if(name === 'offPlan'){
                return const4
           }  
           return prevImg
        })

        //set the text info on change
        setMyLine(prevLine => {
            if(name === 'resident'){
                return 'Your new home awaits'
           }else if(name === 'commerce'){
                return 'Real Estate Excellence with Novvi'
           }else if(name === 'offPlan'){
                return 'Off-Plan Developments Done Right with Novvi'
           }  
           return prevLine
        })
        
    }
    

    //handling search
    function handleSearch(event){
        const {name, type, value, checked} = event.target
        setMySearch(prevSearch => {
            return{
                ...prevSearch,
                [name]: type === "checkbox" ? checked : value
            }
        })
    }

    console.log(mySearch)

    
  return (
    <div>
        <div className='hero' style={{'--backgroundImage': `url(${backImage})`}}>
            
            <div className='hero-container'>
            <div className='title'><h1>{myLine}</h1></div>
                <form>
                    <div className='btn-row'>
                        <button className='btn-choice' onClick={(event) => {event.preventDefault(); handleChoice('resident')}} style={myChoice === 'resident' ? {backgroundColor: '#ffffff'} : {}}>Residential <img src={resident} alt="Resident" className='btn-logo'/></button>
                        <button className='btn-choice' onClick={(event) => {event.preventDefault(); handleChoice('commerce')}} style={myChoice === 'commerce' ? {backgroundColor: '#ffffff'} : {}}>Commercial <img src={commercial} alt="Commercial" className='btn-logo'/></button>
                        <button className='btn-choice' onClick={(event) => {event.preventDefault(); handleChoice('offPlan')}}  style={myChoice === 'offPlan' ? {backgroundColor: '#ffffff'} : {}}>Off-Plan <img src={offplan} alt="Off-plan" className='btn-logo'/></button>
                    </div>

                        
                        <div className="form-container">
                                    <div className="form-option">
                                        <label htmlFor ="dropdown"></label>
                                        <select id="dropdown">
                                        <option value="option1">Buy</option>
                                        <option value="option2">Rent</option>
                                        </select>
                                        
                                    </div>
                                    <ExpandMoreIcon/>
                                    <div className="form-area">
                                        <label htmlFor="textarea"></label>
                                        <textarea id="textarea" rows="1" placeholder="Enter Location" onChange={handleSearch}></textarea>
                                    </div>
                                    <button type="submit" className='search'><img src={search} alt="search" className='btn-logo'/></button>
                        </div>

                       
                </form>

                

            
            </div>
           <div className='chat-icon'><img src={chat} alt="chat" /></div>
        </div>
    </div>
  )
}

export default Hero
