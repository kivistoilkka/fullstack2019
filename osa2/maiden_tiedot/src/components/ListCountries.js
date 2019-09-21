import React from 'react'

const ListCountries = (props) => {
    const handleClick = (country) => {
        props.setNameFilter(country)
    }
    
    return (
        props.countries.map(country =>
            <div key={country.name}>
              {country.name}
              <button onClick={() => handleClick(country.name)}>
                  show
                </button>
            </div>
        )
    )
}

export default ListCountries