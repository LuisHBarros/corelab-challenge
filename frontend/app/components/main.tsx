import { useCallback, useEffect, useState } from "react";
import { Card } from "./card";
import { InputCard } from "./input-card";
import { getNotesByUserId } from "../api/note/get-note-by-user-id";
import { useSession } from "../context/session-id-context";
import { Note } from "../@types/types";

export function Main() {
  const { userId } = useSession();
  const [notes, setNotes] = useState<Note[]>([]);
  const fetchNotes = useCallback(async () => {
    if (!userId) return; // Verifique se o `userId` está disponível

    try {
      const response = await getNotesByUserId(userId);
      console.log("Notas recebidas:", response);

      setNotes(response);
    } catch (error) {
      console.error("Erro ao buscar notas:", error);
    }
  }, [userId]);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);
  return (
    <main className=" items-center flex flex-col justify-center">
      <InputCard />
      <ul className="flex flex-col gap-14 lg:flex-row lg:flex-wrap lg:mx-auto justify-center">
        {notes.map((note) => (
          <li key={note.id}>
            <Card
              id={note.id}
              fav={note.fav}
              title={note.title}
              color={note.color}
              file={note.file || undefined}
            />
          </li>
        ))}
      </ul>
    </main>
  );
}
