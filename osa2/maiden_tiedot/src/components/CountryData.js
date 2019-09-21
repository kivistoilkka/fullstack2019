import React from 'react'

const CountryData = (props) => {
    const listLanguages = () => props.country.languages.map(language =>
      <li key={language.name}>{language.name}</li>)
  
    return (
      <div>
            <h1>{props.country.name}</h1>
        <div>
          capital {props.country.capital}
        </div>
        <div>
          population {props.country.population}
        </div>
        <div>
          <h2>languages</h2>
          <ul>
            {listLanguages()}
          </ul>
        </div>
        <img src={props.country.flag}
          width="15%" height="15%"
          alt={`flag of ${props.country.name}`}
        />
      </div>
    )
}

export default CountryData