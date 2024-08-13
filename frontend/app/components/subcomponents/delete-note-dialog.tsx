import { Dialog, DialogTitle, DialogActions, Button } from "@mui/material";

interface DeleteNoteDialogProps {
  buttonDeleteOpen: boolean;
  onButtonDeleteClick: () => void;
}

export function DeleteNoteDialog({
  buttonDeleteOpen,
  onButtonDeleteClick,
}: DeleteNoteDialogProps) {
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
          onClick={onButtonDeleteClick}
          sx={{
            backgroundColor: "#f44336", // Cor de fundo do botão "Excluir"
            color: "#fff", // Cor do texto do botão
            marginLeft: "10px", // Espaçamento entre os botões
            "&:hover": {
              backgroundColor: "#d32f2f", // Cor de fundo ao passar o mouse
            },
          }}
        >
          Excluir
        </Button>
      </DialogActions>
    </Dialog>
  );
}
