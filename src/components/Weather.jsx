import React, { useState, useEffect } from 'react'
import '../App.css'
import Alert from './Alert'
export default function Weather() {
  const [info, setInfo] = useState(null)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cityName, setCityName] = useState("")
  const [cityText, setCityText] = useState("Mumbai")
  useEffect(() => {
    fetch('http://api.weatherstack.com/current?access_key=11c4c78457993a674c97283cade6060f&query=Mumbai')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setInfo(data)
        setLoading(false)
        
      })
      .catch(error => {
        setError(error)
        setLoading(false)
      })

  }, [])
  
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error</div>;
  }
  const handleOnChange = (event) => {
    console.log("on change!")
    setCityName(event.target.value)
  }
  const handleClick = () => {
    const cname = document.getElementById('cityInput').value
    let url = `http://api.weatherstack.com/current?access_key=11c4c78457993a674c97283cade6060f&query=${cname}`
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setInfo(data)
        setLoading(false)
        setCityText(cname)
        setCityName(cname)
        const c=info.current.observation_time
        showAlert(c)
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      })
  }
  const [alert, setAlert] = useState("")
  const showAlert = (e) => {
    setAlert(e)
    setTimeout(() => {
      setAlert(" ")
    }, 10000);
  }
  return (
    <div>
      <Alert alert={alert}/>
      <div className="container">
        <div className="input-group input-group-lg my-3">
          <input type="text"
            className="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-lg"
            style={{ width: '160px', border: '1.5px solid black' }}
            placeholder="Type your city's name"
            value={cityName}
            onChange={handleOnChange}
            id='cityInput'
          />

        </div>
        <div style={{ justifyContent: 'center', display: 'flex' }}>
          <button type="button"
            className="btn btn-danger btn-lg search-btn"
            style={{ width: '13rem', fontSize: '23px' }}
            onClick={handleClick}>Search</button>
        </div>
        <div style={{ justifyContent: 'center', display: 'flex', marginTop: '2rem', fontStyle: 'oblique', gap: '20px' }}>
          <div style={{ marginTop: '25px' }}>
            <h1 style={{ fontSize: '50px' }}><strong>{cityText}</strong></h1>

          </div>
          <div className="text-center" style={{ width: '110px', height: '110px' }}>
            <img src={info.current.weather_icons[0]} className="rounded" alt="..." style={{ width: '100%', height: '100%' }} />
          </div>
        </div><br />
        <h4 className='text-center'>Condition : <strong>{info.current.weather_descriptions[0]} {info.current.observation_time}</strong></h4>
        <div className="row my-5">
          <div className="col-md-4">
            <h3>Temperature</h3>
            <div className="card" style={{ width: '18rem' }}>
              {/*<img src={info.current.condition.icon} className="card-img-top" alt="..." />*/}
              <div className="card-body">

                <h5 className="card-title">{info.current.temperature} °C</h5>

              </div>
            </div>
          </div>
          <div className="col-md-4">
            <h3>Wind speed</h3>
            <div className="card" style={{ width: '18rem' }}>

              <div className="card-body">
                <h5 className="card-title">{info.current.wind_speed} km/h</h5>
                <p className="card-text"></p>

              </div>
            </div>
          </div>
          <div className="col-md-4">
            <h3>Humidity</h3>
            <div className="card" style={{ width: '18rem' }}>
              <div className="card-body">
                <h5 className="card-title">{info.current.humidity} g/kg</h5>
              </div>
            </div>
          </div>
        </div>

        <div className="row my-5">
          <div className="col-md-4">
            <h3>Wind direction</h3>
            <div className="card" style={{ width: '18rem' }}>
              {/*<img src={info.current.condition.icon} className="card-img-top" alt="..." />*/}
              <div className="card-body">

                <h5 className="card-title">{info.current.wind_dir}</h5>

              </div>
            </div>
          </div>
          <div className="col-md-4">
            <h3>UV Index</h3>
            <div className="card" style={{ width: '18rem' }}>

              <div className="card-body">
                <h5 className="card-title">{info.current.uv_index}</h5>
                <p className="card-text"></p>

              </div>
            </div>
          </div>
          <div className="col-md-4">
            <h3>Visibility</h3>
            <div className="card" style={{ width: '18rem' }}>
              <div className="card-body">
                <h5 className="card-title">{info.current.visibility}</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}
