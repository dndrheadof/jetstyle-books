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

const defaultBooks = [
  {
    title: "451° по Фаренгейту",
    author: "Рей Брэдбери",
    description:
      'Мастер мирового масштаба, совмещающий в литературе несовместимое. Создатель таких ярчайших шедевров, как "Марсианские хроники", "451° по Фаренгейту", "Вино из одуванчиков" и так далее и так далее. Лауреат многочисленных премий. Это Рэй Брэдбери. Его увлекательные истории прославили автора не только как непревзойденного рассказчика, но и как философа, мыслителя и психолога. Магический реализм его прозы, рукотворные механизмы радости, переносящие человека из настоящего в волшебные миры детства, чудо приобщения к великой тайне Литературы, щедро раздариваемое читателю, давно вывели Брэдбери на высокую классическую орбиту. Собранные в этой книге произведения - достойное тому подтверждение.',
  },
  {
    title: "1984",
    author: "Джордж Оруэлл",
    description:
      'Своеобразный антипод второй великой антиутопии XX века - "О дивный новый мир" Олдоса Хаксли. Что, в сущности, страшнее: доведенное до абсурда "общество потребления" - или доведенное до абсолюта "общество идеи"? По Оруэллу, нет и не может быть ничего ужаснее тотальной несвободы...',
  },
  {
    title: "Мастер и Маргарита",
    author: "Михаил Булгаков",
    description:
      'Один из самых загадочных и удивительных романов XX века. Роман "Мастер и Маргарита" - визитная карточка Михаила Афанасьевича Булгакова. Более десяти лет Булгаков работал над книгой, которая стала его романом-судьбой, романом-завещанием. В "Мастере и Маргарите" есть все: веселое озорство и щемящая печаль, романтическая любовь и колдовское наваждение, магическая тайна и безрассудная игра с нечистой силой.',
  },
  {
    title: "Портрет Дориана Грея",
    author: "Оскар Уайльд",
    description:
      "«Портрет Дориана Грея» – одно из величайших произведений последних полутора столетий, роман, который пытались запретить, а автора осуждали за «непристойное поведение». Превращение прекрасного и невинного юноши Дориана в чудовище под влиянием гедонистических идей и циничных афоризмов лорда Генри – в романе, породившем культ вечной молодости.",
  },
  {
    title: "Преступление и наказание",
    author: "Фёдор Достоевский",
    description:
      'Ф.М.Достоевский - один из тех немногих писателей, которые повлияли на умы не только современников, но и потомков. В своем творчестве он ставит самые главные, самые трудные - непосильные - вопросы. Роман "Преступление и наказание" - детектив со всеми необходимыми атрибутами: "хождение по мукам" нищего студента Родиона Раскольникова, убийство старухи-процентщицы, последовавшее за ним расследование, наказание и, конечно же, любовь... Но не этим прежде всего он привлекает читателя. Достоевский гениально показал бунт-преступление "гордого человека", его внутренний мир, подняв вечные вопросы: Что есть человек? В чем его спасение?',
  },
  {
    title: "Идиот",
    author: "Фёдор Достоевский",
    description:
      "Роман «Идиот» занимает в творчестве Достоевского особое место. В центре других его произведений стоят трагические образы мятежных героев — «отрицателей». В «Идиоте» же писатель избрал своим главным героем, по собственному определению, «положительно-прекрасного», идеального человека, стремящегося внести гармонию и примирение в нескладицу общественной жизни, и провел его через поиски и испытания, также приводящие к трагическому концу.",
  },
  {
    title: "Война и мир",
    author: "Лев Толстой",
    description:
      '"Война и мир" - самый знаменитый роман русской литературы. Действие начинается в России 1805 года, а затем автор описывает войну 1812 года и послевоенное время. Параллельно с военными событиями фильм освещает различные стороны светской жизни Петербурга и Москвы, российской провинции и стана Наполеоновских войн. Судьбы центральных персонажей коварным образом переплетаются друг с другом, что приводит к неожиданным, порой счастливым, порой трагичным последствиям…',
  },
];

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
