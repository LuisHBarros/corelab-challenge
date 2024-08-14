import api from "../axios";

export async function deleteNote(noteId: string): Promise<void> {
  try {
    await api.delete(`/notes/${noteId}`);
  } catch (error) {
    console.error("Erro ao excluir nota:", error);
    throw error;
  }
}
