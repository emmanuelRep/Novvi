import React from 'react'
import { useState } from 'react';
import { createPortal } from 'react-dom';
import { Drawer, Paper, List, ListItemText, ListItem, Box, Typography } from '@mui/material';
import PlacesAutocomplete from 'react-places-autocomplete';
import { GoogleMap, useLoadScript } from '@react-google-maps/api';
import {
    geocodeByAddress,
    getLatLng,
  } from 'react-places-autocomplete';
import { useAppContext } from './AppContext';
import {styles} from './styles.css'

import { useRef } from 'react';
import { useEffect } from 'react';
import { createPopper } from '@popperjs/core';
import { ArrowBackIos, BackHandOutlined, CloseOutlined, LocationOnOutlined } from '@mui/icons-material';


//libraries array
const libraries = ["places"]

const GoogleMapsLoader = ({ apiKey, children }) => {
    const { isLoaded } = useLoadScript({
      googleMapsApiKey: apiKey,
      libraries,
    });
  
    if (!isLoaded) {
      return <div></div>;
    }
  
    return children;
  };

const LocationSearchMobile = ({open, close}) => {

    //state to store user input
    const[userForm, setUserForm] = useState({
        location: '', saleType: 'Buy',
        homeStyle: '',numBeds: '',
        pricing: '', minPrice: '',
        maxPrice: '', latitude: '',
        longitude: '',
    })

    //update app context and local state

    const { setStateForm } = useAppContext()
    const { stateForm } = useAppContext()

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
        
       
    }

    console.log(userForm)
    //on search button click, update app context state with local state values
    const searchClick = () => {
        setStateForm((prev) => {
            return{
                ...prev,
                location: userForm.location,
                latitude: userForm.latitude,
                longitude: userForm.longitude,
            }
        })
        console.log(stateForm)
    }

    const [shouldFetchSuggestions, setShouldFetchSuggestions] = useState(true);


    //use popper js to display suggestions
    const [openPopover, setOpenPopover] = useState(false);
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);



      const handlePlaceChange = (value) => {
        setUserForm((prevData) => ({
          ...prevData,
          location: value,
        }));
        //setOpenPopover(true)
        if(value >= 0) {
            setShouldFetchSuggestions(true)
        }
      };

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
          //searchClick()

          setStateForm((prev) => ({
            ...prev,
            location: address,
            latitude: lat,
            longitude: lng,
          }));
          //setIsPopoverOpen(false)
        } catch (error) {
          console.log('Error:', error);
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

            

  return (
    <GoogleMapsLoader apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
    <div>
        <Drawer
                anchor='bottom'
                open={open}
                onClose={close}
                PaperProps={{
                    sx: {
                        top: 0,
                        height: 'height: calc(100% - 0px)'
                    }
                }}
            >
                <div className="drawer-header">
                    <div className="closeIcon" onClick={close}><ArrowBackIos sx={{fontSize: '2rem'}}/></div>
                    
                        <h3 className='drawer-caption'>Your new home awaits</h3>
                    
                </div>
                <hr/>
            <div className="search-header-mobile">
                
                    <div className="search-bar">
                        
                            <PlacesAutocomplete
                                value={userForm.location} 
                                onChange={handlePlaceChange} 
                                onSelect={handleSelect}
                                shouldFetchSuggestions = {shouldFetchSuggestions}
                            >
                                {({getInputProps, getSuggestionItemProps, suggestions, loading}) => {
                                    return(
                                        <div className='userSearch'>
                                            
                                            <input
                                                id='location'
                                                name= 'location'
                                                onFocus={handleFocus}
                                                onBlur={handleBlur}
                                                value={userForm.location}
                                                className='mobile-searchBox'
                                                {...getInputProps({
                                                    placeholder: 'Search locations',
                                                   
                                                })}
                                                
                                                style = {{position: 'relative'}}
                                            />

                                                
                                                <Box sx={{display: 'flex', justifyContent: 'center'}}>
                                                {suggestions.length > 0 && (
                                                    <List sx={{zIndex: '9999', overflowY: 'auto', height: 'auto'}}>
                                                    {suggestions.map(suggestion => (
                                                    <ListItem
                                                        {...getSuggestionItemProps(suggestion)}
                                                        button
                                                        sx={{
                                                        backgroundColor: suggestion.active ? '#f5f5f5' : '#ffffff',
                                                        borderBottom: '1px solid grey', 
                                                        cursor: 'pointer',
                                                        '&:hover': {
                                                            backgroundColor: '#f5f5f5', // Change the background color on hover
                                                        },
                                                        
                                                        }}
                                                    >
                                                        <LocationOnOutlined/>
                                                        <ListItemText
                                                        onClick={close} 
                                                        primary={
                                                            <Typography sx={{fontSize: '12pt'}}>
                                                                {suggestion.description}
                                                            </Typography>
                                                            } 
                                                        sx={{fontSize: '4pt'}}/>
                                                    </ListItem>
                                                    ))}
                                                    </List>
                                                )}
                                                </Box>
                                               
                                        </div>
                                    )
                                }}
                                
                            </PlacesAutocomplete>
                             
                    </div>
                
            </div>
        
        </Drawer>
    </div>
    </GoogleMapsLoader>
  )
}

export default LocationSearchMobile
