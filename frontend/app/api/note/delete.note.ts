import api from "../axios";

export async function deleteNote(noteId: string): Promise<void> {
  try {
    await api.delete(`/notes/${noteId}`);
    console.log("Nota excluída com sucesso");
  } catch (error) {
    console.error("Erro ao excluir nota:", error);
    throw error;
  }
}
