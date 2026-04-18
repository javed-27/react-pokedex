import "./pokemon_color.css";
import "./pokemon_card.css";
import { useState } from "react";

const createPokemonDetails = ({ name, types }) => {
  const pokemonName = <h1>{name}</h1>;
  const pokemonTypes = types.map((type) => <p className={type}>{type}</p>);
  const typeContainer = <div className="types">{pokemonTypes}</div>;
  return <div className="type">{pokemonName}{typeContainer}</div>;
};

const createPokemonStats = ({ stats }) => {
  const pokemonStats = Object.entries(stats).map(([key, value]) => (
    <tr>
      <th>{key}</th>
      <th>{value}</th>
    </tr>
  ));
  return (
    <table>
      <tbody>{pokemonStats}</tbody>
    </table>
  );
};

const createImageSection = ({ name, img }) => {
  return <img src={img} alt={name} />;
};

const createPokemonCard = (pokemon) => {
  const pokemonImg = createImageSection(pokemon);
  const pokemonDetails = createPokemonDetails(pokemon);
  const pokemonStats = createPokemonStats(pokemon);
  const pokemonInfo = <div className="info">{pokemonDetails}{pokemonStats}
  </div>;
  return <div className="card">{pokemonImg}{pokemonInfo}</div>;
};

const NaviBar = (types) => {
  const [currentType, setType] = useState("all");
  const pokemonTypeElements = types.map((type) => (
    <button
      className={currentType === type ? currentType : ""}
      onClick={() => setType(type)}
    >
      {type}
    </button>
  ));
  const sideBar = <div className="side-bar">{pokemonTypeElements}</div>;
  return { currentType, sideBar };
};

const filterPokemonByType = (pokemonData, currentType) => {
  return pokemonData.filter(({ types }) => types.includes(currentType));
};

const createPokemonCards = ({ pokemonData, currentType }) => {
  const pokemonByType = (currentType !== "all")
    ? filterPokemonByType(pokemonData, currentType)
    : pokemonData;
  const card = pokemonByType.map(createPokemonCard);
  const pokemonCards = <div className="pokemon-cards">{card}</div>;
  return pokemonCards;
};

export const Pokedex = ({ props }) => {
  const { pokemonData, types } = props;
  const { sideBar, currentType } = NaviBar(types);
  const pokemonCards = createPokemonCards({ pokemonData, currentType });
  return <main>{sideBar}{pokemonCards}</main>;
};
