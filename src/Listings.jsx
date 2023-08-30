import React, { useState, useRef } from 'react'
import {styles} from './styles.css'
import Card from './Card'
import ListCards from './ListCards'
import Buy from './Buy'
import myProperties from './properties'
import { Fab, colors } from '@mui/material'
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material'
import {useMediaQuery} from '@mui/material'



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

  const propertyMobile = myProperties.map((th) => {
    return <ListCards
        key={th.id}
        props={th}
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

 //create responsive design
const isDesktop = useMediaQuery('(min-width:770px)');
const isTablet = useMediaQuery('(min-width:500px) and (max-width:770px)');
const isMobile = useMediaQuery('(max-width:500px)')


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
        {/*Desktop Version*/
          isDesktop && (
          <div className="card-carousel-wrap">
            <div className='back-scroll' onClick={handleScrollLeft}>
                    <div className='backward'>
                        <Fab aria-label='left-scroll'>
                            <ArrowBackIos
                                sx={{
                                    zIndex: 20,
                                    alignItems: 'center'
                                }}
                            />
                        </Fab>
                      </div>
              </div>
                      
              <div className='card-carousel' ref={containerRef}>
                  <div className='card-parent'>
                    <div className='card'>
                      
                      {property}
                    
                    </div>
                  </div>  
              </div>


              <div className='forward-scroll' onClick={handleScrollRight}>
              <div className='forward'>
                    <Fab aria-label='right-scroll'>
                        <ArrowForwardIos
                            sx={{
                                zIndex: 20
                            }}
                        />
                    </Fab>
              </div> 
          </div>
        
        </div>)}

        {
          /*Tablet Version*/
          isTablet && (
            <div className="card-carousel-wrap-tablet">
                <div className='back-scroll' onClick={handleScrollLeft}>
                    <div className='backward'>
                        <Fab aria-label='left-scroll'>
                            <ArrowBackIos
                                sx={{
                                    zIndex: 20,
                                    alignItems: 'center'
                                }}
                            />
                        </Fab>
                      </div>
              </div>
              

              <div className='card-carousel-tablet' ref={containerRef}>
                  <div className='card-parent-tablet'>
                    <div className='card-tablet'>
                      
                      {propertyMobile}
                    
                    </div>
                  </div>  
              </div>


              <div className='forward-scroll' onClick={handleScrollRight}>
                <div className='forward'>
                      <Fab aria-label='right-scroll'>
                          <ArrowForwardIos
                              sx={{
                                  zIndex: 20
                              }}
                          />
                      </Fab>
                </div> 
              </div>

            </div>
          )
        }




        {
          /*Mobile Version*/
          isMobile && (
            <div className="card-carousel-wrap-tablet">
                <div className='back-scroll' onClick={handleScrollLeft}>
                    <div className='backward'>
                        <Fab aria-label='left-scroll'>
                            <ArrowBackIos
                                sx={{
                                    zIndex: 20,
                                    alignItems: 'center'
                                }}
                            />
                        </Fab>
                      </div>
              </div>
              

              <div className='card-carousel-mobile' ref={containerRef}>
                  <div className='card-parent-mobile'>
                    <div className='card-mobile'>
                      
                      {propertyMobile}
                    
                    </div>
                  </div>  
              </div>


              <div className='forward-scroll' onClick={handleScrollRight}>
                <div className='forward'>
                      <Fab aria-label='right-scroll'>
                          <ArrowForwardIos
                              sx={{
                                  zIndex: 20
                              }}
                          />
                      </Fab>
                </div> 
              </div>

            </div>
          )
        }
        
    </div>
  )
}

export default Listings
