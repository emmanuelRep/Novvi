import React, { useState, useRef } from 'react'
import {styles} from './styles.css'
import Card from './Card'
import Buy from './Buy'
import myProperties from './properties'
import { Fab, colors } from '@mui/material'
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material'



const Listings = () => {
  //state management for list type
  const [listType, setListType] = useState('forSale')

  //set state for list type
  function handleChoice(choice){
    setListType(choice)
  }


  const property = myProperties.map((th) => {
      return <Card
          key = {th.id}
          props = {th}
        />
  })

  //implement left right scroll
  const containerRef = useRef(null)

  const handleScrollLeft = () => {
    containerRef.current.scrollLeft -= 350
  }

  const handleScrollRight = () => {
    containerRef.current.scrollLeft += 350
  }

  
  return (
    <div className='listing-section'>
        <div className='listing-container'>
            <div><h1>New Listings</h1></div>
            <div className='listing-row'>
                <button className='listing-btn' onClick={(event) => {event.preventDefault(); handleChoice('forSale')}} style={listType === 'forSale' ? {backgroundColor: '#ffd700', borderColor: '#ffd700'} : {}}>For Sale</button>
                <button className='listing-btn' onClick={(event) => {event.preventDefault(); handleChoice('forRent')}} style={listType === 'forRent' ? {backgroundColor: '#ffd700', borderColor: '#ffd700'} : {}}>For Rent</button>
                <button className='listing-btn' onClick={(event) => {event.preventDefault(); handleChoice('offPlan')}} style={listType === 'offPlan' ? {backgroundColor: '#ffd700', borderColor: '#ffd700'} : {}}>Off-Plan</button>
            </div>
        </div>
        <div className='card-carousel' ref={containerRef}>
        {/*<div className='backward'>
        <Fab aria-label='left-scroll' onClick={handleScrollLeft}>
            <ArrowBackIos
                sx={{
                    zIndex: 20,
                    
                }}
            />
        </Fab>
              </div>*/}
        
      <div className='card'>
        
        {property}
      
      </div>

        {/*<div className='forward'>
        <Fab aria-label='right-scroll' onClick={handleScrollRight}>
            <ArrowForwardIos
                sx={{
                    zIndex: 20
                }}
            />
        </Fab>
              </div> */}
        </div>
        
    </div>
  )
}

export default Listings
