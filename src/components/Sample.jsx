import React, { useState, useEffect } from 'react';
import '../App.css';
import Alert from './Alert';

export default function Sample() {
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cityName, setCityName] = useState("");
  const [cityText, setCityText] = useState("Mumbai");
  const [alert, setAlert] = useState("");

  useEffect(() => {
    const fetchWeather = () => {
      const proxyUrl = "https://cors-anywhere.herokuapp.com/";
      fetch(`http://api.weatherapi.com/v1/current.json?key=2ec1f9dfbc0f4e77b1953647241908&q=${cityText}&aqi=no`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          setInfo(data);
          setLoading(false);
        })
        .catch(error => {
          setError(error);
          setLoading(false);
        });
    };

    fetchWeather();
  }, [cityText]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handleOnChange = (event) => {
    setCityName(event.target.value);
  };

  const handleClick = () => {
    const cname = cityName || 'Mumbai';
    const proxyUrl = "https://cors-anywhere.herokuapp.com/";
    let url = `http://api.weatherapi.com/v1/current.json?key=2ec1f9dfbc0f4e77b1953647241908&q=${cityText}&aqi=no`;
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok'+response.statusText);
        }
        return response.json();
      })
      .then(data => {
        setInfo(data)
        setCityText(cname)
        const observationTime = data.current.last_updated
        showAlert(`Observation Time: ${observationTime}`)
      })
      .catch(error => {
        setError(error);
      });
  };

  const showAlert = (message) => {
    setAlert(message);
    setTimeout(() => {
      setAlert("");
    }, 10000);
  };

  return (
    <div>
      <Alert alert={alert} />
      <div className="container">
        <div className="input-group input-group-lg my-3">
          <input
            type="text"
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
          <button
            type="button"
            className="btn btn-danger btn-lg search-btn"
            style={{ width: '13rem', fontSize: '23px' }}
            onClick={handleClick}
          >
            Search
          </button>
        </div>
        <div style={{ justifyContent: 'center', display: 'flex', marginTop: '2rem', fontStyle: 'oblique', gap: '20px' }}>
          <div style={{ marginTop: '25px' }}>
            <h1 style={{ fontSize: '50px' }}><strong>{cityText}</strong></h1>
          </div>
          <div className="text-center" style={{ width: '110px', height: '110px' }}>
            <img src={info.current.condition.icon} className="rounded" alt="Weather icon" style={{ width: '100%', height: '100%' }} />
          </div>
        </div>
        <br />
        <h4 className='text-center'>Condition: <strong>{info.current.condition.text}</strong></h4>
        <div className="row my-5">
          <div className="col-md-4">
            <h3>Temperature</h3>
            <div className="card" style={{ width: '18rem' }}>
              <div className="card-body">
                <h5 className="card-title">{info.current.temp_c} °C</h5>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <h3>Wind speed</h3>
            <div className="card" style={{ width: '18rem' }}>
              <div className="card-body">
                <h5 className="card-title">{info.current.wind_kph} km/h</h5>
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
              <div className="card-body">
                <h5 className="card-title">{info.current.wind_dir}</h5>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <h3>UV Index</h3>
            <div className="card" style={{ width: '18rem' }}>
              <div className="card-body">
                <h5 className="card-title">{info.current.uv}</h5>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <h3>Visibility</h3>
            <div className="card" style={{ width: '18rem' }}>
              <div className="card-body">
                <h5 className="card-title">{info.current.vis_km} km</h5>
              </div>
            </div>
          </div>
        </div>
        <div className="row my-5">
          <div className="col-md-4">
            <h3>Precipitation</h3>
            <div className="card" style={{ width: '18rem' }}>
              <div className="card-body">
                <h5 className="card-title">{info.current.precip_mm} mm</h5>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <h3>Feelslike</h3>
            <div className="card" style={{ width: '18rem' }}>
              <div className="card-body">
                <h5 className="card-title">{info.current.feelslike_c} °C</h5>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <h3>Local time</h3>
            <div className="card" style={{ width: '18rem' }}>
              <div className="card-body">
                <h5 className="card-title">{info.location.localtime}</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
