import { useState } from "react";
import Axios from "axios";

function App() {
  let [data, setData] = useState({});

  let [location, setLocation] = useState("");

  let myKey = YOUR_API_KEY; //API Key

  let url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${myKey}`;

  // 取得API JSON格式資料
  let searchLocation = (e) => {
    if (e.key === "Enter") {
      Axios.get(url)
        .then((response) => {
          console.log(response.data);
          setData(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div className="app">
      <div className="search">
        <input
          onChange={(event) => setLocation(event.target.value)}
          type="text"
          onKeyPress={searchLocation}
          placeholder="Enter Location"
        />
      </div>

      <div className="container">
        {data.name !== undefined && (
          <div className="top">
            <div className="city">
              <p className="bold">{data.name}</p>
            </div>
            <div className="temp">
              {data.main ? <h1>{data.main.temp}°F</h1> : null}
            </div>
            <div className="description">
              {data.weather ? <p>{data.weather[0].description}</p> : null}
            </div>
          </div>
        )}

        {data.name !== undefined && (
          <div className="bottom">
            <div className="feel">
              {data.main.feels_like ? (
                <p className="bold">{data.main.feels_like}</p>
              ) : null}
              <p>feel like</p>
            </div>
            <div className="humidity">
              {data.main.humidity ? (
                <p className="bold"> {data.main.humidity}</p>
              ) : null}

              <p>humidity</p>
            </div>
            <div className="windspeed">
              {data.wind.speed ? (
                <p className="bold">{data.wind.speed}</p>
              ) : null}

              <p>wind speed</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
