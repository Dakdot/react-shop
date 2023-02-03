import { useContext } from "react";
import Collapse from "react-bootstrap/esm/Collapse";
import { FlashContext } from "../contexts/FlashProvider";
import Alert from "react-bootstrap/Alert";

export default function FlashMessage() {
  const { hideFlash, flashMessage, visible } = useContext(FlashContext);

  return (
    <Collapse in={visible}>
      <div>
        <Alert
          variant={flashMessage.type || "info"}
          dismissible
          onClose={hideFlash}
          data-visible={visible}
        >
          {flashMessage.message}
        </Alert>
      </div>
    </Collapse>
  );
}
