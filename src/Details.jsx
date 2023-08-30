import React from 'react'
import { useState } from 'react'
import {styles} from './styles.css'
import exterior from './assets/exterior.jpg'
import { ArrowBackIosNewOutlined, ArrowForwardIosOutlined, BathtubOutlined, BedOutlined, DirectionsCarFilledOutlined, LocationOnOutlined, SquareFootOutlined, ViewInArOutlined } from '@mui/icons-material'
import bedroom from './assets/bedroom.jpg'
import bathroom from './assets/bathroom.jpg'
import dining from './assets/dining.jpg'
import kitchen from './assets/kitchen.jpg'
import slide1 from './assets/slide1.jpg'
import slide2 from './assets/slide2.jpg'
import slide3 from './assets/slide3.jpg'
import slide4 from './assets/slide4.jpg'
import slide5 from './assets/slide5.jpg'

import myProperties from './properties'
import { useNavigate, useParams } from 'react-router-dom'



const Details = () => {
    //retrieve property id from URL parameter
    const navigate = useNavigate()
    const { propertyId } = useParams()

    //find selected property based on propertyID
    const selectedProperty = myProperties.find(property => property.id === parseInt(propertyId))
    
    //console.log(!selectedProperty,selectedProperty)
    console.log(selectedProperty)
    console.log(propertyId)

    //image slider static
    const slides = [
        {id: 1, img: exterior, title: "Main View"},
        {id: 2, img: slide1, title: "View 1"},
        {id: 3, img: slide2, title: "View 2"},
        {id: 4, img: slide3, title: "View 3"},
        {id: 5, img: slide4, title: "View 4"},
        {id: 6, img: slide5, title: "View 5"},
    ]

    //image index state
    const [currentIndex, setCurrentIndex] = useState(0)
    const currentSlide = selectedProperty.slides[currentIndex]

    //backward scroll
    function previousImage (){
        //check if index is equal to zero
        if (currentIndex >= 0) {
        setCurrentIndex (prevIndex => (
          (prevIndex - 1 + selectedProperty.slides.length) % selectedProperty.slides.length  
        ))
        }
    }

    //forward scroll
    function nextImage (){
        setCurrentIndex (prevIndex => (
            (prevIndex + 1) % selectedProperty.slides.length
        ))
    }

    //cycle to kitchen images
    function kitchenImages (){
        
    }

  return (
    <div className='details'>
      <div className='image-carousel'>
        {
            <img src={currentSlide.img} alt={currentSlide.title} className='details-image'/>   
        }

        
        <div className='details-ar'>
            <ViewInArOutlined sx={{fontSize: '32px'}}/>
        </div>
        <div className='arrow-backward' onClick={previousImage}>
            <ArrowBackIosNewOutlined
                
                sx={{
                    position: 'absolute',
                    zIndex: 3,
                    color: 'white',
                    fontSize: '50px',
                    display: 'flex',
                }}
                
            />
        </div>
        <div className='arrow-forward' onClick={nextImage}>
            <ArrowForwardIosOutlined
               sx={{
                zIndex: 3,
                color: 'white',
                fontSize: '50px',
                display: 'flex',
            }} 
            />
        </div>

        <div className='scroller'>  
            <div className='indicators'>
            {selectedProperty.slides.map((slide) => (
                <div
                key={slide.id}
                className={`indicator ${currentSlide.id === slide.id ? 'active' : ''}`}
                onClick={() => setCurrentIndex(slide.id - 1)}
                />
            ))}
            </div>
        </div>  
      </div>

      <div className='information'>
        <div className='details-description'>
            <h1>{selectedProperty.describe}</h1>
            <p className='details-address'><LocationOnOutlined sx={{fontSize: '24px'}}/>{selectedProperty.locate}</p>
            <p><span className='bold'>Description: </span>
                {selectedProperty.overview}
            </p>
            <div className='property-images'>
                <img src={selectedProperty.kitchen} alt="kitchen" className='image-box'/>
                <img src={selectedProperty.dining} alt="dining" className='image-box'/>
                <img src={selectedProperty.bedroom} alt="bedroom" className='image-box'/>
                <img src={selectedProperty.bathroom} alt="bathroom" className='image-box'/>
            </div>
        </div>
        <div className='details-info'>
            <div className='details-content'>
                <p className='details-overview'>Brief Overview</p>
                <p className='details-list'><span>Listed by: </span>Novvi Properties</p>
                <div className='details-amenities'>
                    <p className='details-amenity'><BedOutlined sx={{}}/>{selectedProperty.beds}</p>
                    <p className='details-amenity'><BathtubOutlined sx={{}}/>{selectedProperty.baths}</p>
                    <p className='details-amenity'><DirectionsCarFilledOutlined sx={{}}/>{selectedProperty.garage}</p>
                    <p className='details-amenity'><SquareFootOutlined sx={{}}/>{selectedProperty.size} sqft</p>
                </div>
                <div className='details-price'>
                    <h3>AED {selectedProperty.price}</h3>
                </div>
                <div className='details-contact'>
                    <div className='details-button'>
                        <p>Contact Agent</p>
                    </div>
                </div>
                
            </div>    
        </div>
      </div>
    </div>
  )
}

export default Details
