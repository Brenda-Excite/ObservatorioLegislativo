import { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { startNewPoliticalParty, /* startUpdatedPoliticalParty */ } from "../../actions/piliticalsPartiesAction";
import PropTypes from "prop-types";
import ReactDatePicker from "react-datepicker";
import useUploadImage from "../../hooks/useUploadImage";
import ImageUploader from "react-images-upload";

interface Props {
  open: boolean;
  handleClose: () => void;
}
type Inputs = {
  id: string;
  image_path: string;
  name: string;
  abbreviation: string;
  foundation_year: string;
  ideology: string;
};
const ModalPoliticalParty = ({ open, handleClose }: Props) => {
  const dispatch = useAppDispatch();
  const { /* update, */ politicalSelected } = useAppSelector((state) => state.political);
  const { pictures, onDrop } = useUploadImage();
  const [startDate, setStartDate] = useState(new Date());
  const { loading } = useAppSelector((state) => state.ui);
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm<Inputs>();

  useEffect(() => {
    if (politicalSelected) {
      setStartDate(new Date(politicalSelected.foundation_year));
      setValue("foundation_year", politicalSelected.foundation_year, { shouldDirty: true });
    }

    // eslint-disable-next-line
  }, [politicalSelected]);

  const handleChangeDate = (date: any) => {
    setStartDate(date);
    setValue("foundation_year", date.toString(), { shouldDirty: true });
  };

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    dispatch(startNewPoliticalParty(data, pictures));

    handleClose();
  };

  return (
    <Modal show={open} onHide={handleClose}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Header closeButton>
          <Modal.Title> {"Agregar Partido Político"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <ImageUploader
              withIcon={false}
              buttonText="Escoge una imagen"
              onChange={onDrop}
              imgExtension={[".jpg", ".jpeg", ".png"]}
              accept="acepta .jpg | .jpeg | .png"
              maxFileSize={5242880}
              withPreview
              singleImage
              label="Acepta JPEG | JPG | PNG"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Nombre Partido Político:</Form.Label>
            <Form.Control
              type="text"
              placeholder="ej: Partido Acción Nacional"
              {...register("name", {
                required: true,
              })}
            />
            {errors.name && <p className="text-danger">El nombre del partido político es requerido</p>}
          </Form.Group>
          <Form.Group>
            <Form.Label>Abreviación Partido Político:</Form.Label>
            <Form.Control
              type="text"
              placeholder="ej: PAN"
              {...register("abbreviation", {
                required: true,
              })}
            />
            {errors.abbreviation && <p className="text-danger">La abreviación del partido político es requerido</p>}
          </Form.Group>
          <Form.Group>
            <Form.Label>Año de Fundación:</Form.Label>
            <Controller
              name="foundation_year"
              control={control}
              render={({ field }) => (
                <ReactDatePicker
                  className="form-control"
                  placeholderText="Seleccciona una Fecha"
                  onChange={(date) => handleChangeDate(date)}
                  selected={startDate}
                  dateFormat="dd/MM/yyyy"
                />
              )}
              rules={{ required: "El año de fundación es requerido" }}
            />
            {errors.foundation_year && <p className="text-danger">{errors.foundation_year.message}</p>}
          </Form.Group>
          <Form.Group>
            <Form.Label>Ideología del partido político:</Form.Label>
            <Form.Control
              as="textarea"
              aria-label="with textare"
              rows={5}
              placeholder="ej: Centro Derecha"
              {...register("ideology", {
                required: true,
              })}
            />
            {errors.ideology && <p className="text-danger">La ideología del partido político es requerido</p>}
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
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

ModalPoliticalParty.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default ModalPoliticalParty;
