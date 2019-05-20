import React, { useState, useEffect } from 'react';
import axios from 'axios'

const Language = ({ name }) => {
  return (
    <div>
      <li>{name}</li>
    </div>

  )
}
const Languages = ({ languages }) => {
  //console.log(languages[0])
  return (
    languages.map(l =>
      <Language key={l.name} name={l.name} />)
  )
}

const Country = ({ name }) => {
  return (
    <div>
      <p>{name}</p>
    </div>
  )
}

const Weather = ({ tempC, windKph, windDir }) => {
  return (
    <div>
      <h3>temperature</h3>
      <p>{tempC} Celsius</p>

      <h3>wind</h3>
      <p>{windKph} KPH direction {windDir}</p>

    </div>
  )
}

const CountryWithDetail = ({ name, capital, population, languages, flag }) => {
  return (
    <div>
      <div>
        <h2>{name}</h2>
        <p>capital {capital}</p>
        <p>population {population}</p>
        <h3>languages:</h3>
        <Languages languages={languages} />
        <img src={flag} alt="" width="200" height="300" />
      </div>
      <div>
        <h2>Weather in {capital}</h2>
      </div>
    </div>
  )
}


const App = () => {
  const [countries, setCountries] = useState([])
  const [keyWord, setKeyWord] = useState([''])
  const [show, setShow] = useState(false)
  const [weather, setWeather] = useState([])
  const [capital, setCapital] = useState('Helsinki')
  const [showWeather, setShowWeather] = useState(false)

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  useEffect(() => {
    const address = `http://api.apixu.com/v1/current.json?key=3dd8415ec22e4a36939105617191905&q=${capital}`
    axios
      .get(address)
      .then(response => {
        setWeather(response.data)
        console.log(capital)
      })
  }, [capital])


  const countriesToShow = show
    ? countries.filter(c => c.name.toLowerCase().includes(keyWord.toLowerCase()))
    : countries

  const handleKeyWordChange = (event) => {
    const newWord = event.target.value
    //setCountriesToShow(countries.filter(c => c.name.toLowerCase().includes(newWord.toLowerCase())))
    const l = countries.filter(c => c.name.toLowerCase().includes(newWord.toLowerCase())).length
    if (l < 10) {
      setShow(true)
    }
    setKeyWord(newWord)
  }

  if (countriesToShow.length > 10) {
    return (
      <div>
        Find countries: <input value={keyWord} onChange={handleKeyWordChange} />
        <p>Too many matches, specify another filter</p>
      </div>
    )
  }
  const buttonClick = (cNow) => {
    setShowWeather(!showWeather)
    console.log(showWeather)
    setCapital(cNow)
    console.log(capital)
  }

  const capitalTemp = showWeather
    ? <Weather tempC={weather.current.temp_c} windKph={weather.current.wind_kph} windDir={weather.current.wind_dir} />
    : null

  if (countriesToShow.length === 1) {
    const c = countriesToShow[0]
    return (
      <div>
        Find countries: <input value={keyWord} onChange={handleKeyWordChange} />
        <CountryWithDetail key={c.name} name={c.name} capital={c.capital} population={c.population} languages={c.languages} flag={c.flag} />
        <button onClick={() => buttonClick(c.capital)}>{showWeather ? 'hide weather' : 'show weather'}</button>
        {capitalTemp}
      </div>

    )
  }
  return (
    <div>
      Find countries: <input value={keyWord} onChange={handleKeyWordChange} />
      {countriesToShow.map(
        c => <Country key={c.name} name={c.name} />
      )}
    </div>
  )

}

export default App;
