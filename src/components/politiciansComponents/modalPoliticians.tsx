import { useEffect , useState } from "react";
import {
  Col,
  Container,
  Form,
  Modal,
  Row,
  Button,
} from "react-bootstrap";
import { SubmitHandler, useForm} from "react-hook-form";
import ImageUploader from "react-images-upload";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import useUploadImage from "../../hooks/useUploadImage";
import {
  resetStatePoliticians,
  startAddNewPolitician,
  startUpdatePolitician,
} from "../../actions/politiciansAction";
import FormExperienceLegislative from "./formExperienceLegislative";
import FormAditionalData from "./formAditionalData";
import FormPoliticalData from "./formPoliticalData";
import FormPersonalInformation from "./formPersonalInformation";
import FormSocialNetworks from "./formSocialNetworks";
import {PercentileIndicators , Indicators} from "../../interfaces/politiciansInterface";

type Inputs = {
  id: string;
  name: string;
  image_path: string;
  radiography_path: string;
  date_of_birthday: string;
  gender: string;
  academic_degree: { label: string; value: string };
  last_job: string;
  hobbies: string;
  fan_page_facebook: string;
  no_followers_facebook: string;
  personal_account_facebook: string;
  no_followers_twitter: number;
  account_twitter: string;
  account_instagram: string;
  no_followers_instagram: string;
  activity_report: string;
  election: string;
  month_presented: string;
  year_presented: string;
  three_of_three: string;
  political_party: { label: string; value: string };
  district: { label: string; value: string };
  legislature: { label: string; value: string };
  commission: { label: string; value: string };
  experience_legislative:string;
  experience_list:string[];
  assistances:number;
  commisions_assistances: number;
  initiatives_presented:number;
  initiatives_approved:number;
  transparency:number;
  full_participation:number;
  total:number;
  percentile_Indicators: PercentileIndicators;
  indicators:Indicators;
};

interface Props {
  open: boolean;
  handleClose: () => void;
}

const ModalPoliticians = ({ open, handleClose }: Props) => {
  const dispatch = useAppDispatch();
  const { update, politicianSelected } = useAppSelector(
    (state) => state.politicians
  );
  const {loading} = useAppSelector((state)=>state.ui);
  const {
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    control,
    setValue,
    reset,
  } = useForm<Inputs>({ defaultValues: politicianSelected });
  const [experienceList, setExperienceList] = useState<string[]>([]);

  const { pictures: politicianImage, onDrop: handleChangePoliticianImg } =
    useUploadImage();
  const {
    pictures: politicianRadiography,
    onDrop: handleChangeRadiographyImg,
  } = useUploadImage();
  

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
    // eslint-disable-next-line
  }, [isSubmitSuccessful, reset]);

  useEffect(() => {
    if (politicianSelected) {
      setValue("election", politicianSelected.election);
      setValue("activity_report", politicianSelected.activity_report);
      setValue("three_of_three", politicianSelected.three_of_three);
      setValue("experience_legislative", politicianSelected.experience_legislative || "");
      setExperienceList(politicianSelected?.experience_list || []);
    } else {
      setValue("election", "");
      setValue("activity_report", "");
      setValue("three_of_three", "");
      setValue("experience_legislative", "");
      setExperienceList([]);
    }
    // eslint-disable-next-line
  }, [politicianSelected]);

  const handleCancel = () =>{
    if(update){
      dispatch(resetStatePoliticians());
    }
    handleClose();
  }
  
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    data.experience_list = experienceList;
    if (update) {
      dispatch(
        startUpdatePolitician(data, politicianImage, politicianRadiography)
      );
    } else {
  
      data.percentile_Indicators = {
        assistances:0,
        commisions_assistances:0,
        initiatives_presented:0,
        initiatives_approved:0,
        transparency:data.three_of_three === 'Si' ? 1 : 0,
        full_participation: 0,
        total:0,
      }

      data.indicators ={
        politician_assistance:0,
        participations_in_plenary_session_politician:0,
        initiatives_presented_politician:0,
        initiatives_approved_politician:0,
        initiatives_presented_congress:0
      }

      
      dispatch(
        startAddNewPolitician(data, politicianImage, politicianRadiography)
      );
    }
    if(update){
      dispatch(resetStatePoliticians());
    }
    handleClose();
  };

  return (
    <Modal show={open} onHide={() => handleCancel()} size="xl">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            {update ? "Editar Político" : "Agregar Político"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col xs={12} sm={12} md={12} lg={4} xl={4}  >
                <h4>Información Personal</h4>
                <hr />
                <FormPersonalInformation
                   control={control}
                   setValue={setValue}
                   errors={errors}
                   handleChangePoliticianImg={handleChangePoliticianImg}
                />
              </Col>
              <Col xs={12} sm={12} md={12} lg={4} xl={4}  >
                <h4>Redes Sociales</h4>
                <hr />
                <FormSocialNetworks
                  control={control}
                  errors={errors}
                  setValue={setValue}
                />
               
                <hr />
                <h4>Radiografía</h4>
                <hr />
                <Form.Group>
                  <Form.Label>Subir Imagen:</Form.Label>
                  <ImageUploader
                    withIcon={false}
                    buttonText="Escoge una imagen"
                    onChange={handleChangeRadiographyImg}
                    imgExtension={[".jpg", ".jpeg", ".png"]}
                    accept="acepta .jpg | .jpeg | .png"
                    maxFileSize={5242880}
                    withPreview
                    singleImage
                    label="Acepta JPEG | JPG | PNG"
                  />
                </Form.Group>
              </Col>
              <Col xs={12} sm={12} md={12} lg={4} xl={4}  >
                <h4>Datos Políticos</h4>
                <hr />
               <FormPoliticalData
                 control={control}
                 setValue={setValue}
                 errors={errors}
               />
                <FormExperienceLegislative
                 control={control}
                 experienceList={experienceList}
                 setValue={setValue}
                 setExperienceList={setExperienceList}
                />
                <hr />
                <h4>Datos Adicionales</h4>
                <hr />
                <FormAditionalData
                  control={control}
                  setValue={setValue}
                  errors={errors}
                />
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={()=>handleCancel()}>
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

export default ModalPoliticians;
