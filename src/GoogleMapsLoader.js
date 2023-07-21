import loadGoogleMapsAPI from 'load-google-maps-api';

const loadGoogleMaps = () => {
    return loadGoogleMapsAPI({
      // Add your Google Maps API key and any other configurations here
      key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
      libraries: ['places'],
    });
  };

export default loadGoogleMaps