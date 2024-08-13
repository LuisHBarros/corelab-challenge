import { ApiResponse, Note } from "@/app/@types/types";
import api from "../axios";

interface CreateNoteDTO {
  title: string;
  description: string;
  fav: boolean;
  color: number;
  file: string;
  user_id: string;
}

export async function createNote(
  data: CreateNoteDTO
): Promise<ApiResponse<Note>> {
  try {
    const response = await api.post<ApiResponse<Note>>("/notes", data);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar nota:", error);
    throw error;
  }
}
