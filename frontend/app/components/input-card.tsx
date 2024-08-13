"use client";
import { StarBorder } from "@mui/icons-material";
import { useState } from "react";
import { createNote } from "../api/note/create-note";
import { useSession } from "../context/session-id-context";

export function InputCard() {
  const { userId } = useSession();
  const [inputValue, setInputValue] = useState("");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Evita o comportamento padrão do form

    try {
      const response = await createNote({
        color: 1,
        description: "12312312",
        file: "",
        fav: false,
        title: inputValue,
        user_id: userId || "",
      });
      console.log("Nota enviada com sucesso:", response.data);
      // Limpar o valor do input após o envio, se desejado
      setInputValue("");
    } catch (error) {
      console.error("Erro ao enviar a nota:", error);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="bg-white w-72 h-28 mt-5 rounded-3xl shadow-md flex flex-col border border-[#D9D9D9] lg:w-[32rem] lg:h-40 lg:rounded-none">
        <div className="flex flex-row items-center justify-between border-b border-gray-200 px-4">
          <h1 className="text-xl font-bold leading-10">Titulo</h1>
          <button className="mt-[1px]" type="button">
            <StarBorder sx={{ color: "#455a64", fontSize: 30 }} />
          </button>
        </div>
        <input
          type="text"
          placeholder="Criar nota..."
          value={inputValue}
          onChange={handleChange}
          className="mx-4 h-12 border-none bg-transparent shadow-none p-0 m-0 focus:outline-none"
        />
        <button
          type="submit"
          className="hidden" // Opcional: esconda o botão se você só quiser enviar o form com Enter
        >
          Submit
        </button>
      </div>
    </form>
  );
}
