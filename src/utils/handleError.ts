import { UI } from "sketch";

const handleError = (err: any) => {
  switch (err.type) {
    case "alert":
      UI.alert(err.title, err.message);
      break;
    case "message":
      UI.message(err.message);
    default:
      break;
  }
};

export default handleError;
