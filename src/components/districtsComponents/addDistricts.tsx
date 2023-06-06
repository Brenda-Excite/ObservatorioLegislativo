import { useState, createRef, useEffect } from "react";
import { Form, Modal, Button, Row, Col, Table } from "react-bootstrap";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { resetStateDistricts, startNewDistrict, /* startUpdatedDistrict */ } from "../../actions/districtsActions";
import { showAlert } from "../../helpers/messagesNotifications";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import SectionTable from "./sectionTable";

interface Props {
  open: boolean;
  handleClose: () => void;
}
type Inputs = {
  id: string;
  id_district: string;
  num_roman: string;
  name: string;
  nominal: string;
  sections: string[];
};

const ModalDistricts = ({ open, handleClose }: Props) => {
  const inputSectionRef = createRef<HTMLInputElement>();
  const dispatch = useAppDispatch();
  const { update, districtSelected } = useAppSelector((state) => state.district);
  const { loading } = useAppSelector((state) => state.ui);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm<Inputs>({
    defaultValues: districtSelected,
  });

  const [section, setSection] = useState({
    initialSection: "",
    finalSection: "",
  });

  const { initialSection, finalSection } = section;

  const [sections, setSections] = useState<Array<string>>([]);
  const handleChangeSection = (e: React.SyntheticEvent): void => {
    let target = e.target as HTMLInputElement;
    setSection({
      ...section,
      [target.name]: target.value,
    });
  };

  useEffect(() => {
    if (districtSelected) {
      setValue("name", districtSelected.name);
      setValue("id_district", districtSelected.id_district);
      setValue("num_roman", districtSelected.num_roman);
      setValue("nominal", districtSelected.nominal);
      setSections(districtSelected.sections);
    } else {
      setValue("name", "");
      setValue("id_district", "");
      setValue("num_roman", "");
      setValue("nominal", "");
      setSections([]);
    }
    // eslint-disable-next-line
  }, [update, districtSelected]);

  const handleClickConcatSections = () => {
    if (initialSection.length === 0 || finalSection.length === 0) {
      showAlert("Aviso", "El rango de inicio y final de las secciones son requeridos", "warning");
      return;
    }
    const section = `${initialSection}-${finalSection}`;
    setSections([...sections, section]);
    setSection({
      initialSection: "",
      finalSection: "",
    });
  };

  const handleDeleteSection = (s: string) => {
    const newSectionArray = sections.filter((section) => section !== s);
    setSections(newSectionArray);
  };

  const handleCancel = () => {
    dispatch(resetStateDistricts());
    handleClose();
    setSection({
      initialSection: "",
      finalSection: "",
    });
  };

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    data.sections = sections;

    dispatch(startNewDistrict(data));

    setSection({
      initialSection: "",
      finalSection: "",
    });
    handleClose();
  };
  return (
    <Modal show={open} onHide={handleClose}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Header>
          <Modal.Title>{"Agregar Distrito"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-2">
            <Form.Label>Número de Distrito:</Form.Label>
            <Controller
              name="id_district"
              control={control}
              render={({ field }) => <Form.Control {...field} type="number" placeholder="ej: 1" min="0" />}
              rules={{ required: true }}
            />
            {errors.id_district && <p className="text-danger">El Número del distrito es requerido</p>}
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Número en Romano:</Form.Label>
            <Form.Control
              type="text"
              placeholder="ej: XVII"
              {...register("num_roman", {
                required: true,
              })}
            />
            {errors.num_roman && <p className="text-danger">El número en romano del distrito es requerido</p>}
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Nombre del Distrito:</Form.Label>
            <Form.Control
              type="text"
              placeholder="ej: Naucalpan de Juarez"
              {...register("name", {
                required: true,
              })}
            />
            {errors.name && <p className="text-danger">El nombre del distrito es requerido</p>}
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>No. de representados:</Form.Label>
            <Controller
              name="nominal"
              control={control}
              render={({ field }) => <Form.Control {...field} type="number" placeholder="ej: 30100" min="0" />}
              rules={{ required: true }}
            />

            {errors.nominal && <p className="text-danger">El número de representados es requerido</p>}
          </Form.Group>
          <Form.Group>
            <Form.Label>Agrega las secciones</Form.Label>
            <p></p>
            <Form.Label style={{ fontSize: "12px", color: "red" }}>*El rango final debe ser igual o mayor al rango inicial.</Form.Label>
            <Row style={{ marginTop: "10px", alignItems: "center" }}>
              <Col xxl={4} xs={4} xl={4} sm={4} md={4} lg={4}>
                <Form.Control
                  type="number"
                  placeholder="ej: 2575"
                  name="initialSection"
                  onChange={(e) => handleChangeSection(e)}
                  defaultValue={initialSection || ""}
                  ref={inputSectionRef}
                  min="0"
                />
              </Col>
              <Col xxl={1} xs={1} xl={1} sm={1} md={1} lg={1}>
                <h4>-</h4>
              </Col>
              <Col xxl={4} xs={4} xl={4} sm={4} md={4} lg={4}>
                <Form.Control
                  type="number"
                  placeholder="ej: 2596"
                  name="finalSection"
                  onChange={(e) => handleChangeSection(e)}
                  value={finalSection || ""}
                  ref={inputSectionRef}
                  min="0"
                />
              </Col>
              <Col xxl={3} xs={3} xl={3} sm={3} md={3} lg={3}>
                <Button onClick={() => handleClickConcatSections()}>Agregar</Button>
              </Col>
            </Row>
          </Form.Group>
          <Table striped bordered hover size="sm" responsive style={{ marginTop: "15px" }}>
            <tbody>
              {!sections.length ? (
                <tr>
                  <td colSpan={2} align="center">
                    No hay secciones agregadas
                  </td>
                </tr>
              ) : (
                sections.map((section, index) => <SectionTable key={index} section={section} handleDeleteSection={handleDeleteSection} />)
              )}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => handleCancel()}>
            Cerrar
          </Button>
          <Button variant="primary" type="submit" disabled={loading}>
            Guardar
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default ModalDistricts;
