import { createQuery } from "@adeora/solid-query";
import { createSignal, Show } from "solid-js";
import "./Counter.css";

export default function Counter() {
  const [count, setCount] = createSignal(1);

  const pokemonQuery = createQuery(() => ({
    queryKey: ["pokemon", count()],
    queryFn: async () => {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${count()}`
      );
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return response.json() as Promise<{
        name: string;
        base_experience: number;
        height: number;
        weight: number;
      }>;
    },
  }));

  return (
    <div class="container">
      <button class="increment" onClick={() => setCount(count() + 1)}>
        Client Side Fetch: {count()}
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
