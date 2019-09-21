import React from 'react'

const ListCountries = (props) => props.countries.map(country =>
    <div key={country.name}>
      {country.name}
    </div>
  )

export default ListCountries