import { useState , useEffect } from "react";
import { Form } from "react-bootstrap";
import { Controller } from "react-hook-form";
import { Col, Row } from "reactstrap";
import { useAppSelector } from "../../hooks/redux-hooks";

interface Props {
  control: any;
  errors: any;
  setValue: any;
}

const FormAditionalData = ({ control, errors, setValue }: Props) => {
  const { politicianSelected } = useAppSelector((state) => state.politicians);
  const [threeOfthree, setThreeOfthree] = useState("");

  useEffect(() => {
    if(politicianSelected){
      setValue('month_presented', politicianSelected.month_presented);
      setValue('year_presented', politicianSelected.year_presented);
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if(politicianSelected?.three_of_three ==='Si'){
      setThreeOfthree(politicianSelected.three_of_three)
    }else{
      setThreeOfthree('');
    }
    // eslint-disable-next-line
  }, []);
  const handleChangeThreeOfThree = (e: React.SyntheticEvent): void => {
    let target = e.target as HTMLInputElement;
    setThreeOfthree(target.value);
    setValue("three_of_three", target.value, { shouldDirty: true });
    if(target.value=== 'No'){
      setValue("month_presented", '', { shouldDirty: true });
      setValue("year_presented", '', { shouldDirty: true });
    }
  };
  return (
    <>
      <Form.Group as={Row} className="mb-3">
        <Form.Label>¿Presentó el informe anual de actividades?*:</Form.Label>
        <Col sm={10}>
          <Controller
            name="activity_report"
            control={control}
            render={({ field: { value, onChange } }) => (
              <>
                <Form.Check
                  inline
                  type="radio"
                  label="Si"
                  value="Si"
                  onChange={(e) => onChange(e.target.value)}
                  checked={value === "Si" ? true : false}
                />
                <Form.Check
                  inline
                  type="radio"
                  label="No"
                  value="No"
                  onChange={(e) => onChange(e.target.value)}
                  checked={value === "No" ? true : false}
                />
              </>
            )}
            rules={{ required: true }}
          />
          {errors.activity_report && (
            <p className="text-danger">Presentó el informe anual es requerido</p>
          )}
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3">
        <Form.Label>¿Presentó 3 de 3?*:</Form.Label>
        <Col sm={10}>
          <Controller
            name="three_of_three"
            control={control}
            render={({ field: { value } }) => (
              <>
                <Form.Check
                  inline
                  type="radio"
                  label="Si"
                  value="Si"
                  checked={value === "Si" ? true : false}
                  onChange={(e) => handleChangeThreeOfThree(e)}
                />
                <Form.Check
                  inline
                  type="radio"
                  label="No"
                  value="No"
                  checked={value === "No" ? true : false}
                  onChange={(e) => handleChangeThreeOfThree(e)}
                />
              </>
            )}
            rules={{ required: true }}
          />
          {errors.three_of_three && <p className="text-danger">El tres de tres es requerido</p>}
        </Col>
      </Form.Group>
      {threeOfthree === "Si" ? (
        <Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Mes en que se presentó*:</Form.Label>
            <Controller
              name="month_presented"
              control={control}
              render={({ field }) => (
                <Form.Control 
                 {...field} 
                  type="number" 
                  placeholder="MM" 
                />
              )}
              rules={{ required: true }}
            />

            {errors.month_presented && (
              <p className="text-danger">El mes en que se presentó es requerido</p>
            )}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Año en que se presentó*:</Form.Label>
            <Controller
              name="year_presented"
              control={control}
              render={({ field }) => (
                <Form.Control 
                  {...field} 
                  type="number" 
                  placeholder="YYYY" 
                />
              )}
              rules={{ required: true }}
            />
            {errors.year_presented && (
              <p className="text-danger">El año en que se presento es requerido</p>
            )}
          </Form.Group>
        </Form.Group>
      ) : null}
    </>
  );
};

export default FormAditionalData;
