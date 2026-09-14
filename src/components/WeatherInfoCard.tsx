import React from "react";

const WeatherInfoCard = ({ card, weatherInfo }) => {
  return (
    <div
      key={card.id}
      className="w-full h-50 bg-slate-800 border border-white rounded-md flex flex-col gap-3 px-3 py-7"
    >
      <h2>{card.title}</h2>
      <h1 className="text-lg">
        {weatherInfo}
        {card.sign}
      </h1>
    </div>
  );
};

export default WeatherInfoCard;
