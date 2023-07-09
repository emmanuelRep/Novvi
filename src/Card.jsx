import React from 'react'
import {styles} from './styles.css'

import house from './assets/house1.jpg'

const Card = ({props}) => {
  return (
    <div className='card'>
          <div className='card-parent'>
              <div className='card-container'>
                  <div className='img-container'><img src={props.img} alt='house' className='house-img'/></div>
                  <h3 className='description'>{props.describe}</h3>
                  <p className='location'>{props.locate}</p>
                  <p className='feature'>{props.beds} Beds  |  {props.baths} Baths  |  {props.size} sqft</p>
                  <h3 className='price'>AED {props.price}</h3>
              </div>
          </div>
    </div>
  )
}

export default Card
