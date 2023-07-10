import React, { useEffect, useState } from 'react'
import {styles} from './styles.css'
import logo from './assets/Novvi-prop.png'

import { FaBars } from 'react-icons/fa'
import { MdClose } from 'react-icons/md'

//Material UI
import { Box, IconButton, Menu, MenuItem, Popover } from '@mui/material';
import { Menu as MenuIcon, Close as CloseIcon } from '@mui/icons-material';


const Nav = ({tint}) => {
    //handle mobile and tablet menu display state
    const [isOpen, setIsOpen] = useState(false)

    //handle screen dimensions state
    const [screenWidth, setScreenWidth] = useState(window.innerWidth)
    const [screenHeight, setScreenHeight] = useState(window.innerHeight)

    //handle dropdown menu display for mobile and tablet
    const [listVisible, setListVisible] = useState(true)

    function toggleList(){
        setListVisible(prevVisible => !prevVisible)
    }

    

    useEffect ( () => {
        //update screen dimensions
        const handleResize = () => {
            setScreenWidth(window.innerWidth)
            setScreenHeight(window.innerHeight)
        }

        //Attach the resize event listener
        window.addEventListener('resize', handleResize)

        //cleanup and unmount event listener
        return () => {
            window.removeEventListener('resize', handleResize)
        } 
    }, [])

    //optimize the screen scroll for mobile
    useEffect(() => {
        if(isOpen){
            //disable scroll when menu is open
            document.body.style.overflow = 'hidden'
        }else{
            //enable scroll on mobile menu
            document.body.style.overflow = 'auto'
        }
        //cleanup scrolling unmount
        return () => {
            document.body.style.overflow = 'auto'
        }
    }, [isOpen])

    //open and close mobile menu
    const toggleMenu = () => {
        setIsOpen(!isOpen)
        tint(isOpen)
    }

    console.log(screenWidth)
    
    const mobileDisplay = () => {
        if(screenWidth <= 950){
            return(
                <>
                    <IconButton onClick={toggleMenu}>
                    {isOpen ? <CloseIcon /> : <MenuIcon />}
                    </IconButton>  
                    <Menu
                        className='menu-style'
                        anchorReference="anchorPosition"
                        anchorPosition = {{top: 80, left: window.innerWidth - 8}}
                        anchorOrigin={{vertical: 'top', horizontal: 'right'}}
                        transformOrigin={{vertical: 'top', horizontal: 'right'}}
                        anchorEl={null}
                        open={isOpen}
                        onClose={() => setIsOpen(false)}
                        PaperProps={{
                            style: {
                              width: '80vw', // Set your desired width here
                              paddingRight: 8,
                              height: '100vh',
                            },
                          }}
                    >
                        <MenuItem onClick={() => setIsOpen(false)}>
                            <a href='#'>Buy</a>
                        </MenuItem>
                        <MenuItem onClick={() => setIsOpen(false)}>
                            <a href='#'>Rent</a>
                        </MenuItem>
                        <MenuItem onClick={() => setIsOpen(false)}>
                            <a href='#'>Commercial</a>
                        </MenuItem>
                        <MenuItem onClick={() => setIsOpen(false)}>
                            <a href='#'>Off-Plan</a>
                        </MenuItem>
                        <MenuItem onClick={() => setIsOpen(false)}>
                            <a href='#'>Property Management</a>
                        </MenuItem>
                        <MenuItem onClick={() => setIsOpen(false)}>
                            <a href='#'>Contact</a>
                        </MenuItem>
                        <MenuItem onClick={() => setIsOpen(false)}>
                            <a href='#'>Holiday Homes</a>
                        </MenuItem>
                        <MenuItem onClick={() => setIsOpen(false)}>
                            <a href='#'>Concierge</a>
                        </MenuItem>
                        <MenuItem onClick={() => setIsOpen(false)}>
                            <a href='#'>About Us</a>
                        </MenuItem>
                            <div className='parent-mobile-cta'>
                            <button className='mobile-cta'><li>List Your Property</li></button>
                            </div>
                                
                        
                    </Menu>
                </>
            )
        }
         
    }

    //console.log(listVisible);

  return (
    <div className='Nav'>
        <div className='header'>
            <div className='logo-container'>
                <img src={logo} alt="Novvi Properties" className='logo'/>
            </div>
            <div className='menu'>
                {mobileDisplay()}
                <ul className='menu-items'>
                    <a href="#"><li>Buy</li></a>
                    <a href="#"><li>Rent</li></a>
                    <a href="#"><li>Commercial</li></a>
                    <a href="#"><li>Off-Plan</li></a>
                    <a href="#"><li>Property Management</li></a>
                    <a href="#"><li>Contact</li></a>
                    <li className='dropdown'>
                        <p className='arrow'>Discover more</p>
                        <ul className='submenu'>
                        <li><a href="#">Holiday Homes</a></li>
                        <li><a href="#">Concierge</a></li>
                        <li><a href="#">About Us</a></li>
                        </ul>
                    </li>
                    
                    <button className='list-cta'><li>List Your Property</li></button>
                </ul>
                
            </div>
        </div>
      
    </div>
  )
}

export default Nav
