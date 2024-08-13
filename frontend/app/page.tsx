import { Card } from "./components/card";
import { Header } from "./components/header";
import { InputCard } from "./components/input-card";

export default function Home() {
  return (
    <>
      <Header />
      <main className="bg-[#F0F2F5] items-center flex flex-col justify-center">
        <InputCard />
        <ul className="flex flex-col gap-14 lg:flex-row lg:flex-wrap lg:mx-auto justify-center">
          <li>
            <Card
              fav={true}
              title="Titulo 1"
              color="1"
              key={1}
              file="https://t3.ftcdn.net/jpg/06/48/79/10/360_F_648791013_cQK30SdyiLrVQ96Bqn2MOkz4JmvgttGr.jpg"
            />
          </li>
          <li>
            <Card fav={false} title="Titulo 2" color="4" key={2} />
          </li>
          <li>
            <Card fav={true} title="Titulo 3" color="2" key={3} />
          </li>
          <li>
            <Card fav={false} title="Titulo 4" color="3" key={4} />
          </li>
        </ul>
      </main>
    </>
  );
}
