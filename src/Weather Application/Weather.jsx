import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faCloud } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
function Weather() {
  let date = new Date();
  let formatDate = new Intl.DateTimeFormat("en-US").format(date);
  console.log(formatDate);

  const [weatherdata, setweatherdata] = useState(false);
  const [search, setSearch] = useState("Pune");

  let fetchApi = async () => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=90c37cd483119fc243fc2b35a4c0ce45`;
    const response = await fetch(url);
    const resJsonData = await response.json();
    // setweatherdata(resJsonData.main);
    setweatherdata(resJsonData);
  };

  useEffect(() => {
    fetchApi();
  }, []);

  const handleInputChange = (e) => {
    const valueImput = e.target.value;
    setSearch(valueImput);
  };
  const handleSubmit = () => {
    console.log("w");

    fetchApi();
  };

  return (
    <>
      <div className="main-section">
        <div className="main-1">
          <input
            type="text"
            placeholder="Enter Your City ...."
            // onChange={(event) => setSearch(event.target.value)}
            onChange={handleInputChange}
          />
          <button onClick={handleSubmit}> Click Me</button>
        </div>
        <div className="main-2">
          <div className="left">
            <div className="icon">
              <FontAwesomeIcon icon={faCloud} />
            </div>
            <span> {formatDate}</span>
          </div>

          {weatherdata ? (
            <>
              <div className="right">
                <h4>Today </h4>
                {weatherdata.name ? (
                  <h2>{weatherdata.name}</h2>
                ) : (
                  <h3 className="error">city not found</h3>
                )}

                {/* <h5>{Math.floor(weatherdata.temperature1)}°Cel</h5> */}
                {weatherdata.main ? (
                  <h5>{Math.floor(weatherdata.main.temp)} °Cel</h5>
                ) : null}
                {weatherdata.weather ? (
                  <h6>{weatherdata.weather[0].main}</h6>
                ) : null}
              </div>
            </>
          ) : (
            <span></span>
          )}
        </div>
      </div>
    </>
  );
}

export default Weather;
