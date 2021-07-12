import { Button, Dialog, DialogActions, DialogTitle } from "@material-ui/core";

export const DeleteBookDialog = ({
  deleteDialogOpened,
  closeDeleteDialog,
  deleteBook,
}) => (
  <Dialog
    open={deleteDialogOpened}
    onClose={closeDeleteDialog}
    color="primary"
    variant="outlined"
  >
    <DialogTitle>Удалить книгу?</DialogTitle>
    <DialogActions>
      <Button onClick={closeDeleteDialog} color="primary">
        Нет
      </Button>
      <Button onClick={deleteBook} color="primary" autoFocus>
        Да
      </Button>
    </DialogActions>
  </Dialog>
);
