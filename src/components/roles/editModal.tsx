import { Modal } from "react-bootstrap";

import { SubmitHandler } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { startUpdatedRole } from "../../actions/roles";
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

const ModalPermission = ({ open, handleClose }: Props) => {
  const dispatch = useAppDispatch();
  const { roleSelected } = useAppSelector((state) => state.role);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log({ update_data: data });
    dispatch(startUpdatedRole(data));
    handleClose();
  };

  return (
    <Modal show={open} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{"Editar Role"} </Modal.Title>
      </Modal.Header>
      <FormRole onSubmit={onSubmit} handleClose={handleClose} open={open} textButtonAction="Modificar" roleSelected={roleSelected} />
    </Modal>
  );
};

export default ModalPermission;
