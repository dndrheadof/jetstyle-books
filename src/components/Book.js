import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  makeStyles,
  Menu,
  MenuItem,
  Typography,
} from "@material-ui/core";
import { MoreVert } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  card: {
    height: "100%",
  },
}));

const origin = {
  vertical: "top",
  horizontal: "right",
};

export const Book = ({
  book,
  xs,
  i,
  handleMenuOpen,
  handleMenuClose,
  openEditDialog,
  openDeleteDialog,
  anchorEl,
  bookKey,
}) => {
  const classes = useStyles();
  return (
    <Grid item xs={xs} key={i}>
      <Card className={classes.card}>
        <CardHeader
          action={
            <div>
              <IconButton
                aria-label="settings"
                onClick={handleMenuOpen}
                data-book={i}
              >
                <MoreVert />
              </IconButton>

              <Menu
                open={Boolean(anchorEl) && bookKey === i}
                anchorEl={anchorEl}
                anchorOrigin={origin}
                transformOrigin={origin}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={openEditDialog}>Редактировать</MenuItem>
                <MenuItem onClick={openDeleteDialog}>Удалить</MenuItem>
              </Menu>
            </div>
          }
          title={book.title}
          subheader={book.author}
        />
        <CardContent>
          <Typography variant="body2" component="p">
            {book.description}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};
