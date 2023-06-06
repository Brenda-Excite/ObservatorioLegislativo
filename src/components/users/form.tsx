import { Form, Modal, Button, InputGroup } from "react-bootstrap";
import { IconButton } from "@mui/material";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { startLoadRoles } from "../../actions/roles";
import { useEffect, useState } from "react";
import { Visibility as VisibilityIcon, VisibilityOff as VisibilityOffIcon } from "@mui/icons-material";

type Inputs = {
  id: string;
  displayName: string;
  email: string;
  user_id: string;
  role_id: string;
  password: string;
};
const FormUser = ({ onSubmit, handleClose, open, isCreate, userSelected }: any) => {
  //pasword
  const [showPassword, setShowPassword] = useState(false);
  const { loading } = useAppSelector((state) => state.ui);
  const { roles } = useAppSelector((state) => state.role);
  const dispatch = useAppDispatch();

  useEffect(
    () => {
      if (roles.length === 0) {
        //console.log("cargar permissions");
        dispatch(startLoadRoles());
      }
    } /* [dispatch] */
  );

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
            <Form.Label>Nombre del Usuario</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ejemplo"
              {...register("displayName", {
                required: true,
              })}
              defaultValue={userSelected?.displayName || ""}
            />
            {errors.displayName && <p className="text-danger">El nombre del usuario es requerido</p>}
          </Form.Group>

          <Form.Group>
            <Form.Label>Correo Electrónico</Form.Label>
            <Form.Control
              type="email"
              placeholder="Ejemplo"
              {...register("email", {
                required: true,
              })}
              defaultValue={userSelected?.email || ""}
            />
            {errors.email && <p className="text-danger">El correo electrónico es requerido</p>}
          </Form.Group>

          <Form.Group>
            <Form.Label>Contraseña</Form.Label>
            <InputGroup className="mb-3">
              <Form.Control
                autoComplete={"false"}
                type={showPassword ? "text" : "password"}
                placeholder="Contraseña"
                {...register("password", {
                  required: isCreate,
                })}
              />
              <IconButton type="button" onClick={() => setShowPassword(!showPassword)} sx={{ borderRadius: "5px", border: "solid 0.5px " }}>
                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </IconButton>
            </InputGroup>
            {errors.password && <p className="text-danger">La contraseña es requerida</p>}
          </Form.Group>

          <Form.Group>
            <Form.Label>Selecciona un rol</Form.Label>
            <Form.Select
              placeholder="Ejemplo"
              {...register("role_id", {
                required: true,
              })}
              defaultValue={userSelected?.role_id || ""}
            >
              {roles.map((rol: any, index: number) => (
                <option key={index} value={rol.id}>
                  {rol.name}
                </option>
              ))}
            </Form.Select>
            {errors.role_id && <p className="text-danger">El rol es requerido</p>}
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Cerra
          </Button>
          <Button variant="primary" type="submit" disabled={loading}>
            {isCreate ? "Agregar" : "Modificar"}
          </Button>
        </Modal.Footer>
      </Form>
    </>
  );
};

export default FormUser;
