import { Modal, Button, Form } from "react-bootstrap";
import PropTypes from "prop-types";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { startNewCommission, startUpdatedCommission } from "../../actions/commissionActions";

interface Props {
  open: boolean;
  handleClose: () => void;
}
type Inputs = {
  id: string;
  commission_id: string;
  name: string;
  description: string;
  no_sessions_commission: number;
};
const ModalCommissions = ({ open, handleClose }: Props) => {
  const dispatch = useAppDispatch();
  const { update, commissionSelected } = useAppSelector((state) => state.commission);

  const { loading } = useAppSelector((state) => state.ui);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (update) {
      dispatch(startUpdatedCommission(data));
    } else {
      dispatch(startNewCommission(data));
    }

    handleClose();
  };

  return (
    <Modal show={open} onHide={handleClose}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Header closeButton>
          <Modal.Title> {update ? "Editar Comisión" : "Agregar Comisión"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>ID Comisión:</Form.Label>
            <Form.Control
              type="text"
              placeholder="0"
              {...register("commission_id", {
                required: true,
              })}
              defaultValue={commissionSelected?.commission_id ? commissionSelected.commission_id : ""}
            />
            {errors.commission_id && <p className="text-danger">El ID de la comisión es requerida</p>}
          </Form.Group>
          <Form.Group>
            <Form.Label>Nombre Comisión:</Form.Label>
            <Form.Control
              type="text"
              placeholder="ej:Agricultura y Ganadería"
              {...register("name", {
                required: true,
              })}
              defaultValue={commissionSelected?.name ? commissionSelected.name : ""}
            />
            {errors.name && <p className="text-danger">El nombre de la comisión es requerida</p>}
          </Form.Group>
          <Form.Group>
            <Form.Label>Número Comisión:</Form.Label>
            <Form.Control
              type="text"
              placeholder="0"
              {...register("no_sessions_commission", {
                required: true,
              })}
              defaultValue={commissionSelected?.no_sessions_commission ? commissionSelected.no_sessions_commission : ""}
            />
            {errors.no_sessions_commission && <p className="text-danger">El número de la comisión es requerida</p>}
          </Form.Group>
          <Form.Group>
            <Form.Label>Descripción de la comisión:</Form.Label>
            <Form.Control
              as="textarea"
              aria-label="with textare"
              rows={5}
              placeholder="ej: Plantean la necesidad de que el Ejecutivo..."
              {...register("description", {
                required: true,
              })}
              defaultValue={commissionSelected?.description ? commissionSelected.description : ""}
            />
            {errors.name && <p className="text-danger">La descripción es requerida</p>}
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

ModalCommissions.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default ModalCommissions;
