import Search from "./Components/Search";
import Result from "./Components/Result";
import { useState } from "react";
import axios from "axios";

const App = () => {
  const API_KEY = `954c193a702f04e9524602ff1979fd98`;
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState([]);
  const [history, setHistory] = useState([]);
  const changeSearch = (value) => {
    setSearch(value);
  };

  const searchWeatherHandler = () => {
    if (search !== "") {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${API_KEY}&units=metric`
        )
        .then((response) => {
          if (history.indexOf(search) === -1) {
            setHistory([...history, search]);
          }
          setWeather(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const historySearchHandler = async (data) => {
    setSearch(data);
    if (data !== "") {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${data}&appid=${API_KEY}&units=metric`
        )
        .then((response) => {
          if (history.indexOf(data) === -1) {
            setHistory([...history, data]);
          }
          setWeather(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div className="max-w-[1240px] mx-auto mt-2 p-3">
      <Search
        searchData={search}
        eventHandler={changeSearch}
        searchWeather={searchWeatherHandler}
      />
      <Result
        weatherData={weather}
        historyData={history}
        historySearch={historySearchHandler}
      />
    </div>
  );
};

export default App;
