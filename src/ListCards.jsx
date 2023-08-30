import {React, useState} from 'react'
import {styles} from './styles.css'

import BedOutlinedIcon from '@mui/icons-material/BedOutlined';
import BathtubOutlinedIcon from '@mui/icons-material/BathtubOutlined';
import SquareFootIcon from '@mui/icons-material/SquareFoot';
import DriveEtaOutlinedIcon from '@mui/icons-material/DriveEtaOutlined';
import ViewInArOutlinedIcon from '@mui/icons-material/ViewInArOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Fab } from '@mui/material';
import { ArrowBackIos } from '@mui/icons-material';

import Details from './Details'
import { useParams, useNavigate } from 'react-router-dom';

const ListCards = ({props}) => {
    //handle clicked card
    const cardClicked = () => {
        window.open(`/details/${props.id}`, '_blank')
        //window.open('/details', '_blank')
    }

    //favorite heart
    const [heart, setMyHeart] = useState(false);

    function toggleHeart(){
        setMyHeart(!heart)
    }

  return (
    <div>

      <div className='list-card' onClick={cardClicked}>
                        <div className='list-img-container'>
                            <img src={props.img} alt="image of a house" />
                            <div className='heart'>
                            {heart ? 
                                    <FavoriteIcon style={{ color: '#ffd700', fontSize: '28px' }} onClick={toggleHeart} />
                                : 
                                    <FavoriteBorderIcon style={{color: 'white', fontSize: '28px'}} onClick={toggleHeart} />
                                }
                            </div>
                 
                        </div>
                        <div className='list-description-container'>
                            <h3 className='list-card-price'>AED {props.price}</h3>
                            <p>{props.describe}</p>
                            <p className='list-address'>{props.locate}</p>
                            <div className='list-amenities'>
                                    <p className=''><BedOutlinedIcon/>{props.beds}</p>
                                    <p className=''><BathtubOutlinedIcon/>{props.bath}</p>
                                    <p className=''><SquareFootIcon/>{props.size} sqft</p>
                            </div>
                        </div>
                            
                    </div>
    </div>
  )
}

export default ListCards
