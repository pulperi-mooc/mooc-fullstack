import React, { useState, useEffect } from 'react'
import axios from 'axios'

const FilterForm = ({filter, onChangeHandler}) => { 
  return ( 
    <div>
      find countries <input value={filter} onChange={onChangeHandler}/>
    </div>
  )
}

const Weather = ({weatherData}) => {
  console.log(weatherData)
  if (!weatherData) {
    return <></>
  }
  return (
    <div>
      <h3>{`Weather in ${weatherData.location.name}`}</h3>
      <div><span style={{fontWeight: "bold"}}>Temperature:</span>{` ${weatherData.current.temp_c} Celsius`}</div>
      <img src={weatherData.current.condition.icon} alt={weatherData.current.condition.text} />
      <div><span style={{fontWeight: "bold"}}>Wind:</span>{` ${weatherData.current.wind_mph} mph direction ${weatherData.current.wind_dir}`}</div>
    </div>
  )
}

const Country = ({country}) => {

  const [weatherData, setWeatherData] = useState(null)

  useEffect(() => {
    axios
      .get(`https://api.weatherapi.com/v1/current.json?q=${country.capital}&key=${process.env.REACT_APP_API_KEY}`)
      .then(response => {
        setWeatherData(response.data)
        console.log('Data received: ', response.data)
      })
  }, [])

  return (
    <div>
      <h1>{country.name}</h1>
      <div>Capital: {country.capital}</div>
      <div>Population: {country.population}</div>
      <h3>Languages:</h3>
      <ul>
        {country.languages.map((language) => <li key={language.name}>{language.name}</li>)}
      </ul>
      <img src={country.flags['png']} alt="Country flag" width="150px" />
      <Weather weatherData={weatherData} />
    </div>
  )
}

const CountryList = ({countries, filter, buttonClickHandler}) => {
  if (!filter) {
    return <div/>
  }
  const filterList = countries.filter((country) => country.name.toLowerCase().includes(filter.toLowerCase()))

  if (filterList.length > 10) {
    return <div>Too many matches, specify another filter</div>
  }

  const filterListNoPartials = filterList.filter((country) => country.name.toLowerCase() === filter.toLowerCase())
  
  if ((filterList.length === 1) || (filterListNoPartials.length === 1)) {
    return <Country showDetails={true} country={filterList[0]} />
  }
 
  return (
    filterList.map((country) => <div key={country.name}>{country.name} <button onClick={() => buttonClickHandler(country.name)}>show</button></div>)
  ) 
} 

const App = () => {

  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  const onFilterChangeHandler = (event) => setFilter(event.target.value)

  const showCountry = (country) => {
    const cp_countries = [...countries]

    cp_countries.forEach((c) => {
      c.show = c.name === country.name
    })
    setCountries(cp_countries)
  }

  useEffect(() => {
    axios
      .get('https://restcountries.com/v2/all?fields=name,capital,population,flags,languages')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  return (
    <div className="App">
      <FilterForm value={filter} onChangeHandler={onFilterChangeHandler}/>
      <CountryList countries={countries} filter={filter} buttonClickHandler={setFilter} />
    </div>
  )
}

export default App
