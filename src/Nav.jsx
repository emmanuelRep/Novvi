import React, { useEffect, useState } from 'react'
import {styles} from './styles.css'
import logo from './assets/Novvi-prop.png'

import { FaBars } from 'react-icons/fa'
import { MdClose } from 'react-icons/md'


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

    

    const display = () => {
        if(screenWidth < 768){
            if(listVisible){
                return (
                    <>    
                        <p className='arrow' onClick={toggleList}>Discover more</p>
                        <ul className='mobile-sub'>
                            <li><a href="#">Holiday Homes</a></li>
                            <li><a href="#">Concierge</a></li>
                            <li><a href="#">About Us</a></li>                        
                        </ul>
                    </>
                )
                
            }else{
                return <p className='arrow' onClick={toggleList}>Discover more</p>
            }

            
        }

        if (screenWidth >= 768){
            return(
                <li className='dropdown'>
                        <p className='arrow'>Discover more</p>
                        <ul className='submenu'>
                        <li><a href="#">Holiday Homes</a></li>
                        <li><a href="#">Concierge</a></li>
                        <li><a href="#">About Us</a></li>
                        </ul>
                    </li>
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
                    <div className={`menu-toggle ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
                        {isOpen ? <MdClose /> : <FaBars />}
                    </div>
                <ul className={`menu-items ${isOpen ? 'open' : ''}`}>
                    <a href="#"><li>Buy</li></a>
                    <a href="#"><li>Rent</li></a>
                    <a href="#"><li>Commercial</li></a>
                    <a href="#"><li>Off-Plan</li></a>
                    <a href="#"><li>Property Management</li></a>
                    <a href="#"><li>Contact</li></a>
                    {display()}
                    
                    <button className='list-cta'><li>List Your Property</li></button>
                </ul>
                
            </div>
        </div>
      
    </div>
  )
}

export default Nav
