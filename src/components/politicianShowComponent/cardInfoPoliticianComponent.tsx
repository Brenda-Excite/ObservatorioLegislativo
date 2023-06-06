import { Col, Row } from "reactstrap";
import { /* yearOfBirthDay, */ years_old } from "../../helpers/momentHelpers";
import { Politician } from "../../interfaces/politiciansInterface";

interface Props {
  politician: Politician;
}
const CardInfoPoliticianComponent = ({ politician }: Props) => {
  const birthday = years_old(politician?.date_of_birthday);
  //const date = yearOfBirthDay(politician?.date_of_birthday);
  return (
    <div className="pl-lg-4">
      <h6 className="heading-small text-muted mb-4">Datos Personales</h6>
      <Row>
        <Col lg="4">
          <label className="form-control-label" htmlFor="input-username">
            Nombre Completo:
          </label>
          <p>{politician?.name}</p>
        </Col>
        <Col lg="4">
          <label className="form-control-label" htmlFor="input-username">
            Fecha de Nacimiento:
          </label>
          <p>{/* {date} */}</p>
        </Col>
        <Col lg="2">
          <label className="form-control-label" htmlFor="input-username">
            Edad:
          </label>
          <p>{birthday}</p>
        </Col>
        <Col lg="2">
          <label className="form-control-label" htmlFor="input-last-name">
            Género:
          </label>
          <p>{politician?.gender}</p>
        </Col>
      </Row>
    </div>
  );
};

export default CardInfoPoliticianComponent;
