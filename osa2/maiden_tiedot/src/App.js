import React, { useState, useEffect } from 'react';
import axios from 'axios'

const ListCountries = (props) => props.countries.map(country =>
  <div key={country.name}>
    {country.name}
  </div>
)

const App = () => {
  const [countries, setCountries] = useState([])

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])
  
  return (
    <div>
      find countries <input />
      <ListCountries countries={countries} />
    </div>
  )
}

export default App;
