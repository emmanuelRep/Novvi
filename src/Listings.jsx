import React, { useState } from 'react'
import {styles} from './styles.css'
import Card from './Card'
import myProperties from './properties'


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
        <div className='card'>{property}</div>
        
    </div>
  )
}

export default Listings
