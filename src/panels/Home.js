import {
  AppBar,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fab,
  Grid,
  IconButton,
  makeStyles,
  Menu,
  MenuItem,
  Snackbar,
  TextField,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { Alert } from "../components/Alert";
import { AddOutlined, MoreVert } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { CustomSnackbar } from "../components/CustomSnackbar";
import { DeleteBookDialog } from "../components/Dialogs/DeleteBookDialog";
import { CreateBookDialog } from "../components/Dialogs/CreateBookDialog";
import { Book } from "../components/Book";
import { defaultBooks } from "../defaultBooks";

const useStyles = makeStyles((theme) => ({
  fab: {
    position: "fixed",
    bottom: theme.spacing(5),
    right: theme.spacing(5),
  },
  root: {
    flexGrow: 1,
    padding: 24,
  },
}));

const Home = () => {
  const [books, setBooks] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [bookKey, setBookKey] = useState(null);

  const [dialogOpened, setDialogOpened] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [deleteDialogOpened, setDeleteDialogOpened] = useState(false);

  const [bookTitle, setBookTitle] = useState("");
  const [bookDescription, setBookDescription] = useState("");
  const [bookAuthor, setBookAuthor] = useState("");

  const [snackbarText, setSnackbarText] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [snackbarOpened, setSnackbarOpened] = useState(false);

  const [xs, setXS] = useState(6);
  const classes = useStyles();

  const handleMenuOpen = (event) => {
    setBookKey(+event.currentTarget.getAttribute("data-book"));
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setBookKey(null);
  };

  const openCreateDialog = () => {
    setDialogTitle("Добавить книгу");
    setDialogOpened(true);
  };

  const cancelCreation = () => {
    closeCreateDialog();
    setBookTitle("");
    setBookDescription("");
    setBookAuthor("");
  };

  const closeCreateDialog = () => {
    setDialogOpened(false);
    setBookKey(null);
  };

  const openEditDialog = () => {
    setDialogTitle("Изменить информацию");
    setAnchorEl(null);
    const [book] = books.filter((book, i) => i === bookKey);

    setBookTitle(book.title);
    setBookAuthor(book.author);
    setBookDescription(book.description);

    setDialogOpened(true);
  };

  const saveBook = () => {
    let [book] = books.filter((book, i) => i === bookKey);
    if (!book) {
      setBooks([
        ...books,
        {
          title: bookTitle || "Без названия",
          author: bookAuthor || "Без автора",
          description: bookDescription || "У данной книги нет описания",
        },
      ]);
      openSnackbar("Книга добавлена!");
    } else {
      book.title = bookTitle || "Без названия";
      book.author = bookAuthor || "Без автора";
      book.description = bookDescription || "У данной книги нет описания";
      const updatedBooks = [...books];

      setBooks(updatedBooks);
      openSnackbar("Информация обновлена!");
    }

    setBookTitle("");
    setBookDescription("");
    setBookAuthor("");
    closeCreateDialog();
  };

  const openDeleteDialog = () => {
    setDeleteDialogOpened(true);
    setAnchorEl(null);
  };

  const closeDeleteDialog = () => {
    setDeleteDialogOpened(false);
    setBookKey(null);
  };

  const deleteBook = () => {
    setBooks((books) => books.filter((book, i) => i !== bookKey));
    setAnchorEl(null);
    openSnackbar("Книга удалена!");
    closeDeleteDialog();
  };

  const onChange = (event) => {
    const { value } = event.currentTarget;
    switch (event.currentTarget.name) {
      case "title":
        setBookTitle(value);
        break;
      case "description":
        setBookDescription(value);
        break;
      case "author":
        setBookAuthor(value);
        break;
      default:
        break;
    }
  };

  const openSnackbar = (text, severity = "success") => {
    setSnackbarOpened(true);
    setSnackbarText(text);
    setSnackbarSeverity(severity);
  };

  const closeSnackbar = () => {
    setSnackbarOpened(false);
  };

  const handleResize = () => {
    const width = window.innerWidth;
    const columnSize = (width >= 750 && 6) || 12;
    setXS(columnSize);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    const localBooks = localStorage.getItem("books");
    if (localBooks === null) {
      localStorage.setItem("books", JSON.stringify(defaultBooks));
      return setBooks(defaultBooks);
    }
    setBooks(JSON.parse(localBooks));
  }, []);

  useEffect(() => {
    localStorage.setItem("books", JSON.stringify(books));
  }, [books]);

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Список книг</Typography>
        </Toolbar>
      </AppBar>

      <Container className={classes.root}>
        <Grid container spacing={3}>
          {books.map((book, i) => (
            <Book
              book={book}
              i={i}
              xs={xs}
              anchorEl={anchorEl}
              bookKey={bookKey}
              handleMenuClose={handleMenuClose}
              handleMenuOpen={handleMenuOpen}
              openDeleteDialog={openDeleteDialog}
              openEditDialog={openEditDialog}
            />
          ))}
        </Grid>

        <CreateBookDialog
          onChange={onChange}
          bookAuthor={bookAuthor}
          dialogTitle={dialogTitle}
          bookDescription={bookDescription}
          bookTitle={bookTitle}
          cancelCreation={cancelCreation}
          dialogOpened={dialogOpened}
          saveBook={saveBook}
        />

        <DeleteBookDialog
          closeDeleteDialog={closeDeleteDialog}
          deleteBook={deleteBook}
          deleteDialogOpened={deleteDialogOpened}
        />

        <CustomSnackbar
          closeSnackbar={closeSnackbar}
          snackbarOpened={snackbarOpened}
          snackbarSeverity={snackbarSeverity}
        >
          {snackbarText}
        </CustomSnackbar>
      </Container>

      <Fab className={classes.fab} color="primary" onClick={openCreateDialog}>
        <AddOutlined />
      </Fab>
    </>
  );
};

export default Home;
