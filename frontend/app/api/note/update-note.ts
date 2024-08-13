import { ApiResponse, Note } from "@/app/@types/types";
import api from "../axios";

export async function updateNote(note: Note): Promise<ApiResponse<Note>> {
  try {
    const response = await api.put<ApiResponse<Note>>(
      `/notes/${note.id}`,
      note
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar nota:", error);
    throw error;
  }
}
