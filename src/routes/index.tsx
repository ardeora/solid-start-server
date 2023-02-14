import { Suspense } from "solid-js";
import { Title } from "solid-start";
import { createSignal, Show } from "solid-js";
import Counter from "~/components/Counter";
import ServerCounter from "~/components/ServerCounter";
// import Counter from "~/components/Counter";

export default function Home() {
  const [count, setCount] = createSignal(1);

  return (
    <main>
      <Title>Hello World</Title>
      <h1>Hello world!</h1>
      <Suspense fallback={() => <div>Loading....</div>}>
        <Counter />
      </Suspense>
      <Suspense fallback={() => <div>Loading....</div>}>
        <ServerCounter />
      </Suspense>
      <p>
        Visit{" "}
        <a href="https://start.solidjs.com" target="_blank">
          start.solidjs.com
        </a>{" "}
        to learn how to build SolidStart apps.
      </p>
    </main>
  );
}
