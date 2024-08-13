import { ApiResponse, Note } from "@/app/@types/types";
import api from "../axios";

interface GetNotesByUserIdResponse {
  _id: string;
  props: {
    color: number;
    description: string;
    fav: boolean;
    file: string;
    title: string;
    user_id: string;
  };
}

export async function getNotesByUserId(userId: string): Promise<Note[]> {
  try {
    const response = await api.get<ApiResponse<GetNotesByUserIdResponse[]>>(
      `/notes/user/${userId}`
    );
    return response.data.map((note) => ({
      id: note._id,
      color: note.props.color,
      description: note.props.description,
      fav: note.props.fav,
      file: note.props.file,
      title: note.props.title,
      user_id: note.props.user_id,
    }));
  } catch (error) {
    console.error("Erro ao obter notas por ID de usuário:", error);
    throw error;
  }
}
