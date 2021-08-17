import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { motion } from "framer-motion";

import { useHistory } from "react-router-dom";

import axios from "axios";
import styled from "styled-components";

import PokeIcon from "../assets/images/poke-prueba2.svg";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { CgPokemon } from "react-icons/cg";

import { BsFillXCircleFill } from "react-icons/bs";

import { FaCheck, FaTimesCircle, FaRegTimesCircle } from "react-icons/fa";

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

import "../assets/styles/pokeDetail.css";

const PokeDetail = ({
  pokeDetail,
  setPokeDetail,
  detailIsLoading,
  setDetailIsLoading,
}) => {
  const [stateTab, setStateTab] = useState(1);

  const [pokeInfo, setPokeInfo] = useState([]);

  const history = useHistory();

  let [pokeInfoLoading, setPokeInfoLoading] = useState(true);

  const currentLinkInfo = `https://pokeapi.co/api/v2/pokemon-species/${pokeDetail.id}`;

  useEffect(() => {
    setPokeInfoLoading(true);
    if (!detailIsLoading) {
      axios.get(currentLinkInfo).then((res) => {
        setPokeInfo(res.data);
        setPokeInfoLoading(false);
      });
    }
  }, [detailIsLoading]);

  function feetToMeters(valNum) {
    return (valNum / 3.2808).toFixed(3);
  }

  function padLeadingZeros(num, size) {
    var s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
  }

  const ReturnToList = (e) => {
    const element = e.target;
    if (element.classList.contains("return") || element.tagName === "path") {
      document.body.style.overflow = "auto";
      history.push("/");
    }
  };

  function defineIcon(type) {
    switch (type) {
      case "grass":
        return grassIcon;
        break;

      case "plant":
        return grassIcon;
        break;

      case "water":
        return waterIcon;
        break;

      case "water1":
        return waterIcon;
        break;

      case "water2":
        return waterIcon;
        break;

      case "water3":
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

      case "mineral":
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

      case "ghost":
        return ghostIcon;
        break;

      case "bug":
        return bugIcon;
        break;

      case "normal":
        return normalIcon;
        break;

      default:
        return normalIcon;
        break;
    }
  }

  return (
    <motion.div>
      {detailIsLoading ? (
        <div>Not loaded Detail</div>
      ) : (
        <motion.div
          className={`pokeDetail-container ${pokeDetail.types[0].type.name} return`}
          onClick={ReturnToList}
        >
          <img
            src={PokeIcon}
            className="pokeball-icon-white"
            alt="pokeball-icon-white"
          />
          <motion.div className="pokeDetail-card" layoutId={pokeDetail.name}>
            <div
              className={`pokeDetail-top-container ${pokeDetail.types[0].type.name}`}
            >
              <motion.div className="pokeDetail-ui-container">
                <Link to="/" onClick={ReturnToList} className="return">
                  <HiOutlineArrowNarrowLeft
                    className="return"
                    size="1.8rem"
                    onClick={ReturnToList}
                  />
                </Link>
                <CgPokemon size="2rem" />
              </motion.div>
              <div className="pokeDetail-title-container">
                <motion.div
                  layoutId={`title ${pokeDetail.name}`}
                  className="titleName"
                >
                  {pokeDetail.name}
                </motion.div>
                <motion.div
                  layoutId={`number ${pokeDetail.name}`}
                  className="number"
                >{`#${padLeadingZeros(pokeDetail.id, 3)}`}</motion.div>
              </div>
              <motion.div className="pokeDetail-types-container">
                {pokeDetail.types.map((type) => (
                  <motion.div
                    className={`pokeDetail-type-tab ${type.type.name}`}
                    key={type.type.name}
                  >
                    <span>
                      <img src={defineIcon(type.type.name)} />
                    </span>
                    &nbsp;{type.type.name}
                  </motion.div>
                ))}
              </motion.div>
              <div className="pokeDetail-img-container">
                <motion.img
                  layoutId={`img ${pokeDetail.name}`}
                  className="pokeDetail-img"
                  alt="pokedetail-card-img"
                  src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${padLeadingZeros(
                    pokeDetail.id,
                    3
                  )}.png`}
                />
              </div>
            </div>
            <motion.div className="pokeDetail-info-container">
              <div className="pokeDetail-tabsInfo-container">
                <div
                  className={
                    stateTab === 1
                      ? `tabInfo active ${pokeDetail.types[0].type.name}`
                      : "tabInfo"
                  }
                  onClick={() => setStateTab(1)}
                >
                  <h4>About</h4>
                </div>
                <div
                  className={
                    stateTab === 2
                      ? `tabInfo active ${pokeDetail.types[0].type.name}`
                      : "tabInfo"
                  }
                  onClick={() => setStateTab(2)}
                >
                  <h4>Base Stats</h4>
                </div>
                <div
                  className={
                    stateTab === 3
                      ? `tabInfo active ${pokeDetail.types[0].type.name}`
                      : "tabInfo"
                  }
                  onClick={() => setStateTab(3)}
                >
                  <h4>Info</h4>
                </div>
                <div
                  className={
                    stateTab === 4
                      ? `tabInfo active ${pokeDetail.types[0].type.name}`
                      : "tabInfo"
                  }
                  onClick={() => setStateTab(4)}
                >
                  <h4>Sprites</h4>
                </div>
              </div>

              {pokeInfoLoading ? (
                <div
                  className={`pokeInfo-notLoaded ${pokeDetail.types[0].type.name}`}
                >
                  <div className="ball"></div>
                  <div className="line"></div>
                </div>
              ) : (
                <div className="content-info-container">
                  <div
                    className={
                      stateTab === 1 ? "content-about active" : "content-about"
                    }
                  >
                    <div className="about-container">
                      <div className="subtitle-container">
                        <p className="subtitle">Base Experience</p>
                        <p className="description">
                          {pokeDetail.base_experience}
                        </p>
                      </div>
                      <div className="subtitle-container">
                        <p className="subtitle">Height</p>
                        <p className="description">
                          {feetToMeters(pokeDetail.height)}m
                        </p>
                      </div>
                      <div className="subtitle-container">
                        <p className="subtitle">Weight</p>
                        <p className="description">{pokeDetail.weight}lbs</p>
                      </div>
                      <div className="subtitle-container">
                        <p className="subtitle">Growth Rate</p>
                        <p className="description">
                          {pokeInfo.growth_rate.name}
                        </p>
                      </div>
                      <div className="subtitle-container">
                        <p className="subtitle">Shape</p>
                        <p className="description">{pokeInfo.shape.name}</p>
                      </div>
                      <div className="subtitle-container">
                        <p className="subtitle">Capture Rate</p>
                        <p className="description">{pokeInfo.capture_rate}</p>
                      </div>
                      <div className="subtitle-container">
                        <p className="subtitle">Generation</p>
                        <p className="description">
                          {pokeInfo.generation.name}
                        </p>
                      </div>

                      {pokeInfo.habitat ? (
                        <div className="subtitle-container">
                          <p className="subtitle">Habitat</p>
                          <p className="description">{pokeInfo.habitat.name}</p>
                        </div>
                      ) : (
                        <>Null</>
                      )}

                      <div className="about-title-container">
                        <h3 className="title">Abilities</h3>
                        <ul>
                          {pokeDetail.abilities.map((type) => (
                            <li key={`${type.ability.name} ${type.slot}`}>
                              {type.ability.name}
                              <span>,</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div
                    className={
                      stateTab === 2 ? "content-stats active" : "content-stats"
                    }
                  >
                    <div className="stats-container"></div>
                    {pokeDetail.stats.map((stat) => (
                      <div
                        key={pokeDetail.name + stat.stat.name}
                        className="stat-container"
                      >
                        <div className="stat-titles-container">
                          <h3 className="stat-name">{stat.stat.name}</h3>
                          <h3 className="stat-value">{stat.base_stat}</h3>
                        </div>
                        <div className="stat-bar-container">
                          <div className="stat-bar-bg"></div>
                          <div
                            className="stat-bar-parent"
                            style={{
                              width: stat.base_stat + "%",
                              maxWidth: "100%",
                            }}
                          >
                            <div
                              className={`stat-bar-fill ${pokeDetail.types[0].type.name}`}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div
                    className={
                      stateTab === 3 ? "content-moves active" : "content-moves"
                    }
                  >
                    <div className="info-container">
                      <div className="subtitle-container">
                        <p className="subtitle">Color</p>
                        <p className="description">{pokeInfo.color.name}</p>
                      </div>
                      <div className="subtitle-container">
                        <p className="subtitle">ID</p>
                        <p className="description">{pokeInfo.id}</p>
                      </div>
                      <div className="subtitle-container">
                        <p className="subtitle">Is Baby</p>

                        <div className="check-x">
                          {pokeInfo.is_baby ? (
                            <FaCheck
                              style={{
                                color: "#28a745",
                              }}
                            />
                          ) : (
                            <FaTimesCircle
                              style={{
                                color: "#dc3545",
                              }}
                            />
                          )}
                        </div>
                      </div>
                      <div className="subtitle-container">
                        <p className="subtitle">Is Legendary</p>
                        <div className="check-x">
                          {pokeInfo.is_legendary ? (
                            <FaCheck
                              style={{
                                color: "#28a745",
                              }}
                            />
                          ) : (
                            <FaTimesCircle
                              style={{
                                color: "#dc3545",
                              }}
                            />
                          )}
                        </div>
                      </div>
                      <div className="subtitle-container">
                        <p className="subtitle">Is Mythical</p>

                        <div className="check-x">
                          {pokeInfo.is_mythical ? (
                            <FaCheck
                              style={{
                                color: "#28a745",
                              }}
                            />
                          ) : (
                            <FaTimesCircle
                              style={{
                                color: "#dc3545",
                              }}
                            />
                          )}
                        </div>
                      </div>
                      <div className="about-title-container">
                        <h3 className="title">Egg Groups</h3>
                        {pokeInfo.egg_groups.map((egg) => (
                          <p
                            key={`${egg.name} ${pokeInfo.id}`}
                            className="egg-title"
                          >
                            <span>
                              <img
                                src={defineIcon(egg.name)}
                                className="img-egg"
                              />
                            </span>
                            &nbsp;
                            {egg.name}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div
                    className={
                      stateTab === 4
                        ? "content-evolution active"
                        : "content-evolution"
                    }
                  >
                    <div className="detail-images-container">
                      <img src={pokeDetail.sprites.back_default}></img>
                      <img src={pokeDetail.sprites.back_shiny}></img>
                      <img src={pokeDetail.sprites.front_default}></img>
                      <img src={pokeDetail.sprites.front_shiny}></img>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

const StyledStat = styled.div`
  width: 100%;
  height: 5px;
  background: red;
`;

export default PokeDetail;
