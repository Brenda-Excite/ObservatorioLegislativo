import { useState, useEffect } from "react";
import { Form, Modal, Spinner, Button } from "react-bootstrap";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import Select from "react-select";
import { Col, Row } from "reactstrap";
import { startCalculateRanking } from "../../actions/rankingActions";
import { showAlert } from "../../helpers/messagesNotifications";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { Politician } from "../../interfaces/politiciansInterface";

interface Props {
  open: boolean;
  handleClose: () => void;
}

type Inputs = {
  politician_assistance: number;
  participations_in_plenary_session_politician: number;
  initiatives_presented_politician: number;
  initiatives_approved_politician: number;
  initiatives_presented_congress: number;
  transparency: number;
  legislature: { label: string; value: string };
};

const ModalRanking = ({ open, handleClose }: Props) => {
  const dispatch = useAppDispatch();

  const { politicians } = useAppSelector((state) => state.dataSelects);
  const { settings } = useAppSelector((state) => state.global_settings);
  const { loading } = useAppSelector((state) => state.ui);
  const {
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm<Inputs>();
  const [politician, setPolitician] = useState<Politician[]>([]);
  const [id, setId] = useState("");
  const [spinner, setSpinner] = useState(false);
  const optionsPoliticians = politicians.map((politician: any) => {
    const option = { label: politician.name, value: politician.id };
    return option;
  });

  useEffect(() => {
    if (politician.length > 0) {
      setValue("politician_assistance", politician[0].indicators.politician_assistance);
      setValue("participations_in_plenary_session_politician", politician[0].indicators.participations_in_plenary_session_politician);
      setValue("initiatives_presented_politician", politician[0].indicators.initiatives_presented_politician);
      setValue("initiatives_approved_politician", politician[0].indicators.initiatives_approved_politician);
      setValue("initiatives_presented_congress", politician[0].indicators.initiatives_presented_congress);
    }
    // eslint-disable-next-line
  }, [politician]);

  const handleChangeSelect = (option: any): void => {
    const politician = politicians.filter((politician: { id: any }) => politician.id === option.value);
    setId(option.value);
    setPolitician(politician);
  };

  useEffect(() => {
    setSpinner(true);
    setTimeout(() => {
      setSpinner(false);
    }, 1500);
    // eslint-disable-next-line
  }, [politician]);

  const handleCancel = () => {
    setPolitician([]);
    setId("");
    handleClose();
  };

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (!settings.length) {
      showAlert("Acción no permitada", "Debés de agregar las configuraciones globales para poder hacer el cálculo del ranking", "warning");
      return;
    }
    if (!politician.length) {
      showAlert("Acción no permitada", "Selecciona un diputado y llena todos los campos", "warning");
      return;
    }
    if (data.politician_assistance > settings[0].legislature) {
      showAlert("No permitido", "El número de asistencias del diputado no puede ser mayor al número de sesiones plenarias", "warning");
      return;
    }

    if (data.politician_assistance > settings[0].plenarySessions) {
      showAlert("No permitido", "El número de asistencias del diputado no puede ser mayor al número de sesiones plenarias", "warning");
      return;
    }

    if (data.politician_assistance > settings[0].commissionSessions) {
      showAlert("No permitido", "El número de asistencias del diputado no puede ser mayor al número de sesiones de la comisión", "warning");
      return;
    }

    if (data.participations_in_plenary_session_politician > settings[0].sessions_per_period) {
      showAlert("No permitido", "El número de participaciones en pleno no debé de ser mayor al número de sesiones por periodo", "warning");
      return;
    }

    if (data.initiatives_presented_politician > data.initiatives_presented_congress) {
      showAlert(
        "No permitido",
        "El número de iniciativas presentadas del diputado no debé de ser mayor al número de iniciativas presentadas en el congreso",
        "warning"
      );
      return;
    }

    if (data.initiatives_approved_politician > data.initiatives_presented_politician) {
      showAlert(
        "No permitido",
        "El número de iniciativas aprobadas del diputado no debé de ser mayor al número de iniciativas presentadas por el diputado",
        "warning"
      );
      return;
    }
    data.transparency = politicians[0].percentile_Indicators.transparency;
    dispatch(startCalculateRanking(data, id));
    setPolitician([]);
    setId("");
    handleClose();
  };

  return (
    <Modal show={open} onHide={handleClose} size="lg">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Header>
          <Modal.Title>Modificar Ranking</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h6 className="heading-small text-muted mb-4">Selecciona un diputado</h6>
          <Select options={optionsPoliticians} placeholder="Selecciona un diputado" onChange={handleChangeSelect} />
          {!politician.length ? null : spinner ? (
            <div className="d-flex justify-content-center align-items-center h-100 pt-5">
              <Spinner animation="grow" variant="info" size="sm" />
              <Spinner animation="grow" variant="info" />
            </div>
          ) : settings.length ? (
            <>
              <hr className="my-4" />
              <h6 className="heading-small text-muted mb-4">Configuración Global</h6>
              <Row>
                <Col lg="6">
                  <label>Legislatura</label>
                  <p>{settings[0].legislature.labe}</p>
                </Col>
                <Col lg="6">
                  <label>No. Total de Sesiones Plenarias</label>

                  <p>{settings[0].plenarySessions}</p>
                </Col>
                <Col lg="6">
                  <label> No. Total de Sesiones de la Comisiónes</label>
                  <p>{settings[0].plenarySessions}</p>
                </Col>
                <Col lg="6">
                  <label>No. De sesiones por periodo </label>
                  <p>{settings[0].sessions_per_period}</p>
                </Col>
              </Row>
              <hr className="my-4" />
              <h6 className="heading-small text-muted mb-4">Datos Adicionales</h6>
              <Row>
                <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>No. de asistencias:</Form.Label>
                    <Controller
                      name="politician_assistance"
                      control={control}
                      render={({ field: { onChange } }) => (
                        <Form.Control
                          type="number"
                          min="1"
                          placeholder="Ej: 20"
                          onChange={(e) => onChange(parseInt(e.target.value))}
                          defaultValue={politician ? politician[0].indicators.politician_assistance : 0}
                        />
                      )}
                      rules={{ required: true }}
                    />
                    {errors.politician_assistance && <p className="text-danger">El No. de asistencias del diputado es requerido</p>}
                  </Form.Group>
                </Col>

                <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>No. de participaciones en pleno:</Form.Label>
                    <Controller
                      name="participations_in_plenary_session_politician"
                      control={control}
                      render={({ field: { onChange } }) => (
                        <Form.Control
                          type="number"
                          min="1"
                          placeholder="Ej: 10"
                          onChange={(e) => onChange(parseInt(e.target.value))}
                          defaultValue={politician ? politician[0].indicators.participations_in_plenary_session_politician : 1}
                        />
                      )}
                      rules={{ required: true }}
                    />
                    {errors.participations_in_plenary_session_politician && (
                      <p className="text-danger">El No. de participaciones en pleno del diputado es requerido</p>
                    )}
                  </Form.Group>
                </Col>
                <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>No. de iniciativas presentadas en el congreso:</Form.Label>
                    <Controller
                      name="initiatives_presented_congress"
                      control={control}
                      render={({ field: { onChange } }) => (
                        <Form.Control
                          type="number"
                          placeholder="Ej:7"
                          min="1"
                          onChange={(e) => onChange(parseInt(e.target.value))}
                          defaultValue={politician ? politician[0].indicators.initiatives_presented_congress : 1}
                        />
                      )}
                      rules={{ required: true }}
                    />
                    {errors.initiatives_presented_congress && <p className="text-danger">El No. de iniciativas presentadas en el congreso es requerido</p>}
                  </Form.Group>
                </Col>
                <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>No. de iniciativas presentadas:</Form.Label>
                    <Controller
                      name="initiatives_presented_politician"
                      control={control}
                      render={({ field: { onChange } }) => (
                        <Form.Control
                          type="number"
                          placeholder="Ej: 10"
                          min="1"
                          onChange={(e) => onChange(parseInt(e.target.value))}
                          defaultValue={politician ? politician[0].indicators.initiatives_presented_politician : 1}
                        />
                      )}
                      rules={{ required: true }}
                    />
                    {errors.initiatives_presented_politician && <p className="text-danger">El No. de iniciativas presentadas del diputado es requerido</p>}
                  </Form.Group>
                </Col>
                <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>No. de iniciativas aprobadas:</Form.Label>
                    <Controller
                      name="initiatives_approved_politician"
                      control={control}
                      render={({ field: { onChange } }) => (
                        <Form.Control
                          type="number"
                          min="1"
                          placeholder="Ej: 5"
                          onChange={(e) => onChange(parseInt(e.target.value))}
                          defaultValue={politician ? politician[0].indicators.initiatives_approved_politician : 1}
                        />
                      )}
                      rules={{ required: true }}
                    />
                    {errors.initiatives_approved_politician && <p className="text-danger">El No. de iniciativas aprobadas del diputado es requerido</p>}
                  </Form.Group>
                </Col>
              </Row>
            </>
          ) : (
            <>
              <hr className="my-4" />
              <h6 className="heading-small text-muted mb-4">Aún no has agregado las configuraciones globales</h6>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleCancel}>
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

export default ModalRanking;
