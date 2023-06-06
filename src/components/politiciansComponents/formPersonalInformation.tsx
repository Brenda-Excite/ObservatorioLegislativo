import { Form } from "react-bootstrap";
import { Controller } from "react-hook-form";
import ImageUploader from "react-images-upload";
import { useEffect } from "react";
import { Col , Row } from "reactstrap";
import Select from "react-select";
import { academic_degree } from "../../helpers/dataStatictSelects";
import { useAppSelector } from "../../hooks/redux-hooks";

interface Props {
    control: any;
    errors: any;
    setValue: any;
    handleChangePoliticianImg: (picture: any) => void;
}

const FormPersonalInformation = ({ control, errors, setValue , handleChangePoliticianImg }: Props) => {
    const { politicianSelected } = useAppSelector((state) => state.politicians);

    useEffect(() => {
        if(politicianSelected){
            setValue("name", politicianSelected.name);
            setValue("gender", politicianSelected.gender);
            setValue("date_of_birthday", politicianSelected.date_of_birthday);
            setValue("academic_degree", politicianSelected.academic_degree);
            setValue("last_job", politicianSelected.last_job);
            setValue("hobbies", politicianSelected.hobbies);
        }else{
            setValue("name", '');
            setValue("gender", '');
            setValue("date_of_birthday",'');
            setValue("academic_degree",'');
            setValue("last_job", '');
            setValue("hobbies", '');
        }
        // eslint-disable-next-line 
    }, []);

    return (
        <>
         <Form.Group className="mb-3">
                  <Form.Label>Subir Foto:</Form.Label>
                  <ImageUploader
                    withIcon={false}
                    buttonText="Escoge una imagen"
                    onChange={handleChangePoliticianImg}
                    imgExtension={[".jpg", ".jpeg", ".png"]}
                    accept="acepta .jpg | .jpeg | .png"
                    maxFileSize={5242880}
                    withPreview
                    singleImage
                    label="Acepta JPEG | JPG | PNG"
                  />
                </Form.Group>
                <Form.Group className="mt-3 mb-3">
                  <Form.Label>Nombre Completo*:</Form.Label>
                  <Controller
                    name="name"
                    control={control}
                    render={({field})=>(
                     <Form.Control
                        {...field}
                        type="text"
                        placeholder="Ej: Juan David Nuñez Quiroz"
                     />   
                    )}
                    rules={{required:true}}
                  />
                  {errors.name && <p className="text-danger">El Nombre del diputado es requerido</p>}
                </Form.Group>
                <Form.Group className="mt-3 mb-3">
                  <Form.Label>Fecha de Naciento:</Form.Label>
                  <Controller
                    name="date_of_birthday"
                    control={control}
                    render={({ field }) => (
                     <Form.Control
                       {...field}
                       type="date"
                       placeholder="Ej: 13/03/1997"
                     />
                    )}
                    rules={{ required: true }}
                  />
                  {errors.date_of_birthday && (
                    <p className="text-danger">La fecha de nacimiento es un campo requerido</p>
                  )}
                </Form.Group>
                <Form.Group as={Row} className="mt-3 mb-3">
                  <Form.Label>Selecciona Género*:</Form.Label>
                  <Col sm={10}>
                    <Controller
                      name="gender"
                      control={control}
                      render={({ field: { value, onChange } }) => (
                        <>
                          <Form.Check
                            inline
                            type="radio"
                            label="Hombre"
                            value="Hombre"
                            onChange={(e) => onChange(e.target.value)}
                            checked={value === "Hombre" ? true : false}
                          />
                          <Form.Check
                            inline
                            type="radio"
                            label="Mujer"
                            value="Mujer"
                            onChange={(e) => onChange(e.target.value)}
                            checked={value === "Mujer" ? true : false}
                          />
                        </>
                      )}
                      rules={{ required: true }}
                    />
                    {errors.gender && <p className="text-danger">El género es un campo requerido</p>}
                  </Col>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Nivel de Estudios:</Form.Label>
                  <Controller
                    name="academic_degree"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={academic_degree}
                        placeholder="Selecciona nivel de estudios"
                      />
                    )}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Último Cargo:</Form.Label>
                  <Controller
                    name="last_job"
                    control={control}
                    render={({field})=>(
                     <Form.Control
                        {...field}
                        type="text"
                        placeholder="Último Cargo "
                     />   
                    )}
                    rules={{required:false}}
                  />

                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Pasatiempos:</Form.Label>
                   <Controller
                    name="hobbies"
                    control={control}
                    render={({field})=>(
                     <Form.Control
                        {...field}
                        type="text"
                        placeholder="Ej: futbol , Tennis , Musica , etc."
                     />   
                    )}
                    rules={{required:false}}
                  />
                </Form.Group>   
        </>
    );
};

export default FormPersonalInformation;