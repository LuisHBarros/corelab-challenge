"use client";
import { useState, FormEvent, useContext } from "react";
import { useSession } from "../context/session-id-context";

export function SearchBar() {
  const { sessionId } = useSession();
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Faça a requisição para o backend aqui
  };

  return (
    <form onSubmit={handleSubmit} className="h-7 lg:w-[32rem]">
      <input
        type="text"
        placeholder="Pesquisar notas"
        className="w-56 h-full border rounded-sm py-4 text-sm px-2 focus:w-72 animate-pulse"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </form>
  );
}
