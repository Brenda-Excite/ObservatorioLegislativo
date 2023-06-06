import { useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { startAddNewGlobalSettings, startUploadGlobalSettings, resetStateGlobalSetting } from "../../actions/globalSettingsAction";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
interface Props {
  open: boolean;
  handleClose: () => void;
}
type Inputs = {
  id: string;
  plenarySessions: number;

  sessions_per_period: number;
  legislature: { label: string; value: string };
};
const GlobalSettingsFormModal = ({ open, handleClose }: Props) => {
  const dispatch = useAppDispatch();
  const { update, globalSettingSelected } = useAppSelector((state) => state.global_settings);
  const { loading } = useAppSelector((state) => state.ui);
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm<Inputs>();

  useEffect(() => {
    if (globalSettingSelected) {
      setValue("plenarySessions", globalSettingSelected.plenarySessions, { shouldDirty: true });
      /* setValue("commissionSessions", globalSettingSelected.commissionSessions, { shouldDirty: true }); */
      setValue("sessions_per_period", globalSettingSelected.sessions_per_period, { shouldDirty: true });
      setValue("legislature.label", globalSettingSelected.legislature.label, { shouldDirty: true });
    }
    // eslint-disable-next-line
  }, [globalSettingSelected]);

  const handleCancel = () => {
    if (update) {
      dispatch(resetStateGlobalSetting());
    }
    handleClose();
  };
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (update) {
      dispatch(startUploadGlobalSettings(data));
    } else {
      dispatch(startAddNewGlobalSettings(data));
    }
    dispatch(resetStateGlobalSetting());
    handleClose();
  };
  return (
    <Modal show={open} onHide={handleClose}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Header closeButton>
          <Modal.Title>{update ? "Editar configuración global" : "Agregar configuración global"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Legislatura Actual*</Form.Label>
            <Form.Control
              type="text"
              placeholder="0000-0000"
              {...register("legislature.label", {
                required: true,
              })}
              defaultValue={globalSettingSelected?.legislature.label ? globalSettingSelected.legislature.label : ""}
            >
              {errors.legislature && <p className="text-danger">Es requerida la legislatura</p>}
            </Form.Control>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>No. Total de Sesiones Plenarias*:</Form.Label>
            <Controller
              name="plenarySessions"
              control={control}
              render={({ field: { onChange } }) => (
                <Form.Control
                  type="number"
                  min="1"
                  placeholder="Ej: 38"
                  onChange={(e) => onChange(parseInt(e.target.value))}
                  defaultValue={globalSettingSelected?.plenarySessions || ""}
                />
              )}
              rules={{ required: true }}
            />
            {errors.plenarySessions && <p className="text-danger">El campo no. total de sesiones plenarias es requerido</p>}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>No. de Sesiónes por periodo*:</Form.Label>
            <Controller
              name="sessions_per_period"
              control={control}
              render={({ field: { onChange } }) => (
                <Form.Control
                  type="number"
                  min="1"
                  placeholder="Ej: 23"
                  onChange={(e) => onChange(parseInt(e.target.value))}
                  defaultValue={globalSettingSelected?.sessions_per_period || ""}
                />
              )}
              rules={{ required: true }}
            />
            {errors.sessions_per_period && <p className="text-danger">El campo no. de sesiónes por periodo es requerido</p>}
          </Form.Group>
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

export default GlobalSettingsFormModal;
