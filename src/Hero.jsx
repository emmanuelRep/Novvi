import React, { useRef, useState, } from 'react'
import ReactDOM  from 'react'

import { createPortal } from 'react-dom'
import { useEffect } from 'react'

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

import CommercialVid from './assets/CommercialDubaiVid.mp4'
import offPlanVid from './assets/offPlanVid.mp4'
import ResidentialVid from './assets/ResidentialVid.mp4'
import videoBG from './assets/videoBG.mp4'


import { Box, Button, IconButton, List, ListItem, ListItemText, MenuItem, Select, TextField, Typography, useMediaQuery } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {Link, useNavigate} from 'react-router-dom'

//setting up places autocomplete for the search bar
import {GoogleMap, useLoadScript, Marker, MarkerF} from '@react-google-maps/api'
import PlacesAutocomplete from 'react-places-autocomplete';
import {
    geocodeByAddress,
    getLatLng,
  } from 'react-places-autocomplete';
import { createPopper } from '@popperjs/core';

import { useAppContext } from './AppContext'

//update autocomplete suggestion display tothe user
import Paper from '@mui/material/Paper'
import { ClickAwayListener } from '@mui/material'

//Pre load google maps api before page render
//libraries array
const libraries = ["places"]

//maps loader
const GoogleMapsLoader = ({ apiKey, children }) => {
    const { isLoaded } = useLoadScript({
      googleMapsApiKey: apiKey,
      libraries,
    });
  
    if (!isLoaded) {
      return <div>Loading Google Maps...</div>;
    }
  
    return children;
  };

//for the popper
const popperContainer = document.getElementById('popper-container')

const Hero = ({video}) => {
    //User choice state management
    const [myChoice, setMyChoice] = useState('resident');

    //background image state management
    const [backImage, setBackImage] = useState(heroBG);

    //button color state management
    //console.log(myChoice)

    //Catchy statemenent state management
    const [myLine, setMyLine] = useState('Your new home awaits');

    //State management for the search bar
    const [userSearch, setUserSearch] = useState({
        option: 'buy', locationSearch: '',
        latitude: '', longitude: '',
        category: '',
    })
    //console.log(userSearch)


    const [mySearch, setMySearch] = useState('')
    //console.log(mySearch)

    //user select state
    const [selectedOption, setSelectedOption] = useState('');

    const handleOptionChange = (event, index, value) => {
        setSelectedOption(event.target.value);
    };


    //handle button animations
        const [animateButtons, setAnimateButtons] = useState(false);
      
        useEffect(() => {
            const timer = setTimeout(() => {
              setAnimateButtons(true);
            }, 500); // Delay in milliseconds before enabling animation
        
            return () => {
              clearTimeout(timer);
            };
          }, []);

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

        //update choice category
        setUserSearch((prev)=> {
            return {
                ...prev,
                category: name,
            }
            
        })
        
    }
    

    //handling search
    function handleSearch(event){
        const {name, type, value, checked} = event.target
        
        setUserSearch((previous) => {
            return{
                ...previous,
                [name]: type === 'checkbox' ? checked : value
            }
        })
    }

    //setting up popper.js to display location suggestions to the user
    const [isPopoverOpen, setIsPopoverOpen] = useState(false)

    const inputRef = useRef()
    const popoverRef = useRef()
    let popperInstance

    useEffect(() => {
        if(isPopoverOpen){
            popperInstance = createPopper(inputRef.current, popoverRef.current, {
                placement: 'bottom-start',
                modifiers: [
                    {
                        name: 'offset',
                        options: {
                            offset: [0, 10], 
                        }
                    }
                ]
            })
        }

        return () => {
            if(popperInstance){
                popperInstance.destroy()
                popperInstance = null
            }
        }
    },[isPopoverOpen])

    //manage popper state
    const [openPopover, setOpenPopover] = useState(false);
    const [shouldFetchSuggestions, setShouldFetchSuggestions] = useState(true);


    const handleSelect = async (address) => {
        try {
            const results = await geocodeByAddress(address);
            const {lat, lng} = await getLatLng(results[0]);
            //console.log('Latitude:', lat);
            //console.log('Longitude:', lng);
            setUserSearch((prevData) => {
              return{
                  ...prevData,
                  locationSearch: address,
                  latitude: lat,
                  longitude: lng,
              }
            })
            setIsPopoverOpen(false)
          } catch (error) {
            console.log('Error:', error);
          } 
    }

    
    const handlePlaceChange = (value) => {
        setUserSearch((prevData) => ({
          ...prevData,
          locationSearch: value,
        }));
        setOpenPopover(true)
        if(value >= 0) {
            setShouldFetchSuggestions(true)
        }
      };

    const [anchorEl, setAnchorEl] = useState(null);

    const handleFocus = (event) => {
        setAnchorEl(event.currentTarget)
        setOpenPopover(true)
        setIsPopoverOpen(true)
    }

    const handleBlur = () => {
        setAnchorEl(null)
        setOpenPopover(false)
        setIsPopoverOpen(false)
    }

