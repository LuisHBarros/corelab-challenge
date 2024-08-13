import { ApiResponse, Note } from "@/app/@types/types";
import api from "../axios";

export async function getNotesByUserId(
  userId: string
): Promise<ApiResponse<Note[]>> {
  try {
    const response = await api.get<ApiResponse<Note[]>>(
      `/notes/user/${userId}`
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao obter notas por ID de usuário:", error);
    throw error;
  }
}
