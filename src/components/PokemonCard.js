import axios from "axios";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

//Import Styles
import "../assets/styles/pokemonCardStyles.css";

import "../components/utils/cardClassnames";

import grassIcon from "../assets/images/type-icons/grass.svg";
import fireIcon from "../assets/images/type-icons/fire.svg";
import waterIcon from "../assets/images/type-icons/water.svg";
import electricIcon from "../assets/images/type-icons/electric.svg";
import groundIcon from "../assets/images/type-icons/ground.svg";
import rockIcon from "../assets/images/type-icons/rock.svg";
import ghostIcon from "../assets/images/type-icons/ghost.svg";
import fairyIcon from "../assets/images/type-icons/fairy.svg";
import fightingIcon from "../assets/images/type-icons/fighting.svg";
import flyingIcon from "../assets/images/type-icons/flying.svg";
import dragonIcon from "../assets/images/type-icons/dragon.svg";
import darkIcon from "../assets/images/type-icons/dark.svg";
import iceIcon from "../assets/images/type-icons/ice.svg";
import psychicIcon from "../assets/images/type-icons/psychic.svg";
import poisonIcon from "../assets/images/type-icons/poison.svg";
import steelIcon from "../assets/images/type-icons/steel.svg";
import normalIcon from "../assets/images/type-icons/normal.svg";

import bugIcon from "../assets/images/type-icons/bug.svg";

