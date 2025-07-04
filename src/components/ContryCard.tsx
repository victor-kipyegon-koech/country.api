import React from "react";
import type { Country } from "../types/Country";


type Props = {
  country: Country;
};

const CountryCard: React.FC<Props> = ({ country }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded shadow p-4">
      <img
        src={country.flag}
        alt={country.name}
        className="w-full h-40 object-cover rounded"
      />
      <h2 className="text-lg font-semibold mt-2">{country.name}</h2>
      <p className="text-sm">Population: {country.population.toLocaleString()}</p>
      <p className="text-sm">Region: {country.region}</p>
      <p className="text-sm">Capital: {country.capital}</p>
    </div>
  );
};

export default CountryCard;
