import { useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import PropTypes from "prop-types";
import { SubmitHandler, useForm } from "react-hook-form";
import { startNewLegislature, /* startUpdatedLegislature */ } from "../../actions/legislatureActions";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";

interface Props {
  open: boolean;
  handleClose: () => void;
}
type Inputs = {
  id: string;
  name: string;
};
const ModalLegislature = ({ open, handleClose }: Props) => {
  const dispatch = useAppDispatch();
  const { /* update, */ legislatureSelected } = useAppSelector((state) => state.legislature);
  const { loading } = useAppSelector((state) => state.ui);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<Inputs>({
    defaultValues: legislatureSelected,
  });

  useEffect(() => {
    if (legislatureSelected) {
      setValue("name", legislatureSelected.name, { shouldDirty: true });
    }

    // eslint-disable-next-line
  }, [legislatureSelected]);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    dispatch(startNewLegislature(data));

    handleClose();
  };

  return (
    <Modal show={open} onHide={handleClose}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Header closeButton>
          <Modal.Title> {"Agregar Legislatura"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Nombre legislatura:</Form.Label>
            <Form.Control
              type="text"
              placeholder="ej: 2021-2024"
              {...register("name", {
                required: true,
              })}
            />
            {errors.name && <p className="text-danger">La fecha de la legislatura es requerida</p>}
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

ModalLegislature.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default ModalLegislature;
