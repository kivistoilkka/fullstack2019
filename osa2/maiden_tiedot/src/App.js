import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ListCountries from './components/ListCountries'
import CountryData from './components/CountryData'

const App = () => {
  const [countries, setCountries] = useState([])
  const [nameFilter, setNameFilter] = useState('')

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

  const showData = () => {
    const countriesToShow = countries.filter(country =>
      country.name
        .toLowerCase()
        .includes(nameFilter.toLowerCase()))

    if (countriesToShow.length > 10) {
      return (
        <div>Too many matches, specify another filter</div>
      )
    } else if (countriesToShow.length === 1) {
      return (
        <CountryData country={countriesToShow[0]} />
      )
    } else {
      return (
        <ListCountries countries={countriesToShow} />
      )
    }
  }
  
  return (
    <div>
      find countries <input value={nameFilter} onChange={handleFilterChange} />
      {showData()}
    </div>
  )
}

export default App