import { useEffect, useMemo, useState } from 'react'
import moment from 'moment-timezone/builds/moment-timezone-with-data-10-year-range'
import './App.css'

const defaultCities = [
  {
    label: 'San Francisco🌉',
    timeZone: 'America/Los_Angeles',
  },
  {
    label: 'London 🇬🇧',
    timeZone: 'Europe/London',
  },
  {
    label: 'Seoul🇰🇷',
    timeZone: 'Asia/Seoul',
  },
]

const selectableCities = [
  {
    label: 'New York🗽',
    timeZone: 'America/New_York',
  },
  {
    label: 'Paris🇫🇷',
    timeZone: 'Europe/Paris',
  },
  {
    label: 'Sydney🇦🇺',
    timeZone: 'Australia/Sydney',
  },
  {
    label: 'Tokyo🇯🇵',
    timeZone: 'Asia/Tokyo',
  },
]

function CityClock({ label, timeZone, now }) {
  const cityTime = useMemo(() => moment(now).tz(timeZone), [now, timeZone])

  return (
    <div className="city">
      <div>
        <h2>{label}</h2>
        <div className="date">{cityTime.format('MMMM Do YYYY')}</div>
      </div>
      <div className="time">
        {cityTime.format('h:mm:ss')} <small>{cityTime.format('A')}</small>
      </div>
    </div>
  )
}

function App() {
  const [now, setNow] = useState(() => new Date())
  const [selectedTimeZone, setSelectedTimeZone] = useState('select')

  useEffect(() => {
    const timer = window.setInterval(() => {
      setNow(new Date())
    }, 1000)

    return () => window.clearInterval(timer)
  }, [])

  const selectedCity = useMemo(() => {
    if (selectedTimeZone === 'select') {
      return null
    }

    if (selectedTimeZone === 'current') {
      return {
        label: 'My Current Location',
        timeZone: moment.tz.guess(),
      }
    }

    return selectableCities.find((city) => city.timeZone === selectedTimeZone)
  }, [selectedTimeZone])

  const visibleCities = selectedCity ? [selectedCity] : defaultCities

  return (
    <>
      <div className="container">
        <h1>World Clock</h1>

        <main>
          <label htmlFor="city">Select a city to view its current time.</label>

          <select
            className="city-select"
            id="city"
            value={selectedTimeZone}
            onChange={(event) => setSelectedTimeZone(event.target.value)}
          >
            <option value="select">Select a city...</option>
            <option value="current">My current location</option>
            {selectableCities.map((city) => (
              <option key={city.timeZone} value={city.timeZone}>
                {city.label}
              </option>
            ))}
          </select>

          <div id={selectedCity ? 'selected-city' : 'cities'}>
            {visibleCities.map((city) => (
              <CityClock
                key={city.timeZone}
                label={city.label}
                timeZone={city.timeZone}
                now={now}
              />
            ))}
          </div>
        </main>
      </div>

      <footer>
        This project was coded by Kelly Lançon, is hosted on{' '}
        <a
          href="https://klanc0403.github.io/World-Clock/"
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </a>
        .
      </footer>
    </>
  )
}

export default App
