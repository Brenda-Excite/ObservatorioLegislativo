import { Form, Modal, Button } from "react-bootstrap";
import { Tooltip, IconButton } from "@mui/material";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { startLoadPermissions } from "../../actions/permission";
import { useEffect } from "react";
import { Help as HelpIcon } from "@mui/icons-material";
type Inputs = {
  id: string;
  name: string;
  permissions: Array<string>;
};

const FormRole = ({ onSubmit, handleClose, open, textButtonAction, roleSelected }: any) => {
  const { loading } = useAppSelector((state) => state.ui);
  const { permissions } = useAppSelector((state) => state.permission);
  const dispatch = useAppDispatch();

  let title_groups: Array<string> = [];
  permissions
    .map((p: any) => p.group)
    .forEach((element: any) => {
      if (!title_groups.includes(element)) {
        //console.log({ element });
        title_groups.push(element);
      }
    });

  //console.log({ title_groups });
  useEffect(() => {
    if (permissions.length === 0) {
      //console.log("cargar permissions");
      dispatch(startLoadPermissions());
    }

    // eslint-disable-next-line
  }, [dispatch]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Nombre del Role</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ejemplo"
              {...register("name", {
                required: true,
              })}
              defaultValue={roleSelected?.name || ""}
            />
            {errors.name && <p className="text-danger">El rol es requerido</p>}
          </Form.Group>

          <Form.Group>
            <Form.Label>Seleccione los permisos</Form.Label>
            {title_groups.map((title: string, index: number) => (
              <div key={index} className="mb-4">
                <h2>{title}</h2>
                <div>
                  {permissions
                    .filter((permiso: any) => permiso.group === title)
                    .map((permiso: any, index2: number) => {
                      let isChecked = true;
                      if (roleSelected) {
                        isChecked = roleSelected.permissions.includes(permiso.id);
                      }
                      return (
                        <div key={index2} className="d-flex align-items-center gap-2">
                          <div>
                            <Form.Check type="checkbox" label={permiso.text_front} defaultValue={permiso.id} defaultChecked={isChecked} {...register("permissions", { required: true })} />
                          </div>
                          {permiso.description && (
                            <div>
                              <Tooltip title={permiso.description}>
                                <IconButton size="small">
                                  <HelpIcon />
                                </IconButton>
                              </Tooltip>
                            </div>
                          )}
                        </div>
                      );
                    })}
                </div>
              </div>
            ))}

            {errors.permissions && <p className="text-danger">Seleccione al menos un permiso</p>}
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Cerra
          </Button>
          <Button variant="primary" type="submit" disabled={loading}>
            {textButtonAction}
          </Button>
        </Modal.Footer>
      </Form>
    </>
  );
};

export default FormRole;
