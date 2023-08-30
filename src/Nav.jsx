import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {styles} from './styles.css'
import logo from './assets/Novvi-prop.png'

import { FaBars } from 'react-icons/fa'
import { MdClose } from 'react-icons/md'

//Material UI
import { Box, IconButton, Menu, MenuItem, Popover, Drawer, List, ListItem, ListItemText, Button } from '@mui/material';
import { Menu as MenuIcon, Close as CloseIcon } from '@mui/icons-material';
import {debounce} from 'lodash'
import { useMediaQuery } from '@mui/material';


const Nav = ({tint}) => {
    //handle mobile and tablet menu display state
    const [isOpen, setIsOpen] = useState(false)

    const isMobile = useMediaQuery('(max-width: 1100px)');

    //handle screen dimensions state
    const [screenWidth, setScreenWidth] = useState(0)
    const [screenHeight, setScreenHeight] = useState(window.innerHeight)

    //handle dropdown menu display for mobile and tablet
    const [listVisible, setListVisible] = useState(true)

    function toggleList(){
        setListVisible(prevVisible => !prevVisible)
    }

    

    useEffect ( () => {
        //update screen dimensions
        const handleResize = debounce(() => {
            setScreenWidth(window.innerWidth)
            setScreenHeight(window.innerHeight)
        }, 100)

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
            document.getElementById('root').classList.add('lock-scroll')
        }else{
            //enable scroll on mobile menu
            document.getElementById('root').classList.remove('lock-scroll')
        }
        //cleanup scrolling unmount
        return () => {
            document.getElementById('root').classList.remove('lock-scroll')
        }
    }, [isOpen])

    //open and close mobile menu
    const toggleMenu = () => {
        setIsOpen(!isOpen)
        tint(isOpen)
    }

    console.log(screenWidth)
    
    const mobileDisplay = () => {
        const menuItems = [
            {name: 'Buy', link: '/buy'},
            {name: 'Rent', link: '/rent'},
            {name: 'Commercial'},
            {name: 'Off-Plan'},
            {name: 'Property Management'},
            {name: 'Contact'},
            {name: 'Holiday Homes'},
            {name: 'Concierge'},
            {name: 'About Us'},
        ]


        if(screenWidth < 970){
            return(
                <>
                    <IconButton onClick={toggleMenu}>
                    {isOpen ? <CloseIcon /> : <MenuIcon />}
                    </IconButton> 

                    <Drawer
                        anchor='right'
                        open={isOpen}
                        onClose={() => setIsOpen(false)}
                        sx={{
                            zIndex: 9999
                        }}
                    >
                        <List sx={{width: 250, color: '#264068'}} onClick = {() => setIsOpen(false)} className='menu-style'>
                            <CloseIcon
                                sx={{paddingLeft: '12px',
                                     paddingTop: '24px'
                                }}
                                onClick = {() => setIsOpen(false)}
                            />
                            {menuItems.map((item) => (
                                <ListItem button key={item.name}>
                                    <ListItemText primary={<Link to={item.link}>{item.name}</Link>}/>
                                </ListItem>
                            ))}
                            <div className='parent-mobile-cta'>
                                <Button variant='contained'
                                 className='mobile-cta'
                                 sx={{
                                    backgroundColor: '#264068',
                                 }}
                                 >
                                    <li>List Your Property</li>
                                </Button>
                            </div>
                        </List>
                    </Drawer> 
                    
                </>
            )
        }
         
    }

    //console.log(listVisible);

  return (
    <div className='Nav'>
        <div className={`header ${isOpen ? 'sticky': ''}`}>
            <div className='logo-container'>
                <Link to="/"><img src={logo} alt="Novvi Properties" className='logo'/></Link>
            </div>
            <div className='menu'>
            {isMobile ? mobileDisplay() : 
                <ul className='menu-items'>
                    <Link to="/buy" className='pageLink'><li>Buy</li></Link>
                    <Link to="/rent" className='pageLink'><li>Rent</li></Link>
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
                }
            </div>
        </div>
      
    </div>
  )
}

export default Nav
