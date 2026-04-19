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

const createPokemonCard = ({ name, stats, img, types }) => {
  const pokemonImg = createImageSection({ name, img });
  const pokemonDetails = createPokemonDetails({ name, types });
  const pokemonStats = createPokemonStats({ stats });
  const pokemonInfo = <div className="info">{pokemonDetails}{pokemonStats}
  </div>;
  return <div key={name} className="card">{pokemonImg}{pokemonInfo}</div>;
};

const NaviBar = ({ types, currentType, setType }) => {
  const pokemonTypeElements = types.map((type) => (
    <button
      key={type}
      className={currentType === type ? currentType : ""}
      onClick={() => setType(type)}
    >
      {type}
    </button>
  ));
  return <div className="side-bar">{pokemonTypeElements}</div>;
};

const filterPokemonByType = (pokemonData, currentType, search) => {
  return pokemonData.filter(({ types, name }) =>
    (types.includes(currentType) ||
      currentType === "all") && name.includes(search)
  );
};

const createPokemonCards = ({ pokemonData, currentType, search }) => {
  const pokemonByType = filterPokemonByType(pokemonData, currentType, search);
  const card = pokemonByType.map(createPokemonCard);
  const pokemonCards = <div className="pokemon-cards">{card}</div>;
  return pokemonCards;
};

const CreateSearchElement = ({ setSearch }) => {
  return (
    <input
      type="text"
      placeholder="Search Pokemon..."
      id="search"
      onChange={(e) => setSearch(e.target.value)}
    />
  );
};

const createHeaderSection = (currentType, setSearch) => {
  return (
    <div className={`heading ${currentType}`}>
      <h1>Pokedex</h1>
      <CreateSearchElement setSearch={setSearch} />
    </div>
  );
};

export const Pokedex = ({ props }) => {
  const { pokemonData, types } = props;
  const [currentType, setType] = useState("all");
  const [search, setSearch] = useState("");
  const pokemonCards = createPokemonCards({ pokemonData, currentType, search });
  const naviBar = NaviBar({ types, currentType, setType });
  const pokedex = <main>{naviBar}{pokemonCards}</main>;
  const header = createHeaderSection(currentType, setSearch);
  return <>{header}{pokedex}</>;
};
