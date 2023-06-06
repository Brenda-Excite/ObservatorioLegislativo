import { useState , useEffect } from "react";
import { Form } from "react-bootstrap";
import { Controller } from "react-hook-form";
import { Button, Col, Row, Table } from "reactstrap";
import Select from "react-select";
import { useAppSelector } from "../../hooks/redux-hooks";
import ExperienceTable from "./experienceTable";

interface Props {
  control: any;
  experienceList: string[];
  setValue: any;
  setExperienceList: React.Dispatch<React.SetStateAction<any[]>>;
}
const FormExperienceLegislative = ({
  control,
  setValue,
  setExperienceList,
  experienceList,
}: Props) => {
  const { politicianSelected } = useAppSelector((state) => state.politicians);
  const [experience, setExperience] = useState("");
  const {commissions} = useAppSelector((state) => state.dataSelects);
  const [addExperience, setAddExperience] = useState({
    initialPeriod: "",
    finalPeriod: "",
    position: "",
  });
  const { initialPeriod , finalPeriod,position } = addExperience;
  const [commission, setCommission] = useState({});
  const [validation , setValidation] = useState(false);

  useEffect(() => {
    if(politicianSelected?.experience_legislative === 'Si'){
      setExperience(politicianSelected.experience_legislative)
    }
    // eslint-disable-next-line
  }, [])
  const handleExperienceLegislative = (e: React.SyntheticEvent): void => {
    let target = e.target as HTMLInputElement;
    setValue("experience_legislative", target.value, { shouldDirty: true });
    setExperience(target.value);
  };

  const handleChangeExperience = (e: React.SyntheticEvent): void => {
    let target = e.target as HTMLInputElement;
    setAddExperience({
      ...addExperience,
      [target.name]: target.value,
    });
  };

  const handleChangeCommision = (value: any) => {
    setCommission(value);
  };

  const saveExperienceList = () => {
    if (!position && !Object.keys(commission).length) {
      setValidation(true);
      return;
    } 
    let experience = { ...addExperience, ...commission };
    setExperienceList([...experienceList, experience]);
    setAddExperience({
      initialPeriod: "",
      finalPeriod: "",
      position: "",
    });
    setCommission({});

  };

  const handleDeleteExperience = (position:string) =>{
     const newExperienceList = experienceList.filter((exp:any)=>exp.position !== position);
     setExperienceList(newExperienceList);
  }

  const optionsCommissions = commissions.map((commission: any) => {
    const option = { label: commission.name, value: commission.id };
    return option;
  });
  return (
    <>
      <Form.Group as={Row} className="mt-3 mb-3">
        <Form.Label>¿Experiencia Legislativa?*:</Form.Label>
        <Col sm={10}>
          <Controller
            name="experience_legislative"
            control={control}
            render={({ field: { value } }) => (
              <>
                <Form.Check
                  inline
                  type="radio"
                  label="Si"
                  value="Si"
                  onChange={(e) => handleExperienceLegislative(e)}
                  checked={value === "Si" ? true : false}
                />
                <Form.Check
                  inline
                  type="radio"
                  label="No"
                  value="No"
                  onChange={(e) => handleExperienceLegislative(e)}
                  checked={value === "No" ? true : false}
                />
              </>
            )}
            rules={{required:true}}
          />
        </Col>
      </Form.Group>
      {experience === "Si" ? (
        <>
          <Form.Group className="mb-3">
            <Form.Label>Período Inicial:</Form.Label>
               <Form.Control
                name="initialPeriod"
                type="date"
                placeholder="Ej:01/03/2005"
                onChange={(e) => handleChangeExperience(e)}
                value={initialPeriod || ''}
              />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Período Final:</Form.Label>
          
               <Form.Control
               name="finalPeriod"
                type="date"
                placeholder="Ej:13/03/2006"
                onChange={(e) => handleChangeExperience(e)}
                value={finalPeriod || ''}
              />
          
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Cargo:</Form.Label>
           
               <Form.Control
               name="position"
                type="text"
                placeholder="Ingresa el cargo"
                onChange={(e) => handleChangeExperience(e)}
                value={position || ''}
              />
  
            {validation? <p className="text-danger">El campo comisión es requerido</p> : null}
            
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Comisión:</Form.Label>
                <Select
                  options={optionsCommissions}
                  placeholder="selecciona una comisión"
                  onChange={(value) => handleChangeCommision(value)}
                  value={commission || ''}
                />
            {validation? <p className="text-danger">El campo comisión es requerido</p> : null}
          </Form.Group>
          <Form.Group className="mb-3">
            <Button
              color="primary"
              className="btn btn-block"
              onClick={() => saveExperienceList()}
            >
              Agregar
            </Button>
          </Form.Group>
          <Form.Group>
            <Table responsive>
              <thead>
                <tr>
                  <th className="text-center">Período Final</th>
                  <th className="text-center">Período Inicial</th>
                  <th className="text-center">Cargo</th>
                  <th className="text-center">Comisión</th>
                  <th className="text-center">Opciones</th>
                </tr>
              </thead>
              <tbody>
                {
                  !experienceList.length ?
                  <tr>
                  <td colSpan={5}>No se encuentra experiencia legislativa registrada</td>
                 </tr>
                 :
                 experienceList.map((experience , index) =>(
                   <ExperienceTable
                     key={index}
                     experience={experience}
                     handleDeleteExperience={handleDeleteExperience}
                   />
                 ))
                }
              </tbody>
            </Table>
          </Form.Group>
        </>
      ) : null}
    </>
  );
};

export default FormExperienceLegislative;
