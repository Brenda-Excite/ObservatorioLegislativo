import PropTypes from "prop-types";
import { OverlayTrigger, Tooltip, Button } from "react-bootstrap";
//import Swal from "sweetalert2";
import { activeUpdated, /* startDeletingLegislatures */ } from "../../actions/legislatureActions";
import { useAppDispatch } from "../../hooks/redux-hooks";
import useHandleShowComponents from "../../hooks/useHandleShowComponents";
import { Legislature } from "../../interfaces/legislaturesInterfaces";
import ModalLegislature from "./modalLegislature";
interface Props {
  legislature: Legislature;
  index: number;
}

const LegislatureTable = ({ legislature, index }: Props) => {
  const { /* id, */ name } = legislature;

  const dispatch = useAppDispatch();
  const { show, handleShow, handleClose } = useHandleShowComponents();

  const handleUpdateLegislature = (legislature: Legislature) => {
    dispatch(activeUpdated(legislature));
    handleShow();
  };

  /* const handleDeleteLegislature = (id: string) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¡Una legislatura eliminada no se puede recuperar!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Eliminar!",
      cancelButtonText: "No, Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Eliminado!", "La legislatura seleccionada ha sido eliminada.", "success");
        dispatch(startDeletingLegislatures(id));
      }
    });
  };
 */
  return (
    <>
      <tr>
        <td align="center">{index + 1}</td>
        <td align="center">{name}</td>
        <td align="center">
          <OverlayTrigger placement="top" overlay={<Tooltip>Editar Legislatura</Tooltip>}>
            <Button variant="success" onClick={() => handleUpdateLegislature(legislature)}>
              <i className="fas fa-edit" />
            </Button>
          </OverlayTrigger>
          {/* <OverlayTrigger
            placement="top"
            overlay={<Tooltip>Eliminar Legislatura</Tooltip>}
          >
            <Button variant="danger" onClick={() => handleDeleteLegislature(id)}>
              <i className="far fa-trash-alt" />
            </Button>
          </OverlayTrigger> */}
        </td>
      </tr>
      <ModalLegislature open={show} handleClose={handleClose} />
    </>
  );
};

LegislatureTable.propTypes = {
  legislature: PropTypes.object.isRequired,
  index: PropTypes.number,
};

export default LegislatureTable;
