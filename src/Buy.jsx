import React, { useState, useEffect, useRef } from 'react'
import {styles} from './styles.css'

import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { FormControl, InputLabel, TextField } from '@mui/material';
import { Select, MenuItem } from '@mui/material';
import { Height, MapOutlined, Margin, TimeToLeaveOutlined } from '@mui/icons-material';
import Box from '@mui/material/Box';
import Popover from '@mui/material/Popover';
import { List, ListItem, ListItemText } from '@mui/material';
import { Typography } from '@mui/material';

import { useMemo } from 'react';
import {GoogleMap, useLoadScript, Marker, MarkerF} from '@react-google-maps/api'


import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import BedOutlinedIcon from '@mui/icons-material/BedOutlined';
import BathtubOutlinedIcon from '@mui/icons-material/BathtubOutlined';
import SquareFootIcon from '@mui/icons-material/SquareFoot';
import DriveEtaOutlinedIcon from '@mui/icons-material/DriveEtaOutlined';
import ViewInArOutlinedIcon from '@mui/icons-material/ViewInArOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useMediaQuery } from '@mui/material';
import { Fab } from '@mui/material';

import interior from './assets/interior.jpg'
import house from './assets/house2.jpg'
import house2 from './assets/interior2.jpg'

import ListCards from './ListCards';
import myProperties from './properties';
import { Await } from 'react-router-dom';

import PlacesAutocomplete from 'react-places-autocomplete';
import {
    geocodeByAddress,
    getLatLng,
  } from 'react-places-autocomplete';
import Autocomplete from '@mui/material/Autocomplete';
import loadGoogleMaps from './GoogleMapsLoader';
import { createPopper } from '@popperjs/core';

import Card from './Card';
import Pin from './assets/pin.png'

  

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

