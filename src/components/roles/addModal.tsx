import { Modal } from "react-bootstrap";
import { SubmitHandler } from "react-hook-form";
import { useAppDispatch } from "../../hooks/redux-hooks";
import { startNewRole } from "../../actions/roles";

import FormRole from "./Form";

interface Props {
  open: boolean;
  handleClose: () => void;
}

type Inputs = {
  id: string;
  name: string;
  permissions: Array<string>;
};

const ModalAddRole = ({ open, handleClose }: Props) => {
  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log({ data });
    dispatch(startNewRole(data));

    handleClose();
  };

  return (
    <Modal show={open} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{"Agregar Role"} </Modal.Title>
      </Modal.Header>
      <FormRole onSubmit={onSubmit} handleClose={handleClose} textButtonAction="Guardar" open={open} />
    </Modal>
  );
};

export default ModalAddRole;