const PokemonCard = ({
  url,
  pokeDetail,
  setPokeDetail,
  detailIsLoading,
  setDetailIsLoading,
}) => {
  const [pokemonCard, setPokemonCard] = useState([]);

  function padLeadingZeros(num, size) {
    var s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
  }

  function defineIcon(type) {
    switch (type) {
      case "grass":
        return grassIcon;
        break;
      case "water":
        return waterIcon;
        break;

      case "electric":
        return electricIcon;
        break;

      case "ground":
        return groundIcon;
        break;

      case "rock":
        return rockIcon;
        break;

      case "fire":
        return fireIcon;
        break;

      case "fairy":
        return fairyIcon;
        break;

      case "fighting":
        return fightingIcon;
        break;

      case "flying":
        return flyingIcon;
        break;

      case "dragon":
        return dragonIcon;
        break;

      case "dark":
        return darkIcon;
        break;

      case "ice":
        return iceIcon;
        break;

      case "psychic":
        return psychicIcon;
        break;

      case "poison":
        return poisonIcon;
        break;

      case "steel":
        return steelIcon;
        break;

      case "bug":
        return bugIcon;
        break;

      case "ghost":
        return ghostIcon;
        break;

      case "normal":
        return normalIcon;
        break;

      default:
        return normalIcon;
        break;
    }
  }

  const [isLoading, setIsLoading] = useState(true);

  let [type, setType] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    axios.get(url).then((res) => {
      setPokemonCard(res.data);
      setIsLoading(false);
      setType(res.data.name);
    });
  }, []);

  return (
    <>
      {isLoading ? (
        <div></div>
      ) : (
        <StyledPokeCard
          layoutId={pokemonCard.name}
          className={`pokemonCard ${pokemonCard.types[0].type.name}`}
          onClick={() => {
            setPokeDetail(pokemonCard);
            setDetailIsLoading(false);
            document.body.style.overflow = "hidden";
          }}
        >
          <Link to={`/pokemon/${pokemonCard.name}`}>
            <div className={`fill-bg ${pokemonCard.types[0].type.name}`}></div>

            <div className="top-container">
              <div className="description-container">
                <div className="name-container">
                  <motion.div
                    layoutId={`title ${pokemonCard.name}`}
                    className="name"
                  >
                    {pokemonCard.name}
                  </motion.div>
                </div>
                <div className="number-container">
                  <motion.div className="number">{`#${padLeadingZeros(
                    pokemonCard.id,
                    3
                  )}`}</motion.div>
                </div>
              </div>
              <div className="image-container">
                <motion.img
                  layoutId={`img ${pokemonCard.name}`}
                  className="pokemon-img"
                  alt="pokemon"
                  src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${padLeadingZeros(
                    pokemonCard.id,
                    3
                  )}.png`}
                ></motion.img>
                <div className="circle-bg"></div>
              </div>
              <motion.div className="types-container">
                {pokemonCard.types.map((type) => (
                  <div
                    className={`type-tab ${type.type.name}`}
                    key={type.type.name}
                  >
                    <span>
                      <img src={defineIcon(type.type.name)} />
                    </span>
                    &nbsp;{type.type.name}
                  </div>
                ))}
              </motion.div>
            </div>
          </Link>
        </StyledPokeCard>
      )}
    </>
  );
};

const StyledPokeCard = styled(motion.div)`
  margin: 40px 20px;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 4% 0%;
  min-width: 232px;
  max-width: 250px;
  border-radius: 25px;
  transform: translateY(0%);
  transition: transform 300ms ease, border-color 500ms;
  will-change: transform;
  z-index: 2;
  text-decoration: none;

  &:after {
    content: " ";
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    opacity: 1;
    transition: opacity 500ms;
    border-radius: 25px;
    box-shadow: 10px 10px 10px rgba(154, 160, 185, 0.25),
      1px 6px 8px rgba(0, 0, 0, 0.23);
  }

  &:before {
    opacity: 0;
    transition: opacity 800ms ease-out;
  }

  &:hover {
    transform: translateY(-15px);
  }

  &:hover:after {
    opacity: 0;
  }

  &:hover:before {
    opacity: 1;
  }

  a {
    text-decoration: none;
  }

  .top-container {
  }

  .description-container {
    display: flex;
    padding: 0 5%;
    justify-content: space-around;
    align-items: center;
  }

  .fill-bg {
    position: absolute;

    left: 0;
    top: 0;
    width: 100%;
    z-index: 1;
    height: 100%;
    border-radius: 25px;
  }

  .image-container {
    width: 100%;
    position: relative;
    display: flex;
    justify-content: center;
    .pokemon-img {
      width: 160px;
      position: relative;
      z-index: 2;
    }
    .circle-bg {
      position: absolute;
      background-color: rgba(255, 255, 255, 0.25);
      border-radius: 50%;
      width: 130px;
      height: 130px;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      margin: auto;
      z-index: 1;
    }
  }

  .types-container {
    position: relative;
    z-index: 5;
    display: flex;
    justify-content: center;
    padding: 5px 5%;

    .type-tab {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 7px 15px;
      color: white;
      border-radius: 20px;
      margin: 10px 8px;
      text-transform: capitalize;
      font-family: "Lato", sans-serif;
      font-weight: 700;
      line-height: 100%;
      font-size: 0.92rem;
      box-shadow: 5px 5px 10px rgba(154, 160, 185, 0.02),
        -5px -5px 10px rgba(0, 0, 0, 0.05);
      opacity: 1;
      cursor: pointer;
      transition: opacity 400ms;
      &:hover {
        opacity: 0.85;
      }

      span img {
        width: 13px;
      }
    }
  }

  .number-container {
    width: fit-content;
    display: flex;
    justify-content: center;
    margin: 5px 0px;
    .number {
      background-color: rgba(255, 255, 255, 0.2);
      padding: 7px 15px;
      border-radius: 20px;
      font-size: 0.8rem;
      font-family: "Lato", sans-serif;
      font-weight: 500;
      color: white;
      border: 1.5px solid rgba(255, 255, 255, 0.5);
      box-shadow: 4px 6px 15px rgba(0, 0, 0, 0.1);
      text-align: center;
      position: relative;
      z-index: 2;
    }
  }

  .name-container {
    width: fit-content;
    display: flex;
    justify-content: center;
    .name {
      text-transform: capitalize;
      font-size: 1.4rem;
      font-family: "Lato", sans-serif;
      font-weight: 700;
      line-height: 135%;
      color: white;
      text-align: center;
      position: relative;
      z-index: 2;
    }
  }

  @media (max-width: 1600px) {
    min-width: 242px;
    min-height: 341px;
    margin: 40px 12px;
  }

  @media (max-width: 1024px) {
    min-width: 196px;
    min-height: 294px;
  }

  @media (max-width: 767px) {
    min-width: 220px;
    min-height: auto;
    padding: 10% 0%;
    margin: 25px 12px;

    .name-container .name {
      font-size: 1.5rem;
    }

    .number-container .number {
      font-size: 1rem;
    }

    .types-container .type-tab {
      font-size: 1rem;
    }
  }
`;
export default PokemonCard;
