import { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { Controller } from "react-hook-form";
import { Col, Row } from "reactstrap";
import Select from "react-select";
import { useAppSelector } from "../../hooks/redux-hooks";

interface Props {
  control: any;
  errors: any;
  setValue: any;
}
const FormPoliticalData = ({ control, errors, setValue }: Props) => {
  const { politicalParties, districts, legislatures, commissions } = useAppSelector((state) => state.dataSelects);
  const { politicianSelected } = useAppSelector((state) => state.politicians);
  const [election, setElection] = useState("");

  useEffect(() => {
    if (politicianSelected) {
      setValue("legislature", politicianSelected?.legislature);
      setValue("political_party", politicianSelected?.political_party);
      setValue("commission", politicianSelected?.commission);
      setValue("district", politicianSelected?.district);
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (politicianSelected?.election) {
      setElection(politicianSelected.election);
    } else {
      setElection("");
    }
    // eslint-disable-next-line
  }, []);
  const onChangeElection = (e: React.SyntheticEvent): void => {
    let target = e.target as HTMLInputElement;
    setValue("election", target.value, { shouldDirty: true });
    if (target.value === "RP") {
      setValue("district", "", { shouldDirty: true });
    }
    setElection(target.value);
  };

  const optionsPoliticalParties = politicalParties.map((political: any) => {
    const option = {
      label: `${political.abbreviation} - ${political.name}`,
      value: political.name,
    };
    return option;
  });

  const optionsDistricts = districts.map((district: any) => {
    const option = {
      label: `${district.num_roman}-${district.name}`,
      value: district.id_district,
    };
    return option;
  });

  const optionsLegislatures = legislatures.map((legislature: any) => {
    const option = { label: legislature.name, value: legislature.name };
    return option;
  });

  const optionsCommissions = commissions.map((commission: any) => {
    const option = { label: commission.name, value: commission.name };
    return option;
  });

  return (
    <>
      <Form.Group className="mb-2">
        <Form.Label>Selecciona Legislatura*:</Form.Label>
        <Controller
          name="legislature"
          control={control}
          render={({ field }) => <Select {...field} options={optionsLegislatures} placeholder="Selecciona la Legislatura Actual" />}
          rules={{ required: true }}
        />
        {errors.legislature && <p className="text-danger">La legislatura actual es requerida </p>}
      </Form.Group>
      <Form.Group className="mb-2">
        <Form.Label>Selecciona Partido Político*:</Form.Label>
        <Controller
          name="political_party"
          control={control}
          render={({ field }) => <Select {...field} options={optionsPoliticalParties} placeholder="Elige un Partido Político" />}
          rules={{ required: true }}
        />
        {errors.political_party && <p className="text-danger">El partido político es requerido </p>}
      </Form.Group>
      <Form.Group className="mb-2">
        <Form.Label>Selecciona Comisión*:</Form.Label>
        <Controller
          name="commission"
          control={control}
          render={({ field }) => <Select {...field} options={optionsCommissions} placeholder="Elige una comisión" />}
          rules={{ required: true }}
        />
        {errors.commission && <p className="text-danger">La comisión es requerida </p>}
      </Form.Group>
      <Form.Group as={Row} className="mt-3 mb-3">
        <Form.Label>Elegido por...*:</Form.Label>
        <Col sm={10}>
          <Controller
            name="election"
            control={control}
            render={({ field: { value } }) => (
              <>
                <Form.Check inline type="radio" label="Mayoría Relativa" value="MR" checked={value === "MR" ? true : false} onChange={(e) => onChangeElection(e)} />
                <Form.Check
                  inline
                  type="radio"
                  label="Representación Proporcional"
                  value="RP"
                  checked={value === "RP" ? true : false}
                  onChange={(e) => onChangeElection(e)}
                />
              </>
            )}
            rules={{ required: true }}
          />
          {errors.election && <p className="text-danger">El tipo de elección es requerido</p>}
        </Col>
      </Form.Group>
      {election === "MR" ? (
        <Form.Group className="mb-2">
          <Form.Label>Selecciona Distrito*:</Form.Label>
          <Controller
            name="district"
            control={control}
            render={({ field }) => <Select {...field} options={optionsDistricts} placeholder="Selecciona un distrito" />}
            rules={{ required: true }}
          />
          {errors.district && <p className="text-danger">El distrito es requerido </p>}
        </Form.Group>
      ) : null}
    </>
  );
};

export default FormPoliticalData;
