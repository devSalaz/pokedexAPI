import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { motion, AnimatePresence, AnimateSharedLayout } from "framer-motion";

//Import Components
import PokemonCard from "../components/PokemonCard";
import PokeDetail from "../components/PokeDetail";

//Import Utils
import { useLocation } from "react-router-dom";

//Import Icons
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import { CgPokemon } from "react-icons/cg";

import pokeBall from "../assets/images/pokeball-icon.png";

//Import Styles
import "../assets/styles/pokemonListStyles.css";

const PokemonList = () => {
  const location = useLocation();
  const pathId = location.pathname.split("/")[2];

  const [pokeDetail, setPokeDetail] = useState([]);
  const [detailIsLoading, setDetailIsLoading] = useState(true);

  let pokemonContainer = useRef(null);
  const [pokemons, setPokemons] = useState([]);
  const [pokemon, setPokemon] = useState([]);
  const [currentPageURL, setCurrentPageURL] = useState(
    "https://pokeapi.co/api/v2/pokemon"
  );
  const [prevPageURL, setPrevPageURL] = useState(null);
  const [nextPageURL, setNextPageURL] = useState(null);

  const goToPrev = () => {
    setCurrentPageURL(prevPageURL);
    setCount(count - 1);
  };

  function restar() {
    setCurrentPageURL(prevPageURL);
    setCount(count - 1);
  }

  const goToNext = () => {
    setCurrentPageURL(nextPageURL);
    setCount(count + 1);
  };

  const [isLoading, setIsLoading] = useState(true);

  const [count, setCount] = useState(0);

  useEffect(() => {
    setIsLoading(true);

    let cancel;
    axios
      .get(currentPageURL, {
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
      })
      .then((res) => {
        setPrevPageURL(res.data.previous);
        setNextPageURL(res.data.next);
        if (count > 42) {
          setNextPageURL(null);
        }

        setPokemons(res.data.results.map((p) => p));
        setIsLoading(false);
      });
    return () => cancel();
  }, [currentPageURL]);

  return (
    <motion.div>
      <AnimateSharedLayout type="switch">
        <AnimatePresence>
          {pathId && (
            <PokeDetail
              pokeDetail={pokeDetail}
              setPokeDetail={setPokeDetail}
              detailIsLoading={detailIsLoading}
              setDetailIsLoading={setDetailIsLoading}
            />
          )}
        </AnimatePresence>

        <div className="pokemonList">
          <div className="pokemonsContainer" ref={pokemonContainer}>
            <div className="ditto-container"></div>

            {isLoading ? (
              <div className="loading-container">
                <div className="pokemon-ball">
                  <div className="ball"></div>
                  <div className="line-ball"></div>
                </div>
              </div>
            ) : (
              <>
                <div className="title-container">
                  <h3 className="pokedex-title">Pokedex&nbsp;</h3>
                  <div className="pokeball-title">
                    <div className="red-bg"></div>
                    <div className="white-bg"></div>
                    <div className="line"></div>
                    <div className="ball"></div>
                  </div>
                </div>

                <div className="pokemonsCardsContainer">
                  {pokemons.map((p) => (
                    <PokemonCard
                      key={p.name}
                      url={p.url}
                      pokeDetail={pokeDetail}
                      setPokeDetail={setPokeDetail}
                      detailIsLoading={detailIsLoading}
                      setDetailIsLoading={setDetailIsLoading}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
          <div className="buttons-container">
            <div
              className={`prev-button ${prevPageURL ? "" : "disabled"}`}
              onClick={() => {
                window.scrollTo({
                  top: pokemonContainer.current.offsetTop,
                  behavior: "smooth",
                });
                setCount(count - 1);
                setCurrentPageURL(prevPageURL);
              }}
            >
              <GrFormPrevious className="icon-prev" size="1.75em" />
            </div>
            <div
              className={`next-button ${nextPageURL ? "" : "disabled"}`}
              onClick={() => {
                window.scrollTo({
                  top: pokemonContainer.current.offsetTop,
                  behavior: "smooth",
                });
                setCount(count + 1);
                setCurrentPageURL(nextPageURL);
              }}
            >
              <GrFormNext className="icon-next" size="1.75em" />
            </div>
          </div>
        </div>
      </AnimateSharedLayout>
      <div className="digglet-container"></div>
    </motion.div>
  );
};

export default PokemonList;
