import { Modal } from "react-bootstrap";

import { SubmitHandler } from "react-hook-form";
import { useAppDispatch } from "../../hooks/redux-hooks";
import { startNewUser /* startUpdatedUser */ } from "../../actions/userAction";
import React from "react";
import FormUser from "./form";
import { Role } from "../../interfaces/roles";

//import { pink } from "@mui/material/colors";

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

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    //console.log({ datos_user: data });
    dispatch(startNewUser(data));

    handleClose();
  };

  return (
    <Modal show={open} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{"Agregar Usuario"} </Modal.Title>
      </Modal.Header>
      <FormUser onSubmit={onSubmit} handleClose={handleClose} isCreate={true} open={open} />
    </Modal>
  );
};

export default ModalUsers;
