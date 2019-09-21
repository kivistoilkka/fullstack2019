import React, { useState, useEffect } from 'react';
import axios from 'axios'

const App = () => {
  const [countries, setCountries] = useState([])

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const ListCountries = () => countries.map(country =>
    <div key={country.name}>
      {country.name}
    </div>
  )
  
  return (
    <div>
      find countries <input />
      <ListCountries />
    </div>
  )
}

export default App;
