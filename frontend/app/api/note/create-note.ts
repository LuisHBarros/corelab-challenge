import { ApiResponse, Note } from "@/app/@types/types";
import api from "../axios";

export async function createNote(note: Note): Promise<ApiResponse<Note>> {
  try {
    const response = await api.post<ApiResponse<Note>>("/notes", note);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar nota:", error);
    throw error;
  }
}
