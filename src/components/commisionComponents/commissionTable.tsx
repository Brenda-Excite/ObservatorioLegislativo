import { OverlayTrigger, Tooltip } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Swal from "sweetalert2";
import { activeUpdate, startDeletingCommission } from "../../actions/commissionActions";
import { useAppDispatch } from "../../hooks/redux-hooks";
import useHandleShowComponents from "../../hooks/useHandleShowComponents";
import { Commission } from "../../interfaces/commissionsInterfaces";
import ModalCommissions from "./modalCommissions";
import "../../styles/table.css";
import { validateAction } from "../../helpers/validatePermissions";

interface Props {
  commission: Commission;
  index: number;
}

const CommissionTable = ({ commission, index }: Props) => {
  const { id, name, description, commission_id, no_sessions_commission } = commission;
  const dispatch = useAppDispatch();
  const { show, handleShow, handleClose } = useHandleShowComponents();

  const handleUpdateCommission = (commission: Commission) => {
    dispatch(activeUpdate(commission));
    handleShow();
  };
  const handleDeleteCommission = (id: string) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¡Una comisión eliminada no se puede recuperar!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Eliminar!",
      cancelButtonText: "No, Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Eliminado!", "La comisión seleccionada ha sido eliminada.", "success");
        dispatch(startDeletingCommission(id));
      }
    });
  };
  return (
    <>
      <tr>
        <td align="center">{commission_id}</td>
        <td align="center" className="tableTexr">
          {name}
        </td>
        <td align="center">{no_sessions_commission}</td>

        <td align="center" className="tableTexr">
          {description}
        </td>
        <td align="center">
          {validateAction("commissions.update") && (
            <OverlayTrigger placement="top" overlay={<Tooltip>Editar Comicion</Tooltip>}>
              <Button variant="success" onClick={() => handleUpdateCommission(commission)}>
                <i className="fas fa-edit" />
              </Button>
            </OverlayTrigger>
          )}
        </td>
        <td align="center">
          {validateAction("commissions.remove") && (
            <OverlayTrigger placement="top" overlay={<Tooltip>Eliminar Comisión</Tooltip>}>
              <Button variant="danger" onClick={() => handleDeleteCommission(id)}>
                <i className="far fa-trash-alt" />
              </Button>
            </OverlayTrigger>
          )}
        </td>
      </tr>
      <ModalCommissions open={show} handleClose={handleClose} />
    </>
  );
};

export default CommissionTable;
