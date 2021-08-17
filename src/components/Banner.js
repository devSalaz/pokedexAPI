import React, { useState, useEffect } from "react";
//importa librarys
import axios from "axios";

const Banner = () => {
  const [pokemon, setPokemon] = useState([]);

  const [currentURL, setCurrentURL] = useState(
    "https://pokeapi.co/api/v2/pokemon"
  );

  const [prevURL, setPrevURL] = useState();
  const [nextURL, setNextURL] = useState();

  useEffect(() => {
    axios.get(currentURL).then((res) => {
      setPrevURL(res.data.prev);
      setNextURL(res.data.next);
      setPokemon(res.data.results.map((p) => <div>{p.name}</div>));
    });
  }, []);

  return (
    <div>
      {pokemon.map((name) => (
        <div key={name}>
          <h2>{name}</h2>
        </div>
      ))}
    </div>
  );
};

export default Banner;
