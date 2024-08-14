import { deleteNote } from "@/app/api/note/delete.note";
import { useNotes } from "@/app/context/notes-context";
import { Dialog, DialogTitle, DialogActions, Button } from "@mui/material";
import axios from "axios";
import { useState } from "react";

interface DeleteNoteDialogProps {
  buttonDeleteOpen: boolean;
  onButtonDeleteClick: () => void;
  id: string;
}

export function DeleteNoteDialog({
  buttonDeleteOpen,
  onButtonDeleteClick,
  id,
}: DeleteNoteDialogProps) {
  const [loading, setLoading] = useState(false);
  const { setNotes, notes } = useNotes();

  async function handleDeleteNote() {
    try {
      setLoading(true);
      await deleteNote(id).then(() => {
        const updatedNotes = notes.filter((note) => note.id !== id);
        setNotes(updatedNotes);
      });

      // Opcional: Fechar o diálogo ou atualizar o estado do pai
      onButtonDeleteClick();
    } catch (error) {
      console.error("Erro ao excluir a nota:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog
      open={buttonDeleteOpen}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={{
        "& .MuiDialog-paper": {
          backgroundColor: "#f0f4c3", // Cor de fundo do diálogo
          color: "#333", // Cor do texto
          borderRadius: "10px", // Borda arredondada
          padding: "20px", // Espaçamento interno
        },
      }}
    >
      <DialogTitle
        id="alert-dialog-title"
        sx={{ fontWeight: "bold", fontSize: "1.5rem" }}
      >
        Deseja excluir esta nota?
      </DialogTitle>

      <DialogActions sx={{ justifyContent: "center", marginTop: "10px" }}>
        <Button
          onClick={onButtonDeleteClick}
          sx={{
            backgroundColor: "#bdbdbd", // Cor de fundo do botão "Cancelar"
            color: "#fff", // Cor do texto do botão
            "&:hover": {
              backgroundColor: "#9e9e9e", // Cor de fundo ao passar o mouse
            },
          }}
        >
          Cancelar
        </Button>
        <Button
          onClick={handleDeleteNote}
          sx={{
            backgroundColor: "#f44336", // Cor de fundo do botão "Excluir"
            color: "#fff", // Cor do texto do botão
            marginLeft: "10px", // Espaçamento entre os botões
            "&:hover": {
              backgroundColor: "#d32f2f", // Cor de fundo ao passar o mouse
            },
          }}
          disabled={loading} // Desabilitar o botão enquanto a requisição está em andamento
        >
          {loading ? "Excluindo..." : "Excluir"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
