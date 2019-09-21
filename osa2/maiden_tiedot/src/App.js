import React, { useState, useEffect } from 'react';
import axios from 'axios'

const ListCountries = (props) => props.countries.map(country =>
  <div key={country.name}>
    {country.name}
  </div>
)

const App = () => {
  const [countries, setCountries] = useState([])
  const [nameFilter, setNameFilter] = useState('')

  const showData = () => {
    const countriesToShow = countries.filter(country =>
      country.name
        .toLowerCase()
        .includes(nameFilter.toLowerCase()))

    if (countriesToShow.length > 10) {
      return(
        <div>Too many matches, specify another filter</div>
      )
    } else {
      return (
        <ListCountries countries={countriesToShow} />
      )
    }
  }

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleFilterChange = (event) => {
    setNameFilter(event.target.value)
  }
  
  return (
    <div>
      find countries <input value={nameFilter} onChange={handleFilterChange} />
      {showData()}
    </div>
  )
}

export default App;
