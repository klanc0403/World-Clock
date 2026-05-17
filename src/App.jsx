const { useEffect, useMemo, useState } = React

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

function getOrdinalSuffix(day) {
  if (day > 3 && day < 21) {
    return 'th'
  }

  switch (day % 10) {
    case 1:
      return 'st'
    case 2:
      return 'nd'
    case 3:
      return 'rd'
    default:
      return 'th'
  }
}

function formatDate(date, timeZone) {
  const parts = new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    month: 'long',
    timeZone,
    year: 'numeric',
  }).formatToParts(date)

  const month = parts.find((part) => part.type === 'month').value
  const day = Number(parts.find((part) => part.type === 'day').value)
  const year = parts.find((part) => part.type === 'year').value

  return `${month} ${day}${getOrdinalSuffix(day)} ${year}`
}

function formatTime(date, timeZone) {
  const formattedTime = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    hour12: true,
    minute: '2-digit',
    second: '2-digit',
    timeZone,
  }).format(date)

  const [time, period] = formattedTime.split(' ')

  return { period, time }
}

function CityClock({ label, timeZone, now }) {
  const date = useMemo(() => formatDate(now, timeZone), [now, timeZone])
  const { period, time } = useMemo(
    () => formatTime(now, timeZone),
    [now, timeZone],
  )

  return (
    <div className="city">
      <div>
        <h2>{label}</h2>
        <div className="date">{date}</div>
      </div>
      <div className="time">
        {time} <small>{period}</small>
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
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      }
    }

    return selectableCities.find((city) => city.timeZone === selectedTimeZone)
  }, [selectedTimeZone])

  const visibleCities = selectedCity ? [selectedCity] : defaultCities

  return (
    <React.Fragment>
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
    </React.Fragment>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />)
