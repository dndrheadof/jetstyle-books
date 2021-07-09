import { Alert as LabAlert } from "@material-ui/lab";

export const Alert = (props) => {
  return <LabAlert variant="filled" elevation={6} {...props} />;
};
