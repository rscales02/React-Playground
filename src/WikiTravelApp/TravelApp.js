import React from 'react'
import FetchAPI from './FetchAPI'

const GOOG_API_KEY = 'AIzaSyDpWzCLvib1MnqV42kKyI5yOe0vbwj0A4E'
const BASE_URL = 'https://www.google.com/maps/embed/v1/view?key='
const TravelApp = () => {
  return (
    <div>
      {/* <FetchAPI base={BASE_URL} key={GOOG_API_KEY} /> */}
      <iframe
        width="600"
        height="450"
        frameBorder="0"
        src="https://www.google.com/maps/embed/v1/place?key=AIzaSyDpWzCLvib1MnqV42kKyI5yOe0vbwj0A4E&q=Springffield+CO"
        allowFullcreen>
      </iframe>
    </div>
  )
}

export default TravelApp



// google maps api key = AIzaSyDpWzCLvib1MnqV42kKyI5yOe0vbwj0A4E