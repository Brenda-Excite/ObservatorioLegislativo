import { OverlayTrigger, Tooltip } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { activeUpdate } from "../../actions/permission";
import { useAppDispatch } from "../../hooks/redux-hooks";
import useHandleShowComponents from "../../hooks/useHandleShowComponents";
import { Permission } from "../../interfaces/permissions";
import Modal from "./modal";
import { validateAction } from "../../helpers/validatePermissions";

interface Props {
  permission: Permission;
  index: number;
}

const PermissionTable = ({ permission }: Props) => {
  const { group, text_front, description } = permission;
  const dispatch = useAppDispatch();
  const { show, handleShow, handleClose } = useHandleShowComponents();

  const handleUpdateUser = (permission: Permission) => {
    dispatch(activeUpdate(permission));
    handleShow();
  };

  return (
    <>
      <tr>
        <td align="left">{group}</td>
        <td align="left">{text_front}</td>
        <td align="left">{description}</td>
        <td align="center">
          {validateAction("permissions.update") && (
            <OverlayTrigger placement="top" overlay={<Tooltip>Editar Permiso</Tooltip>}>
              <Button variant="success" onClick={() => handleUpdateUser(permission)}>
                <i className="fas fa-edit" />
              </Button>
            </OverlayTrigger>
          )}
        </td>
      </tr>
      <Modal open={show} handleClose={handleClose} />
    </>
  );
};

export default PermissionTable;
