import React, {createContext, useContext, useState} from 'react'

const AppContext = createContext()

export function AppContextProvider({children}){
    const [stateForm, setStateForm] = useState({
        location: '',
        saleType: 'Buy',
        latitude: '',
        longitude: '',
        homeStyle: '',
        numBeds: '',
        numBaths: '',
        pricing: '',
        minPrice: '',
        maxPrice: '',
        minSquareFoot: '',
        maxSquareFoot: '', 
    })

    console.log(stateForm)
    return (
        <AppContext.Provider value={{stateForm, setStateForm}}>
            {children}    
        </AppContext.Provider>
    )
}

export function useAppContext(){
    return useContext(AppContext)
}