//viewport versions
const isMobile = useMediaQuery('(minWidth: 100px) and (maxWidth: 768px)')
console.log('isMobile', isMobile)

//link to respective component
const navigate = useNavigate()

//update app context state
const { setStateForm } = useAppContext()

//handle search button submission
function handleSubmit(event) {
    event.preventDefault()

    setStateForm((prevUserForm) => {
        return{
            ...prevUserForm,
            location: userSearch.locationSearch,
            latitude: userSearch.latitude,
            longitude: userSearch.longitude,
        }
    })

    if(userSearch.option === 'buy'){
        navigate('/buy')
    }else if(userSearch.option === 'rent'){
        navigate('/rent')
        setStateForm((prev)=>{
            return{
                ...prev,
                saleType: 'rent', 
            }
        })
    }
}
    

  return (
    <GoogleMapsLoader apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
    <div className='my-hero' style={{overflowY: 'hidden'}}>
        {video ? 
            <div className="hero">
            <div className="video-container">
                <video className="video-background" autoPlay loop muted>
                <source src={videoBG} type="video/mp4" />
                
                </video>
                <div className='title'><h1>{myLine}</h1></div>
                    <form className='my-form' action="">
                            <div className='btn-row'>
                                <button className={`btn-choice ${animateButtons ? 'button-pop' : ''}`} onClick={(event) => {event.preventDefault(); handleChoice('resident');}} style={myChoice === 'resident' ? {backgroundColor: '#ffffff', color: '#000'} : {}} value={userSearch.category}>Residential <img src={resident} alt="Resident" className='btn-logo'/></button>
                                <button className={`btn-choice ${animateButtons ? 'button-pop' : ''}`} onClick={(event) => {event.preventDefault(); handleChoice('commerce')}} style={myChoice === 'commerce' ? {backgroundColor: '#ffffff', color: '#000'} : {}}>Commercial <img src={commercial} alt="Commercial" className='btn-logo'/></button>
                                <button className={`btn-choice ${animateButtons ? 'button-pop' : ''}`} onClick={(event) => {event.preventDefault(); handleChoice('offPlan')}}  style={myChoice === 'offPlan' ? {backgroundColor: '#ffffff', color: '#000'} : {}}>Off-Plan <img src={offplan} alt="Off-plan" className='btn-logo'/></button>
                            </div>
                    <div className='nested-container' style={{position: 'relative', overflowY: 'hidden'}}>
                            <div className="form-container">
                                            <div className="form-option">
                                                <label htmlFor ="dropdown"></label>
                                                <select id="dropdown" onChange={handleSearch} name='option' value={userSearch.option}>
                                                <option value="buy">Buy</option>
                                                <option value="rent">Rent</option>
                                                </select>
                                                
                                            </div>
                                            <ExpandMoreIcon/>
                                            <div className="form-area">
                                                <label htmlFor="textarea"></label>
                                                <PlacesAutocomplete
                                                    value={userSearch.locationSearch}
                                                    onChange={handlePlaceChange}
                                                    onSelect={handleSelect}
                                                    shouldFetchSuggestions={shouldFetchSuggestions}
                                                >
                                                    {({getInputProps, getSuggestionItemProps, suggestions, loading})=>(
                                                        <div>
                                                        <input 
                                                        id="textarea" rows="1" 

                                                        style={{position: 'relative'}}
                                                        onChange={handleSearch} 
                                                        name='locationSearch' 
                                                        value={userSearch.locationSearch}
                                                        onFocus={handleFocus}
                                                        onBlur={handleBlur}
                                                        {
                                                            ...getInputProps({
                                                                placeholder:"Enter Location" 
                                                            })
                                                        }
                                                        />

                                                            
                                                              {isPopoverOpen && ( createPortal(

                                                                    <Paper
                                                                    ref={popoverRef}
                                                                    className='location-suggestions'
                                                                    sx={{
                                                                        zIndex: 9999,
                                                                        position: 'absolute',
                                                                        width: '100%',
                                                                        marginTop: '5px',
                                                                        overflow: 'hidden'
                                                                    }}
                                                                    elevation={3}
                                                                    >

                                                                <Box sx={{display: 'flex', justifyContent: 'center'}}>
                                                                    {suggestions.length > 0 && (
                                                                        <List sx={{zIndex: '9999', overflowY: 'auto', maxHeight: '200px'}}>
                                                                        {suggestions.map(suggestion => (
                                                                        <ListItem
                                                                            {...getSuggestionItemProps(suggestion)}
                                                                            button
                                                                            sx={{
                                                                            backgroundColor: suggestion.active ? '#f5f5f5' : '#ffffff',
                                                                            cursor: 'pointer',
                                                                            '&:hover': {
                                                                                backgroundColor: '#f5f5f5', // Change the background color on hover
                                                                              },
                                                                            
                                                                            }}
                                                                        >
                                                                            <ListItemText 
                                                                            primary={<Typography sx={{fontSize: '10pt'}}>{suggestion.description}</Typography>} 
                                                                            sx={{fontSize: '4pt'}}/>
                                                                        </ListItem>
                                                                        ))}
                                                                        </List>
                                                                    )}
                                                                </Box></Paper>, document.getElementById('popper-container'))
                                                              )}  
                                                            
                                                             
                                                        </div>

                                                        
                                                    )}
                                                     
                                                </PlacesAutocomplete>
                                                
                                            </div>
                                            <button type="submit" className='search' onClick={handleSubmit}><img src={search} alt="search" className='btn-logo'/></button>
                                </div>
                    </div>
                            <div id='popper-container'></div>    
                    </form>
                    
            </div>
            </div>
        
        
        :
        
        <div className='hero' style={{'--backgroundImage': `url(${backImage})`}}>
            
            <div className='hero-container'>
            <div className='title'><h1>{myLine}</h1></div>
                <form>
                    <div className='btn-row'>
                        <button className={`btn-choice ${animateButtons ? 'button-pop' : ''}`} onClick={(event) => {event.preventDefault(); handleChoice('resident')}} style={myChoice === 'resident' ? {backgroundColor: '#ffffff'} : {}}>Residential <img src={resident} alt="Resident" className='btn-logo'/></button>
                        <button className={`btn-choice ${animateButtons ? 'button-pop' : ''}`} onClick={(event) => {event.preventDefault(); handleChoice('commerce')}} style={myChoice === 'commerce' ? {backgroundColor: '#ffffff'} : {}}>Commercial <img src={commercial} alt="Commercial" className='btn-logo'/></button>
                        <button className={`btn-choice ${animateButtons ? 'button-pop' : ''}`} onClick={(event) => {event.preventDefault(); handleChoice('offPlan')}}  style={myChoice === 'offPlan' ? {backgroundColor: '#ffffff'} : {}}>Off-Plan <img src={offplan} alt="Off-plan" className='btn-logo'/></button>
                    </div>

                        
                        <div className="form-container">
                                    <div className="form-option">
                                        <label htmlFor ="dropdown"></label>
                                        <select id="dropdown" onChange={handleSearch} name='option' value={userSearch.option}>
                                        <option value="buy">Buy</option>
                                        <option value="rent">Rent</option>
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
           
        </div>}
        <div className='chat-icon'><img src={chat} alt="chat" /></div>
    </div>
    </GoogleMapsLoader>
  )
}

export default Hero
