import { OverlayTrigger, Tooltip } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Swal from "sweetalert2";
import { activeUpdate, showSections, startDeleteDistrict } from "../../actions/districtsActions";
import { useAppDispatch } from "../../hooks/redux-hooks";
import useHandleShowComponents from "../../hooks/useHandleShowComponents";
import { District } from "../../interfaces/districtsInterfaces";
import ModalDistricts from "./modalDistricts";
import ModalSections from "./modalSections";

import { validateAction } from "../../helpers/validatePermissions";

interface Props {
  district: District;
}

const DistrictTable = ({ district }: Props) => {
  const { id, id_district, num_roman, name, nominal } = district;
  const dispatch = useAppDispatch();
  const { show: showForm, handleShow: handleShowForm, handleClose: handleCloseForm } = useHandleShowComponents();
  const { show: showSection, handleShow: handleShowSections, handleClose: handleCloseSections } = useHandleShowComponents();

  const handleUpdateDistrict = (district: District) => {
    dispatch(activeUpdate(district));
    handleShowForm();
  };

  const showModalSections = (district: District) => {
    dispatch(showSections(district.sections));
    handleShowSections();
  };

  const handleDeleteDistrict = (id: string) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¡Un distrito eliminado no se puede recuperar!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Eliminar!",
      cancelButtonText: "No, Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Eliminado!", "El distrito seleccionado ha sido eliminado.", "success");
        dispatch(startDeleteDistrict(id));
      }
    });
  };

  return (
    <>
      <tr>
        <td align="center">{id_district}</td>
        <td align="center">{num_roman}</td>
        <td align="center">{name}</td>
        <td align="center">{nominal}</td>
        <td align="center">
          {validateAction("district.show") && (
            <OverlayTrigger placement="top" overlay={<Tooltip>Ver Secciones</Tooltip>}>
              <Button variant="info" onClick={() => showModalSections(district)}>
                <i className="fas fa-eye" />
              </Button>
            </OverlayTrigger>
          )}
          {validateAction("district.update") && (
            <OverlayTrigger placement="top" overlay={<Tooltip>Editar Distrito</Tooltip>}>
              <Button variant="success" onClick={() => handleUpdateDistrict(district)}>
                <i className="fas fa-edit" />
              </Button>
            </OverlayTrigger>
          )}
          {validateAction("district.remove") && (
            <OverlayTrigger placement="top" overlay={<Tooltip>Eliminar Distrito</Tooltip>}>
              <Button variant="danger" onClick={() => handleDeleteDistrict(id)}>
                <i className="far fa-trash-alt" />
              </Button>
            </OverlayTrigger>
          )}
        </td>
      </tr>
      <ModalDistricts open={showForm} handleClose={handleCloseForm} />
      <ModalSections open={showSection} handleClose={handleCloseSections} />
    </>
  );
};

export default DistrictTable;
