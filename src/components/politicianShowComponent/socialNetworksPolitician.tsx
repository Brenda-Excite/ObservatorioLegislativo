import { Col, Row } from "reactstrap";
import { Politician } from "../../interfaces/politiciansInterface";

interface Props {
  politician: Politician;
}
const SocialNetworksPolitician = ({ politician }: Props) => {
  return (
    <>
      <hr className="my-4" />
      {/* Address */}
      <h6 className="heading-small text-muted mb-4">Redes Sociales</h6>
      <div className="pl-lg-4">
        <Row>
          <Col lg="4">
            <label className="form-control-label" htmlFor="input-username">
              Facebook:
            </label>
            <p>
              {politician?.personal_account_facebook
                ? politician.personal_account_facebook
                : "N/A"}
            </p>
          </Col>
          <Col lg="4">
            <label className="form-control-label" htmlFor="input-username">
              Instagram:
            </label>
            <p>
              {politician?.account_instagram
                ? politician.account_instagram
                : "N/A"}
            </p>
          </Col>
          <Col lg="4">
            <label className="form-control-label" htmlFor="input-username">
              Twitter:
            </label>
            <p>
              {politician?.account_twitter ? politician.account_twitter : "N/A"}
            </p>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default SocialNetworksPolitician;
