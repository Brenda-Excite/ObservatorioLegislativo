import { Col, Row } from "reactstrap";
import { Politician } from "../../interfaces/politiciansInterface";

interface Props {
  politician: Politician;
}
const AditionalDataPolitician = ({ politician }: Props) => {
  return (
    <>
      <hr className="my-4" />

      <h6 className="heading-small text-muted mb-4">Datos Adicionales</h6>
      <div className="pl-lg-4">
        <Row>
          <Col lg="6">
            <label className="form-control-label" htmlFor="input-username">
              Legislatura:
            </label>
            <p>{politician?.legislature.label}</p>
          </Col>
          <Col lg="6">
            <label className="form-control-label" htmlFor="input-username">
              Partido Político:
            </label>
            <p>{politician?.political_party.label}</p>
          </Col>

          <Col lg="6">
            <label className="form-control-label" htmlFor="input-last-name">
              Elegido por:
            </label>
            <p>{politician?.election}</p>
          </Col>
          <Col lg="6">
            <label className="form-control-label" htmlFor="input-last-name">
              Último Cargo:
            </label>
            <p>{politician?.last_job ? politician.last_job : "N/A"}</p>
          </Col>
          <Col lg="6">
            <label className="form-control-label" htmlFor="input-last-name">
              Hobbies:
            </label>
            <p>{politician?.hobbies ? politician.hobbies : "N/A"}</p>
          </Col>
          <Col lg="6">
            <label className="form-control-label" htmlFor="input-last-name">
              Grado Académico:
            </label>
            <p>{politician?.academic_degree.label ? politician.academic_degree.label : "N/A"}</p>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default AditionalDataPolitician;
