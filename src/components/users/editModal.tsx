import { Modal } from "react-bootstrap";

import { SubmitHandler } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { startUpdatedUser } from "../../actions/userAction";

import FormUser from "./form";
import { Role } from "../../interfaces/roles";

interface Props {
  open: boolean;
  handleClose: () => void;
}

type Inputs = {
  id: string;
  displayName: string;
  email: string;
  user_id: string;
  role_id: string;
  role: Role;
  password: string;
};

const ModalUsers = ({ open, handleClose }: Props) => {
  const dispatch = useAppDispatch();
  const { /* update, */ userSelected } = useAppSelector((state) => state.user);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    //console.log(data);

    dispatch(startUpdatedUser(data));

    handleClose();
  };

  return (
    <Modal show={open} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{"Editar Usuario"} </Modal.Title>
      </Modal.Header>
      <FormUser onSubmit={onSubmit} handleClose={handleClose} open={open} isCreate={false} userSelected={userSelected} />
    </Modal>
  );
};

export default ModalUsers;
