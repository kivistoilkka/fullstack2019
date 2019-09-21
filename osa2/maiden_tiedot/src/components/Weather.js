import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = (props) => {
    const [temperature, setTemperature] = useState('')
    const [windSpeed, setWindSpeed] = useState('')
    const [windDir, setWindDir] = useState('')
    const [weatherIcons, setWeatherIcons] = useState([])
    const capital = props.capital
    
    useEffect(() => {
        axios
            .get('http://api.weatherstack.com/current', {
                access_key: "YOUR-API-KEY-HERE",
                query: capital})
            .then(response => {
                setTemperature(response.data.current.temperature)
                setWindSpeed(response.data.current.wind_speed)
                setWindDir(response.data.current.wind_dir)
                setWeatherIcons(response.data.current.weather_icons)
            }).catch(error => {
                console.log(error, 'Remember to set your own API key')
            })
        }, [capital])

    return (
        <div>
            <h2>Weather in {props.capital}</h2>
            <div>
                <b>temperature:</b> {temperature} Celsius
            </div>
            <div>
                {weatherIcons.map(icon => 
                    <img key={icon} src={icon} alt="Weather icon" />
                )}
            </div>
            <div>
            <b>wind:</b> {windSpeed} kph direction {windDir}
            </div>
        </div>
    )
}

export default Weather