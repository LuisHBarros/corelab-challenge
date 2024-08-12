import { Card } from "./components/card";
import { Header } from "./components/header";
import { InputCard } from "./components/input-card";

export default function Home() {
  return (
    <>
      <Header />
      <body className="bg-gray-300 items-center flex flex-col justify-center">
        <InputCard />
        <Card fav={true} title="Titulo 1" color="1" key={1} />
        <Card fav={true} title="Titulo 1" color="4" key={1} />
      </body>
    </>
  );
}
