import { OverlayTrigger, Tooltip } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Swal from "sweetalert2";
import { activeUpdate, startDeletignAssingCommission } from "../../actions/AssignCommissions";
import { useAppDispatch } from "../../hooks/redux-hooks";
import useHandleShowComponents from "../../hooks/useHandleShowComponents";
import { AssignCommission } from "../../interfaces/assignCommissions";
import ModalAssingCommissions from "./modalAssignCommissions";

import { validateAction } from "../../helpers/validatePermissions";

interface Props {
  assignCommission: AssignCommission;
  index: number;
}

const AssignCommissionTable = ({ assignCommission, index }: Props) => {
  const { id, name, assignmentID } = assignCommission;
  const dispatch = useAppDispatch();
  const { show, handleShow, handleClose } = useHandleShowComponents();

  const handleUpdateAssignCommission = (assignCommission: AssignCommission) => {
    dispatch(activeUpdate(assignCommission));
    handleShow();
  };

  const handleDeleteAssingCommission = (id: string) => {
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
        Swal.fire("Eliminado!", "El cargo de comisión seleccionada ha sido eliminada.", "success");
        dispatch(startDeletignAssingCommission(id));
      }
    });
  };

  return (
    <>
      <tr>
        <td align="center">{assignmentID}</td>

        <td align="center">{name}</td>

        <td align="center">
          {validateAction("commissions_assign.update") && (
            <OverlayTrigger placement="top" overlay={<Tooltip>Editar Cargo de Comiciones</Tooltip>}>
              <Button variant="success" onClick={() => handleUpdateAssignCommission(assignCommission)}>
                <i className="fas fa-edit" />
              </Button>
            </OverlayTrigger>
          )}
          {validateAction("commissions_assign.remove") && (
            <OverlayTrigger placement="top" overlay={<Tooltip>Eliminar Cargo de Comisión</Tooltip>}>
              <Button variant="danger" onClick={() => handleDeleteAssingCommission(id)}>
                <i className="far fa-trash-alt" />
              </Button>
            </OverlayTrigger>
          )}
        </td>
      </tr>
      <ModalAssingCommissions open={show} handleClose={handleClose} />
    </>
  );
};

export default AssignCommissionTable;
