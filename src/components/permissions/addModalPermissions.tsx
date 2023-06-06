import { Modal, Button, Form } from "react-bootstrap";

import { SubmitHandler, useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { startNewPermission } from "../../actions/permission";

interface Props {
  open: boolean;
  handleClose: () => void;
}

type Inputs = {
  id: string;
  group: string;
  permission: string;
  text_front: string;
  description: string;
};

const ModalAddPermission = ({ open, handleClose }: Props) => {
  const dispatch = useAppDispatch();
  const { permissionSelected } = useAppSelector((state) => state.permission);
  const { loading } = useAppSelector((state) => state.ui);
  //console.log({ permissionSelected });

  const {
    register,
    handleSubmit,
    /*     formState: { errors }, */
  } = useForm<Inputs>({
    defaultValues: permissionSelected,
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    dispatch(startNewPermission(data));
    handleClose();
  };

  return (
    <Modal show={open} onHide={handleClose}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Header closeButton>
          <Modal.Title>{"Agregar Permiso"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mt-4">
            <Form.Label>Grupo</Form.Label>
            <Form.Control
              type="text"
              placeholder="ejemplo"
              {...register("group", {
                required: true,
              })}
              defaultValue={permissionSelected?.group ? permissionSelected.group : ""}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mt-4">
            <Form.Label>Permiso</Form.Label>
            <Form.Control
              type="text"
              placeholder="ejemplo:permisions.create"
              {...register("permission", {
                required: true,
              })}
              defaultValue={permissionSelected?.permisions ? permissionSelected.permisions : ""}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mt-4">
            <Form.Label>Descripcion Corta</Form.Label>
            <Form.Control
              type="text"
              placeholder="ejemplo"
              {...register("text_front", {
                required: true,
              })}
              defaultValue={permissionSelected?.text_front ? permissionSelected.text_front : ""}
            ></Form.Control>
          </Form.Group>

          <Form.Group className="mt-4">
            <Form.Label>Descripcion Larga</Form.Label>
            <Form.Control
              type="text"
              placeholder="ejemplo"
              {...register("description", {
                required: false,
              })}
              defaultValue={permissionSelected?.description ? permissionSelected.description : ""}
            >
              {/*   {errors.description && <p className="text-danger">La Descripcion larga es requerida</p>} */}
            </Form.Control>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Cerra
          </Button>
          <Button variant="primary" type="submit" disabled={loading}>
            Guardar
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default ModalAddPermission;
