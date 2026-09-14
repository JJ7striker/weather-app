import { Search } from "lucide-react"
import { useState, useEffect } from "react"
import WeatherInfoCard from "./components/WeatherInfoCard";

function App() {
  const [search, setSearch] = useState("Castries");
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  const API_KEY = import.meta.env.VITE_API_KEY
  const BASE_URL = import.meta.env.VITE_API_URL;

  const date = new Date();

  const currentDay = date.getDate()

  const getWeatherData = async (name = "Castries") => {
    const url = `${BASE_URL}/data/2.5/weather?q=${name}&appid=${API_KEY}`
    setIsLoading(true)
    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data)
      setData(data);
    } catch(err) {
      console.log("Sorry, error fetching country data", err);
    }  finally {
      setIsLoading(false);
    }
  }

  const cardInfo = [
    {
      id: 1,
      title: "Temperature",
      sign: "°"
    },
    {
      id: 2,
      title: "Humidity",
      sign: "%"
    },
    {
      id: 3,
      title: "Wind",
      sign: "km/h"
    },
    {
      id: 4,
      title: "Precipitation",
      sign: "mm"
    },
  ]

  useEffect(() => {
    return () => getWeatherData(search);
  }, [search])

  return (
    <div className='w-full min-h-screen bg-slate-900 px-4 py-5'>
      <h2 className="text-xl font-bold text-white pl-8">WeatherApp</h2>
      <h1 className="text-3xl md:text-5xl font-bold text-gray-100 text-center">How's the weather today</h1>

    {/* Search */}
      <div className="w-full flex items-center justify-center">
      <div className="w-full md:w-2/5 flex items-center justify-center gap-1 mt-10 bg-gray-600 h-10 px-3 rounded-sm">
        <Search className="text-white" />
        <input type="text" className="flex-1 h-full py-2 px-5 outline-0 tracking-wide border-0 text-white text-lg" placeholder="Search for cities.." onChange={(e) => setSearch(e.target.value)} value={search} />
      </div>
      </div>

      {/* Cards */}
    <div className="w-full h-auto flex items-center justify-center flex-col md:flex-row md:px-10 mt-10">
      <div className="flex-1 w-full flex items-center justify-between text-white">
        {/* Card 1 */}
        <div className="w-full flex flex-col items-start gap-6">
          {/* City Info */}
        <div className="flex md:flex-row gap-5 md:gap-10 justify-between w-full md:px-6 px-4 py-10 md:py-5 bg-blue-700 rounded-sm">
          <div className="flex flex-col gap-2 items-start">
          <h2 className="text-2xl md:3xl">{data?.name}</h2>
          <p className="text-lg">{currentDay}</p>
          </div>

          <h1 className="text-5xl md:text-7xl italic">20°</h1>
        </div>

      {/* Weather Info */}
        <div className="w-full grid grid-cols-2 md:grid-cols-4 px-4 gap-6">
          <WeatherInfoCard card={cardInfo[0]} weatherInfo={data?.main.temp} />
          <WeatherInfoCard card={cardInfo[1]} weatherInfo={data?.main.humidity} />
          <WeatherInfoCard card={cardInfo[2]} weatherInfo={data?.wind.speed} />
          <WeatherInfoCard card={cardInfo[3]} weatherInfo={data?.main.temp} />
        </div>

        </div>

        {/*  */}
      </div>

      <div className="flex-1"></div>
    </div>


    </div>
  )
}

export default App
