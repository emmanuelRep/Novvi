import React, { useState } from 'react'
import { useEffect } from 'react';
import {styles} from './styles.css'

import house from './assets/house1.jpg'

import BedOutlinedIcon from '@mui/icons-material/BedOutlined';
import BathtubOutlinedIcon from '@mui/icons-material/BathtubOutlined';
import SquareFootIcon from '@mui/icons-material/SquareFoot';

import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const Card = ({props}) => {
  //favorite heart
  const [heart, setMyHeart] = useState(false);

  function toggleHeart(){
    setMyHeart(!heart)
  }

  
  useEffect(() => {
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Cleanup and remove event listener on unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScroll = () => {
    const cards = document.getElementsByClassName('card-container');
    for (let i = 0; i < cards.length; i++) {
      const card = cards[i];
      const rect = card.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
      if (isVisible) {
        card.classList.add('card-bounce');
      } else {
        card.classList.remove('card-bounce');
      }
    }
  };

  return (
    <div className='card'>
          <div className='card-parent'>
              <div className='card-container'>
                  <div className='img-container'><img src={props.img} alt='house' className='house-img'/>
                  <div className='heart'>
                        {heart ? 
                                <FavoriteIcon style={{ color: '#ffd700', fontSize: '32px' }} onClick={toggleHeart} />
                               : 
                                <FavoriteBorderIcon style={{color: 'white', fontSize: '32px'}} onClick={toggleHeart} />
                              }
                        </div>
                  </div>
                  <h3 className='description'>{props.describe}</h3>
                  <p className='location'>{props.locate}</p>
                  <p className='feature'>{props.beds}{' '}<BedOutlinedIcon/>  |  {props.baths} <BathtubOutlinedIcon/>  |  {props.size} {' '} <SquareFootIcon/> sqft </p>
                  <h3 className='price'>AED {props.price}</h3>
              </div>
          </div>
    </div>
  )
}

export default Card