const Buy = () => {
    //state to store user input
    const[userForm, setUserForm] = useState({
        location: '', saleType: 'Buy',
        homeStyle: '',numBeds: '',
        pricing: '', minPrice: '',
        maxPrice: '', latitude: '',
        longitude: '',
    })

    //ensure maps has loaded
    const [googleMapsLoaded, setGoogleMapsLoaded] = useState(false);
    
    //test state
    const [address, setAddress] = useState('')

    console.log(userForm)

    const handleChange = (event) => {
        //console.log(event.target)
        //store user input in state
        const {name, value, type, checked} = event.target
       
        setUserForm(prevData => {
            return{
                ...prevData,
            //    [id]: value,
                [name]:value
            }
        })

        //setAddress(value)
        
    }

    

    //google maps API

    


    function Map(){
        //center map
        const center = useMemo(() => {
            if (userForm.latitude !== '' && userForm.longitude !== ''){
                return {lat: userForm.latitude, lng: userForm.longitude}
            }else{
                return {lat:25.2048, lng: 55.2708}
            }
        })
        //const center = useMemo(() => ({lat:userForm.latitude, lng: userForm.longitude}))

        const homes = [
            {id: 1, lat: 25.075134, lng: 55.132973},
            {id: 2, lat: 25.077828, lng: 55.137104},
            {id: 3, lat: 25.072568, lng: 55.139732},
            {id: 4, lat: 25.074916, lng: 55.140673},
            {id: 5, lat: 25.076344, lng: 55.134956},
        ]

        return (
        
        
            <GoogleMap 
                zoom={12} 
                center={center} 
                mapContainerClassName={isMobile === false ? 'map-container' : 'map-container-mobile'}
                options={{
                    mapId: '703ba15b3678a96e'
                }}
            >
                {userForm.location === '' ? <MarkerF position={center}/> : 
                    homes.map((th) => {
                        return(
                            <MarkerF
                                key={th.id}
                                position={{ lat: th.lat, lng: th.lng}}
                                icon={{
                                    url: Pin,
                                    scaledSize: new window.google.maps.Size(40, 40),
                                }}
                            />  
                        )
                            
                        
                    })
                }
            </GoogleMap>
        
    )}

    //render card data from database
    const cardData = myProperties.map((th) => {
        return <ListCards
            key={th.id}
            props={th}
        />
    })

    //render card data for larger no map view width
    const property = myProperties.map((th) => {
        return <Card
            key = {th.id}
            props = {th}
          />
    })

    
    const handleSelect = async (address) => {
        try {
          const results = await geocodeByAddress(address);
          const {lat, lng} = await getLatLng(results[0]);
          //console.log('Latitude:', lat);
          //console.log('Longitude:', lng);
          setUserForm((prevData) => {
            return{
                ...prevData,
                location: address,
                latitude: lat,
                longitude: lng,
            }
          })
          setIsPopoverOpen(false)
        } catch (error) {
          console.log('Error:', error);
        } 
      }; 
      
      const [openPopover, setOpenPopover] = useState(false);
      const [shouldFetchSuggestions, setShouldFetchSuggestions] = useState(true);


      const handlePlaceChange = (value) => {
        setUserForm((prevData) => ({
          ...prevData,
          location: value,
        }));
        setOpenPopover(true)
        if(value >= 0) {
            setShouldFetchSuggestions(true)
        }
      };

      

      //manage autocomplete popover state
      const [anchorEl, setAnchorEl] = useState(null);


      const handleFocus = (event) => {
        setAnchorEl(event.currentTarget);
        setOpenPopover(true)
        setIsPopoverOpen(true)
      };
    
      const handleBlur = () => {
        setAnchorEl(null);
        setOpenPopover(false)
        setIsPopoverOpen(false)
      };

      //use popper js to display suggestions
        const [isPopoverOpen, setIsPopoverOpen] = useState(false);

        const inputRef = useRef();
        const popoverRef = useRef();
        let popperInstance;

        useEffect(() => {
            if (isPopoverOpen) {
                popperInstance = createPopper(inputRef.current, popoverRef.current, {
                  placement: 'bottom-start',
                  modifiers: [
                    {
                      name: 'offset',
                      options: {
                        offset: [0, 10], // Adjust the offset as per your needs
                      },
                    },
                  ],
                });
              }

              return () => {
                if (popperInstance) {
                  popperInstance.destroy();
                  popperInstance = null;
                }
              };
        }, [isPopoverOpen])
      

   //handle show map state
   const [showMap, setShowMap] = useState(false)
   
   function toggleMap(){
        setShowMap(prevState => !prevState)
   }

   console.log(showMap)

   //handle mobile and tablet responsiveness for the user form
   const isSingle = useMediaQuery('(max-width: 600px)')



   //handle mobile and tablet responsiveness for listings
   const isMobile = useMediaQuery('(max-width: 1200px)');
   const isMedium = useMediaQuery('(max-width: 1099px)');

   const mobileDisplay = () => {
        if (isMobile === true) {
            return(
                <div className='map-area-mobile'>
                <div className='orient-mobile'>
                        {isSingle === false ? <div className='map-header'>
                            <div className='list-location'>
                                <h3>Properties for sale in UAE</h3>
                            </div>
                            <div className='map-toggle'>
                                <p>Show {showMap === true ? 'Listings' : 'Map'}</p>
                                <label htmlFor="mode" className='toggle-switch'>
                                    <input type="checkbox" id='mode' name='mode' onClick={toggleMap} checked={showMap}/>
                                    <span className='slider'></span>
                                </label>

                            </div>
                        </div> : 
                        
                        <div className='mobile-map-header'>
                            <div className='list-location-mobile'>
                                <h3>Properties for sale in UAE</h3>
                            </div>
                            
                            <div className='map-btn-container'>
                            <Fab aria-label='mapToggle' variant='extended' className='mobileToggle' onClick={toggleMap}>
                                <p>Show {showMap === true ? 'Listings' : 'Map'} <MapOutlined/></p>
                            </Fab>
                            </div>
                            
                        </div>}
                        
          

                        {showMap === false ? <div className='property-list-mobile'>
                            {isMedium === false ? cardData : property}
                        </div> : <Map/>}    

                    </div>
                </div>
            )
        }
   }

  return (
    <GoogleMapsLoader apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
    <div className='buy'>
      {isSingle === false ? <div className='map-form'>
      <Box className="region">
            <PlacesAutocomplete 
            value={userForm.location} 
            onChange={handlePlaceChange} 
            onSelect={handleSelect}
            shouldFetchSuggestions = {shouldFetchSuggestions}
            >
                {({getInputProps, getSuggestionItemProps, suggestions, loading}) => (
                <Box>
                    <TextField
                        id="location"
                        name="location"
                        label="Enter Location"
                        rows={1}
                        variant="outlined"
                        value={userForm.location}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        sx={{
                        width: 300,
                        position: 'relative'
                        }}
                        InputProps={
                            getInputProps({ placeholder: 'Enter location',
                        })
                        }
                        
                    />
                    {isPopoverOpen && (<Box ref={popoverRef} className='location-suggestions'>
                           {suggestions.length > 0 && ( 
                            <List>
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
                                    <ListItemText primary={suggestion.description} />
                                </ListItem>
                                ))}
                            </List>
                            )}
                        </Box>)}
                        
                        
                    
                </Box>
                       
                )}
            </PlacesAutocomplete>
        </Box>

        


        <Box className='sale-type' sx={{minWidth: 200}}>
            <FormControl fullWidth>
            <InputLabel id="sale" sx={{zIndex: 9999}}>Sale Type</InputLabel>
                <Select
                    labelId='sale'
                    id='saleType'
                    name='saleType'
                    value={userForm.saleType}
                    label="saleType"
                    onChange={handleChange}
                    
                >
                    <MenuItem value='Buy'>Buy</MenuItem>
                    <MenuItem value='Rent'>Rent</MenuItem>
                </Select>
            </FormControl>
        </Box>
            <Box className='type' sx={{minWidth: 200}}>
                <FormControl fullWidth>
                <InputLabel id="home-type" sx={{zIndex: 9999}}>Home Type</InputLabel>
                <Select
                    labelId='home-type'
                    id='homeStyle'
                    name='homeStyle'
                    value={userForm.homeStyle}
                    label="Type"
                    onChange={handleChange}
                >
                    <MenuItem value='Apartments'>Apartments</MenuItem>
                    <MenuItem value='Condos'>Condos</MenuItem>
                    <MenuItem value='Houses'>Houses</MenuItem>
                </Select>
                </FormControl>
            </Box>


            <Box className='beds' sx={{minWidth: 200}}>
                <FormControl fullWidth>
                    <InputLabel id="num-beds" sx={{zIndex: 50}}>Beds</InputLabel>
                        <Select
                            labelId='num-beds'
                            id='numBeds'
                            name='numBeds'
                            value={userForm.numBeds}
                            label="Type"
                            onChange={handleChange}
                        >
                                <MenuItem value={'custom'}>
                                    Custom beds
                                </MenuItem>
                        </Select>
                </FormControl>
            </Box>



            <Box className='prices' sx={{minWidth: 200}}>
            <FormControl fullWidth>
            <InputLabel id="price-range" >Price</InputLabel>
                <Select
                    labelId='price-range'
                    id='pricing'
                    name='pricing'
                    value={userForm.pricing}
                    label="Pricing"
                    onChange={handleChange}
                >
                    <MenuItem value={'custom'} className='price-filter'>
                        Custom Price
                    </MenuItem>
                    {userForm.pricing === 'custom' && <div className='price-input'>
                        <TextField 
                                id='minPrice'
                                name='minPrice'
                                label='Price Min'
                                rows={1}
                                variant='outlined'
                            />

                        <TextField 
                                id='maxPrice'
                                name='maxPrice'
                                label='Price Max'
                                rows={1}
                                variant='outlined'
                            />
                    </div>}
                    
                </Select>
                </FormControl>
            </Box>

      </div> : <div className='map-form-mobile'>
            <Box className="region">
                    <PlacesAutocomplete 
                    value={userForm.location} 
                    onChange={handlePlaceChange} 
                    onSelect={handleSelect}
                    shouldFetchSuggestions = {shouldFetchSuggestions}
                    >
                        {({getInputProps, getSuggestionItemProps, suggestions, loading}) => (
                        <Box>
                            <TextField
                                id="location"
                                name="location"
                                label="Enter Location"
                                rows={1}
                                variant="outlined"
                                value={userForm.location}
                                onChange={handleChange}
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                                sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                width: '80vw',
                                position: 'relative',
                                paddingBottom: 4,
                                }}
                                InputProps={
                                    getInputProps({ placeholder: 'Enter location',
                                })
                                }
                                
                            />
                            {isPopoverOpen && (<Box ref={popoverRef} className='location-suggestions'>
                                {suggestions.length > 0 && ( 
                                    <List>
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
                                            <ListItemText primary={suggestion.description} />
                                        </ListItem>
                                        ))}
                                    </List>
                                    )}
                                </Box>)}
                                
                                
                            
                        </Box>
                            
                        )}
                    </PlacesAutocomplete>
                </Box> 
        </div>}


      {isMobile === false ? <div className='map-area'>
            {showMap === true ? <div className='orient-left-half'>
                <div className='map-header'>
                        <div className='list-location'>
                            <h3>Properties for sale in UAE</h3>
                        </div>
                        <div className='map-toggle'>
                            <p>Show map</p>
                            <label htmlFor="mode" className='toggle-switch'>
                                <input type="checkbox" id='mode' name='mode' onClick={toggleMap} checked={showMap}/>
                                <span className='slider'></span>
                            </label>

                        </div>
                    </div>
                    
                <div className='highlight'>
                    <div className='gallery-highlight'>
                        <img src={interior} alt="highlight home" />
                        <div className='ar'><ViewInArOutlinedIcon/></div>
                    </div>
                    <div className='highlight-description'>
                        <div className='headline'>
                            <h4>Most Viewed</h4>
                            <p className='share'>Share <ShareOutlinedIcon/></p>
                        </div>
                        <div className='details'>
                            <h2>Modern Spacious Villa</h2>
                            <p className='valid-address'><LocationOnOutlinedIcon/> Valid home address, Dubai</p>
                            <div className='amenities'>
                                <div className='pad'>
                                <p className='amenity'><BedOutlinedIcon/>5</p>
                                <p className='amenity'><BathtubOutlinedIcon/>6</p>
                                <p className='amenity'><TimeToLeaveOutlined/>5</p>
                                <p className='amenity'><SquareFootIcon/>8000 sqft</p>
                                </div>
                            </div>
                            <div className='property-description'>
                                <p>Charming 5-bedroom villa located in a prime location. 
                                    This modern villa features an open-concept layout, 
                                    spacious living areas, fully equipped kitchen, 
                                    and a <span>see more...</span>
                                </p>
                            </div>
                        </div>

                    </div>
                </div>

                <hr
                    style={{
                        color: '#f5f5f5',
                        borderWidth: '1px'
                    }}
                />

                <div className='other-listings'>
                    {cardData}
                </div>

            </div> : <div className='orient-left-full'>
                <div className='map-header-full'>
                        <div className='list-location'>
                            <h3>Properties for sale in UAE</h3>
                        </div>
                        <div className='map-toggle'>
                            <p>Show map</p>
                            <label htmlFor="mode" className='toggle-switch'>
                                <input type="checkbox" id='mode' name='mode' onClick={toggleMap} checked={showMap}/>
                                <span className='slider'></span>
                            </label>

                        </div>
                    </div>
                
                    <div className='property-list-large'>
                        {property}
                    </div>

            </div>}

            {<div className='orient-right-half'>
                {<Map/>}  
            </div>}  
            

            
      </div>
      
        :
            mobileDisplay()
            }

            
                    </div>
    </GoogleMapsLoader>
  )
}

export default Buy
