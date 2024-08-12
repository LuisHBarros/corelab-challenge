"use client"; // Adicione esta linha
import { Edit, FormatColorFill, Close, Star } from "@mui/icons-material";
import { useState } from "react";

interface CardProps {
  title: string;
  fav: boolean;
  file?: string;
  color: string;
}

const colors = [
  "#BAE2FF",
  "#B9FFDD",
  "#FFE8AC",
  "#FFCAB9",
  "#F99494",
  "#9DD6FF",
  "#ECA1FF",
  "#DAFF8B",
  "#FFA285",
  "#CDCDCD",
  "#979797",
  "#A99A7C",
];

export function Card({ title, fav, file, color }: CardProps) {
  const [buttonColorOpen, setButtonColorOpen] = useState(false);
  function onButtonColorClick() {
    buttonColorOpen ? setButtonColorOpen(false) : setButtonColorOpen(true);
  }
  return (
    <div
      className="bg-white w-72 min-h-72 mt-5 rounded-2xl flex flex-col justify-between"
      style={color ? { backgroundColor: colors[parseInt(color)] } : {}}
    >
      <section>
        <div
          className="flex flex-row items-center justify-between border-b px-4"
          style={{ borderColor: color ? "#FFF" : "#E5E5E5" }}
        >
          <h1 className="text-xl font-bold leading-10 ">Titulo</h1>
          <button>
            <Star />
          </button>
        </div>
        <div className="flex flex-row items-center justify-between mt-2 px-4">
          <p className="text-sm text-gray-500">
            Clique ou arraste o arquivo para esta área para fazer upload
          </p>
        </div>
      </section>
      <footer className="mt-auto px-4 flex flex-row justify-between pb-2">
        <div className="flex flex-row gap-2">
          <button onClick={onButtonColorClick}>
            <Edit />
          </button>
          <button>
            <FormatColorFill />
          </button>
        </div>
        <button>
          <Close />
        </button>
      </footer>
    </div>
  );
}
