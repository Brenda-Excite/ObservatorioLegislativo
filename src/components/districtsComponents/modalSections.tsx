import { Modal, Table, Button } from "react-bootstrap";
import { resetStateDistricts } from "../../actions/districtsActions";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";

interface Props {
  open: boolean;
  handleClose: () => void;
}

const ModalSections = ({ open, handleClose }: Props) => {
  const { sections } = useAppSelector((state) => state.district);
  const dispatch = useAppDispatch();

  const handleCloseSections = () => {
    dispatch(resetStateDistricts());
    handleClose();
  };

  return (
    <Modal show={open} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title>Secciones</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table
          striped
          bordered
          hover
          size="sm"
          responsive
          style={{ marginTop: "15px" }}
        >
          <tbody>
            {!sections.length ? (
              <tr>
                <td align="center" colSpan={2}>
                  No se encuentran secciones registradas del distrito
                  seleccionado
                </td>
              </tr>
            ) : (
              sections.map((section: string[], index: number) => (
                <tr key={index}>
                  <td align="center">{index + 1}</td>
                  <td align="center">{section}</td>
                  <td></td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => handleCloseSections()}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalSections;
