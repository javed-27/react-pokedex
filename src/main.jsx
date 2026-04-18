import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Pokedex } from "./pokemon.jsx";
import { pokemonData } from "./assets/data/pokemon_data.js";
import { types } from "./assets/data/pokemon_types.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Pokedex props={{ pokemonData, types }} />
  </StrictMode>,
);
