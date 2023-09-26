import React from 'react'
import { useState } from 'react'
import { Drawer, TextField } from '@mui/material'
import { CloseOutlined, RemoveOutlined, HouseOutlined, ApartmentOutlined, HomeOutlined, VillaOutlined } from '@mui/icons-material'
import { useAppContext } from './AppContext'


const BottomUpFilterDrawer = ({open, close}) => {

{/*Manage state for the mobile filter menu */}
const [filterForm, setFilterForm] = useState({
    minPrice: '', maxPrice: '',
    numBeds: '', numBaths: '',
    propertyType: '', minSquareFoot: '',
    maxSquareFoot: '',
})
console.log(filterForm)


const updateFormChange = (event) => {
    const {name, value} = event.target
    setFilterForm({
        ...filterForm,
        [name]: value,
        
    })
}

const updateFilterBeds = (value) => {
    setFilterForm({
        ...filterForm,
        numBeds: value,
        
    })
}

const updateFilterBaths = (value) => {
    setFilterForm({
        ...filterForm,
        numBaths: value,
        
    })
}

const updateFilterProperty = (value) => {
    setFilterForm({
        ...filterForm,
        propertyType: value,
        
    })
}


console.log(filterForm)

    //update app context state
    

        const { setStateForm } = useAppContext()
        const { stateForm } = useAppContext()


    //on search button click, update app context state with local state values
    const searchClick = () => {
    setStateForm((prev) => {
        return{
            ...prev,
            minPrice: filterForm.minPrice,
            maxPrice: filterForm.maxPrice,
            numBeds: filterForm.numBeds,
            numBaths: filterForm.numBaths,
            homeStyle: filterForm.propertyType,
            minSquareFoot: filterForm.minSquareFoot,
            maxSquareFoot: filterForm.maxSquareFoot,
        }
    })
    close()
    console.log(stateForm)
    }

  return (
    <>
      
        <Drawer
            anchor='bottom'
            open={open}
            onClose={close}
            
        >
            {/*Filter drawer content */}
            <div className='drawer-content-mobile'>
                <div className="parent-filter">
                
                    <CloseOutlined onClick={close}/>
                    <div className="filter-header">
                    
                        <h4>Filters</h4>
                    </div>
                    
                </div>
                
                {/*Price filter */}
                <div className="price-filter">
                    <h4>Price Range</h4>
                    <div className="price-range">
                        <TextField id='minimum-price' label='Minimum' variant='outlined' type='number' sx={{width: '40vw'}} name='minPrice' value={filterForm.minPrice} onChange={updateFormChange}/>
                            <RemoveOutlined/>
                        <TextField id='maximum-price' label='Maximum' variant='outlined' type='number' sx={{width: '40vw'}} name='maxPrice' value={filterForm.maxPrice} onChange={updateFormChange}/>
                    </div>
                </div>
                <hr/>
                {/*Rooms and Beds */}
                <div className="rooms-beds">
                    <h4>Rooms and beds</h4>
                    <div className="rooms-beds-section-1">
                        <p style={{fontWeight: 'light'}}>Bedrooms</p>
                        <div className='bubble-selectors'>
                            <div className={filterForm.numBeds === '' ? 'bub-active' : 'bub'} onClick={() => updateFilterBeds('')} >Any</div>
                            <div className={filterForm.numBeds === 1 ? 'bub-num-active' : 'bub-num'} onClick={() => updateFilterBeds(1)}>1</div>
                            <div className={filterForm.numBeds === 2 ? 'bub-num-active' : 'bub-num'} onClick={() => updateFilterBeds(2)}>2</div>
                            <div className={filterForm.numBeds === 3 ? 'bub-num-active' : 'bub-num'} onClick={() => updateFilterBeds(3)}>3</div>
                            <div className={filterForm.numBeds === 4 ? 'bub-num-active' : 'bub-num'} onClick={() => updateFilterBeds(4)}>4</div>
                            <div className={filterForm.numBeds === 5 ? 'bub-num-active' : 'bub-num'} onClick={() => updateFilterBeds(5)}>5+</div>
                        </div>

                    </div>

                    <div className="rooms-beds-section-1">
                        <p style={{fontWeight: 'light'}}>Bathrooms</p>
                        <div className='bubble-selectors'>
                            <div className={filterForm.numBaths === '' ? 'bub-active' : 'bub'} onClick={() => updateFilterBaths('')}>Any</div>
                            <div className={filterForm.numBaths === 1 ? 'bub-num-active' : 'bub-num'} onClick={() => updateFilterBaths(1)}>1</div>
                            <div className={filterForm.numBaths === 2 ? 'bub-num-active' : 'bub-num'} onClick={() => updateFilterBaths(2)}>2</div>
                            <div className={filterForm.numBaths === 3 ? 'bub-num-active' : 'bub-num'} onClick={() => updateFilterBaths(3)}>3</div>
                            <div className={filterForm.numBaths === 4 ? 'bub-num-active' : 'bub-num'} onClick={() => updateFilterBaths(4)}>4</div>
                            <div className={filterForm.numBaths === 5 ? 'bub-num-active' : 'bub-num'} onClick={() => updateFilterBaths(5)}>5+</div>
                        </div>

                    </div>
                </div>

                <hr/>

                <div className="property-type-selector">
                    <h4>Property type</h4>
                    <div className="type-listings">
                        <div className={filterForm.propertyType === 'House' ? 'list-active' : 'list'} onClick={() => updateFilterProperty('House')}>
                            <HouseOutlined className='mui-iconStyle' sx={{fontSize: '2.0rem', color: filterForm.propertyType === 'House' ? 'white' : '#334044'}}/>
                            <p style={{fontSize: '1.2rem'}}>House</p>
                        </div>
                        <div className={filterForm.propertyType === 'Apartment' ? 'list-active' : 'list'} onClick={() => updateFilterProperty('Apartment')}>
                            <ApartmentOutlined sx={{fontSize: '2.0rem', color: filterForm.propertyType === 'Apartment' ? 'white' : '#334044'}}/>
                            <p style={{fontSize: '1.2rem'}}>Apartment</p>
                        </div>
                        <div className={filterForm.propertyType === 'Condo' ? 'list-active' : 'list'} onClick={() => updateFilterProperty('Condo')}>
                            <HomeOutlined sx={{fontSize: '2.0rem', color: filterForm.propertyType === 'Condo' ? 'white' : '#334044'}}/>
                            <p style={{fontSize: '1.2rem'}}>Condo</p>
                        </div>
                        <div className={filterForm.propertyType === 'Villa' ? 'list-active' : 'list'} onClick={() => updateFilterProperty('Villa')}>
                            <VillaOutlined sx={{fontSize: '2.0rem', color: filterForm.propertyType === 'Villa' ? 'white' : '#334044'}}/>
                            <p style={{fontSize: '1.2rem'}}>Villa</p>
                        </div>
                    </div>
                </div>

                <div className="price-filter">
                    <h4>Square foot</h4>
                    <div className="price-range">
                        <TextField id='minimum-footage' label='Minimum' variant='outlined' type='number' sx={{width: '40vw'}} name='minSquareFoot' value={filterForm.minSquareFoot} onChange={updateFormChange}/>
                            <RemoveOutlined/>
                        <TextField id='maximum-footage' label='Maximum' variant='outlined' type='number' sx={{width: '40vw'}} name='maxSquareFoot' value={filterForm.maxSquareFoot} onChange={updateFormChange}/>
                    </div>
                </div>

                
            </div>

            <div className="reset-filter">
                    <div className="clear">
                        <h4 style={{textDecoration: 'underline'}}>Clear all</h4>
                        <div className="search-mobile" onClick={() => {searchClick(close)}}>
                            Search
                        </div>
                    </div>
                </div>
        </Drawer>
            
    </>
  )
}

export default BottomUpFilterDrawer
