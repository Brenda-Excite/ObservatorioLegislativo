import { useEffect } from "react";
import { Button, Image, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { activeUpdatePolitician, startDeletePolitician } from "../../actions/politiciansAction";
import { useAppDispatch } from "../../hooks/redux-hooks";
import { useGetImage } from "../../hooks/useGetImage";
import useHandleShowComponents from "../../hooks/useHandleShowComponents";
import { Politician } from "../../interfaces/politiciansInterface";
import ModalPoliticians from "./modalPoliticians";
import { validateAction } from "../../helpers/validatePermissions";
interface Props {
  politician: Politician;
  index: number;
}
const PoliticianTable = ({ politician, index }: Props) => {
  const { id, name, image_path, political_party, election, district } = politician;

  const dispatch = useAppDispatch();
  const { show, handleShow, handleClose } = useHandleShowComponents();
  const { photo, getImagePath } = useGetImage();

  useEffect(() => {
    getImagePath(image_path ? image_path : "produccion/political-parties/default-image.png");
    // eslint-disable-next-line
  }, [image_path]);

  const handleUpdatePolitician = (politician: Politician) => {
    dispatch(activeUpdatePolitician(politician));
    handleShow();
  };

  const handleDelete = (id: string) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¡Un político eliminado no se puede recuperar!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Eliminar!",
      cancelButtonText: "No, Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Eliminado!", "El político asignado ha sido eliminado.", "success");
        dispatch(startDeletePolitician(id));
      }
    });
  };
  return (
    <>
      <tr>
        <td align="center">{index + 1}</td>
        <td align="center">
          <Image src={photo} alt={name} width="80" height="auto" roundedCircle />
        </td>
        <td align="center">{name}</td>
        <td align="center">{political_party.value}</td>
        {/*  <td align="center">{commission.label}</td> */}
        <td align="center">{election}</td>
        <td align="center">{district?.label ? district.label : "N/A"}</td>
        <td align="center">
          {validateAction("politicians.show") && (
            <OverlayTrigger placement="top" overlay={<Tooltip>Ver Más ...</Tooltip>}>
              <Link to={`/politician-show/${id}`}>
                <Button variant="warning">
                  <i className="fas fa-eye" />
                </Button>
              </Link>
            </OverlayTrigger>
          )}
        </td>

        <td align="center">
          {validateAction("politicians.update") && (
            <OverlayTrigger placement="top" overlay={<Tooltip>Editar Político</Tooltip>}>
              <Button variant="success" onClick={() => handleUpdatePolitician(politician)}>
                <i className="fas fa-edit" />
              </Button>
            </OverlayTrigger>
          )}
        </td>

        <td align="center">
          {validateAction("politicians.remove") && (
            <OverlayTrigger placement="top" overlay={<Tooltip>Eliminar Político</Tooltip>}>
              <Button variant="danger" onClick={() => handleDelete(id)}>
                <i className="far fa-trash-alt" />
              </Button>
            </OverlayTrigger>
          )}
        </td>
      </tr>
      <ModalPoliticians open={show} handleClose={handleClose} />
    </>
  );
};

export default PoliticianTable;
