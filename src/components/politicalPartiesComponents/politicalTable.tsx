import { useEffect } from "react";
import Swal from "sweetalert2";
import { activeUpdated, startDeletePoliticalParty } from "../../actions/piliticalsPartiesAction";
import { useAppDispatch } from "../../hooks/redux-hooks";
import useHandleShowComponents from "../../hooks/useHandleShowComponents";
import ModalPoliticalParty from "./modalPoliticalParty";
import moment from "moment";
import { useGetImage } from "../../hooks/useGetImage";
import { Image, OverlayTrigger, Button, Tooltip } from "react-bootstrap";
import { PoliticalParty } from "../../interfaces/politicalsPartiesInterfaces";
import { validateAction } from "../../helpers/validatePermissions";

interface Props {
  political: PoliticalParty;
  index: number;
}
const PoliticalTable = ({ political, index }: Props) => {
  const { image_path, id, name, abbreviation, foundation_year, ideology } = political;
  const dispatch = useAppDispatch();
  const { show, handleShow, handleClose } = useHandleShowComponents();
  const { photo, getImagePath } = useGetImage();

  useEffect(() => {
    getImagePath(image_path ? image_path : "produccion/political-parties/default-image.png");
    // eslint-disable-next-line
  }, [image_path]);

  const date = moment(Date.parse(foundation_year)).format("L");

  const handleUpdatePolitical = (political: PoliticalParty) => {
    dispatch(activeUpdated(political));
    handleShow();
  };

  const handleDeletePolitical = (id: string) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¡Un partido politico eliminado no se puede recuperar!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Eliminar!",
      cancelButtonText: "No, Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Eliminado!", "El partido político seleccionado ha sido eliminado.", "success");
        dispatch(startDeletePoliticalParty(id));
      }
    });
  };
  return (
    <>
      <tr>
        <td align="center">{index + 1}</td>
        <td align="center">
          <Image src={photo} alt={name} width="100" height="auto" roundedCircle />
        </td>
        <td align="center">{name}</td>
        <td align="center">{abbreviation}</td>
        <td align="center">{date}</td>
        <td align="center">{ideology}</td>
        <td align="center">
          {validateAction("political_parties.update") && (
            <OverlayTrigger placement="top" overlay={<Tooltip>Editar Partido Político</Tooltip>}>
              <Button variant="success" onClick={() => handleUpdatePolitical(political)}>
                <i className="fas fa-edit" />
              </Button>
            </OverlayTrigger>
          )}
        </td>
        <td align="center">
          {validateAction("political_parties.remove") && (
            <OverlayTrigger placement="top" overlay={<Tooltip>Eliminar Partido Político</Tooltip>}>
              <Button variant="danger" onClick={() => handleDeletePolitical(id)}>
                <i className="far fa-trash-alt" />
              </Button>
            </OverlayTrigger>
          )}
        </td>
      </tr>
      <ModalPoliticalParty open={show} handleClose={handleClose} />
    </>
  );
};

export default PoliticalTable;
