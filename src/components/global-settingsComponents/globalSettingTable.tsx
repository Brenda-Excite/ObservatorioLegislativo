import React from "react";
import { OverlayTrigger, Tooltip, Button } from "react-bootstrap";
//import Swal from "sweetalert2";
import { activeUpdatedSetting /* startDeleteGlobalSetting */ } from "../../actions/globalSettingsAction";
import { useAppDispatch } from "../../hooks/redux-hooks";
import { GlobalSettings } from "../../interfaces/globalSettingsInterface";
import GlobalSettingsFormModal from "./globalSettingsFormModal";
import useHandleShowComponents from "../../hooks/useHandleShowComponents";

import { validateAction } from "../../helpers/validatePermissions";

interface Props {
  setting: GlobalSettings;
}

const GlobalSettingTable = ({ setting }: Props) => {
  const { plenarySessions, sessions_per_period, legislature } = setting;

  const dispatch = useAppDispatch();
  const { show, handleShow, handleClose } = useHandleShowComponents();

  const handleUpdateGlobalSetting = (setting: GlobalSettings) => {
    dispatch(activeUpdatedSetting(setting));
    handleShow();
  };

  /* const handleDeleteGlobalSetting = (id: string) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¡Una configuración eliminada no se puede recuperar!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Eliminar!",
      cancelButtonText: "No, Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Eliminado!", "La comisión seleccionada ha sido eliminada.", "success");
        dispatch(startDeleteGlobalSetting(id));
      }
    });
  }; */
  return (
    <>
      <tr>
        <td align="center">{legislature.label}</td>
        <td align="center">{plenarySessions}</td>

        <td align="center">{sessions_per_period}</td>
        <td align="center">
          {validateAction("global_settings.update") && (
            <OverlayTrigger placement="top" overlay={<Tooltip>Editar configuración</Tooltip>}>
              <Button variant="success" onClick={() => handleUpdateGlobalSetting(setting)}>
                <i className="fas fa-edit" />
              </Button>
            </OverlayTrigger>
          )}
        </td>
      </tr>
      <GlobalSettingsFormModal open={show} handleClose={handleClose} />
    </>
  );
};

export default GlobalSettingTable;
