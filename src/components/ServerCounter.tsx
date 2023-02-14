import { createQuery } from "@adeora/solid-query";
import { createSignal, Show } from "solid-js";
import server$ from "solid-start/server";
import "./Counter.css";

const fetchPokemon = server$(async (id: number) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return response.json() as Promise<{
    name: string;
    base_experience: number;
    height: number;
    weight: number;
  }>;
});

export default function ServerCounter() {
  const [count, setCount] = createSignal(1);

  const pokemonQuery = createQuery(() => ({
    queryKey: ["pokemon_server", count()],
    queryFn: async () => {
      return fetchPokemon(count());
    },
  }));

  return (
    <div class="container">
      <button class="increment" onClick={() => setCount(count() + 1)}>
        Server Side Fetch: {count()}
      </button>

      <Show when={pokemonQuery.data} keyed>
        {(pokemon) => (
          <div class="pokemon">
            <h2>{pokemon.name}</h2>
            <p>Base experience: {pokemon.base_experience}</p>
            <p>Height: {pokemon.height}</p>
            <p>Weight: {pokemon.weight}</p>
          </div>
        )}
      </Show>
    </div>
  );
}
