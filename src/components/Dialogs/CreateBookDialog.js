import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@material-ui/core";

export const CreateBookDialog = ({
  dialogOpened,
  cancelCreation,
  dialogTitle,
  bookTitle,
  onChange,
  bookAuthor,
  bookDescription,
  saveBook,
}) => (
  <Dialog
    open={dialogOpened}
    onClose={cancelCreation}
    color="primary"
    variant="outlined"
  >
    <DialogTitle>{dialogTitle}</DialogTitle>
    <DialogContent>
      <TextField
        autoFocus
        margin="dense"
        label="Название книги"
        name="title"
        fullWidth
        value={bookTitle}
        onChange={onChange}
      />
      <TextField
        margin="dense"
        label="Автор"
        name="author"
        fullWidth
        value={bookAuthor}
        onChange={onChange}
      />
      <TextField
        margin="dense"
        label="Описание книги"
        name="description"
        fullWidth
        multiline
        value={bookDescription}
        onChange={onChange}
      />
    </DialogContent>
    <DialogActions>
      <Button onClick={cancelCreation} color="primary">
        Отмена
      </Button>
      <Button onClick={saveBook} color="primary">
        Сохранить
      </Button>
    </DialogActions>
  </Dialog>
);
