import { Alert } from "./Alert";
import { Snackbar } from "@material-ui/core";

const origin = { vertical: "bottom", horizontal: "center" };

export const CustomSnackbar = ({
  snackbarOpened,
  closeSnackbar,
  snackbarSeverity,
  children,
}) => (
  <Snackbar
    anchorOrigin={origin}
    open={snackbarOpened}
    autoHideDuration={5000}
    onClose={closeSnackbar}
  >
    <Alert onClose={closeSnackbar} severity={snackbarSeverity}>
      {children}
    </Alert>
  </Snackbar>
);
