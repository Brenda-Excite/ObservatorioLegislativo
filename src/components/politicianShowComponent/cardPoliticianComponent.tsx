import { useEffect } from "react";
import { Image } from "react-bootstrap";
import { Card, CardBody, Col, Row } from "reactstrap";
import { years_old } from "../../helpers/momentHelpers";
import { useGetImage } from "../../hooks/useGetImage";
import { Politician } from "../../interfaces/politiciansInterface";

interface Props {
  politician: Politician;
}
const CardPoliticianComponent = ({ politician }: Props) => {
  const { photo, getImagePath } = useGetImage(); 
  const { photo:photoRadiography , getImagePath:getImgPathRadiography} = useGetImage();
  useEffect(() => {
    getImagePath(
      politician?.image_path
        ? politician.image_path
        : "produccion/political-parties/default-image.png"
    );
    // eslint-disable-next-line
  }, [politician]);

  useEffect(() => {
    getImgPathRadiography(
      politician?.radiography_path
        ? politician.radiography_path
        : "produccion/political-parties/default-image.png"
    )
    // eslint-disable-next-line
  }, [politician])

  const yearOfBirthday = years_old(politician?.date_of_birthday);
  return (
    <Card className="card-profile shadow">
      <Row className="justify-content-center">
        <Col className="order-lg-2" lg="3">
          <div className="card-profile-image mb-5">
            <a href="#pablo" onClick={(e) => e.preventDefault()}>
              <img
                alt="..."
                className="rounded-circle"
                src={photo}
                width="100"
              />
            </a>
          </div>
        </Col>
      </Row>
      <CardBody className="pt-0 pt-md-4">
        <Row>
          <div className="col">
            <div className="card-profile-stats d-flex justify-content-center mt-md-5">
              <div>
                <span className="heading">
                  {politician?.no_followers_facebook}
                </span>
                <span className="description">Seguidores Facebook</span>
              </div>
              <div>
                <span className="heading">
                  {politician?.no_followers_instagram}
                </span>
                <span className="description">Seguidores Instagram</span>
              </div>
              <div>
                <span className="heading">
                  {politician && politician.no_followers_twitter}
                </span>
                <span className="description">Seguidores Twitter</span>
              </div>
            </div>
          </div>
        </Row>
        <div className="text-center">
          <h3>
            {politician?.name}
            <span className="font-weight-light">, {yearOfBirthday}</span>
          </h3>
          <div className="h5 font-weight-300">
            <i className="ni location_pin mr-2" />
            {politician?.political_party.label}
          </div>
        </div>
        <hr className="my-4" />
        {/* Address */}
        <h6 className="heading-small text-muted mb-4">Radiografía</h6>
        <div className="w-100">
          <Image src={photoRadiography} width="auto" height="150"/>
        </div>
      </CardBody>
    </Card>
  );
};

export default CardPoliticianComponent;
