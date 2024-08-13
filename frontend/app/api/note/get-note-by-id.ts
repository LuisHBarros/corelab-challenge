import { ApiResponse, Note } from "@/app/@types/types";
import api from "../axios";

export async function getNoteById(noteId: string): Promise<ApiResponse<Note>> {
  try {
    const response = await api.get<ApiResponse<Note>>(`/notes/${noteId}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao obter nota por ID:", error);
    throw error;
  }
}
