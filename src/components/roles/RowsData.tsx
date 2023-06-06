import { OverlayTrigger, Tooltip } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { activeUpdate } from "../../actions/roles";
import { useAppDispatch } from "../../hooks/redux-hooks";
import useHandleShowComponents from "../../hooks/useHandleShowComponents";
import { Role } from "../../interfaces/roles";
import Modal from "./editModal";

interface Props {
  role: Role;
  index: number;
}

const PermissionTable = ({ role }: Props) => {
  const { name, permissions } = role;
  const dispatch = useAppDispatch();
  const { show, handleShow, handleClose } = useHandleShowComponents();

  const handleUpdateUser = (role: Role) => {
    dispatch(activeUpdate(role));
    handleShow();
  };

  return (
    <>
      <tr>
        <td align="center">{name}</td>
        <td align="center">{permissions.length || 0}</td>
        <td align="center">
          <OverlayTrigger placement="top" overlay={<Tooltip>Editar Permiso</Tooltip>}>
            <Button variant="success" onClick={() => handleUpdateUser(role)}>
              <i className="fas fa-edit" />
            </Button>
          </OverlayTrigger>
        </td>
      </tr>
      <Modal open={show} handleClose={handleClose} />
    </>
  );
};

export default PermissionTable;
