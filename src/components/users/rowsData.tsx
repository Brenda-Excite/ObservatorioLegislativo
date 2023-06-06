import { OverlayTrigger, Tooltip } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Swal from "sweetalert2";
import { activeUpdate, startDeletignUser } from "../../actions/userAction";
import { useAppDispatch } from "../../hooks/redux-hooks";
import useHandleShowComponents from "../../hooks/useHandleShowComponents";
import { User } from "../../interfaces/userInterface";
import ModalUsers from "./editModal";
import { validateAction } from "../../helpers/validatePermissions";

interface Props {
  user: User;
  index: number;
}

const UserTable = ({ user, index }: Props) => {
  const { id, displayName, email, role } = user;
  const dispatch = useAppDispatch();
  const { show, handleShow, handleClose } = useHandleShowComponents();

  const handleUpdateUser = (user: User) => {
    dispatch(activeUpdate(user));
    handleShow();
  };

  const handleDeleteUser = (id: string) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¡Cargo de comisión eliminada no se puedá recuperar!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Eliminar!",
      cancelButtonText: "No, Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Eliminado!", "La comisión seleccionada ha sido eliminada.", "success");
        dispatch(startDeletignUser(id));
      }
    });
  };

  return (
    <>
      <tr>
        <td align="center">{displayName}</td>
        <td align="center">{email}</td>
        <td align="center">{role?.name}</td>
        <td align="center">
          {validateAction("users.update") && (
            <OverlayTrigger placement="top" overlay={<Tooltip>Editar Usuario</Tooltip>}>
              <Button variant="success" onClick={() => handleUpdateUser(user)}>
                <i className="fas fa-edit" />
              </Button>
            </OverlayTrigger>
          )}
          {validateAction("users.remove") && (
            <OverlayTrigger placement="top" overlay={<Tooltip>Eliminar Usuario</Tooltip>}>
              <Button variant="danger" onClick={() => handleDeleteUser(id)}>
                <i className="far fa-trash-alt" />
              </Button>
            </OverlayTrigger>
          )}
        </td>
      </tr>
      <ModalUsers open={show} handleClose={handleClose} />
    </>
  );
};

export default UserTable;
