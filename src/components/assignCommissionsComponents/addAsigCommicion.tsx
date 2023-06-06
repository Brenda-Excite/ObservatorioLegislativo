import { Modal, Button, Form } from "react-bootstrap";
import PropTypes from "prop-types";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { startNewAssignCommission /* startUpdatedAssignCommission */ } from "../../actions/AssignCommissions";

interface Props {
  open: boolean;
  handleClose: () => void;
}
type Inputs = {
  id: string;
  name: string;
  assignmentID: string;
};

const ModalAssignCommissions = ({ open, handleClose }: Props) => {
  const dispatch = useAppDispatch();

  useAppSelector((state) => state.assignCommission);
  const { loading } = useAppSelector((state) => state.ui);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    dispatch(startNewAssignCommission(data));

    handleClose();
  };

  return (
    <Modal show={open} onHide={handleClose}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Header closeButton>
          <Modal.Title>{"Agregar Cargo Comición"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>ID Cargo de Comisión:</Form.Label>
            <Form.Control
              type="text"
              placeholder="ej:A "
              {...register("assignmentID", {
                required: true,
              })}
            />
            {errors.name && <p className="text-danger">El ID del cargo de comisión es requerida</p>}
          </Form.Group>
          <Form.Group>
            <Form.Label>Nombre Cargo de Comisión:</Form.Label>
            <Form.Control
              type="text"
              placeholder="ej:ejemplo"
              {...register("name", {
                required: true,
              })}
            />
            {errors.name && <p className="text-danger">El nombre del cargo de comisión es requerida</p>}
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant="primary" type="submit" disabled={loading}>
            Guardar
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

ModalAssignCommissions.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};
export default ModalAssignCommissions;
