import { useState } from "react";

export default function useHandleShowComponents() {
  const [show, setShow] = useState<boolean>(false);
  const handleClose = () => {
    setShow(false);
  };

  const handleShow = () => {
    setShow(true);
  };

  return {
    show,
    handleShow,
    handleClose,
  };
}
