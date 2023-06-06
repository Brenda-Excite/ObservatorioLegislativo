import Dashboard from "../../layouts/Dashboard/Dashboard";
import { Card, CardHeader, CardBody, Form, Container, Row, Col } from "reactstrap";
import { RouteComponentProps } from "react-router";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { useEffect } from "react";
import { startLoadPoliticianById } from "../../actions/politiciansAction";
import CardPoliticianComponent from "../../components/politicianShowComponent/cardPoliticianComponent";
import CardInfoPoliticianComponent from "../../components/politicianShowComponent/cardInfoPoliticianComponent";
import SocialNetworksPolitician from "../../components/politicianShowComponent/socialNetworksPolitician";
import AdditionalDataPolitician from "../../components/politicianShowComponent/aditionalDataPolitician";
type PoliticianShowParams = {
  id: string;
};
type PoliticianShowProps = RouteComponentProps<PoliticianShowParams>;

const PoliticianShowScreen: React.FC<PoliticianShowProps> = ({ match }) => {
  const {
    params: { id },
  } = match;
  const dispatch = useAppDispatch();
  const { politician } = useAppSelector((state) => state.politicians);
  useEffect(() => {
    dispatch(startLoadPoliticianById(id));
    // eslint-disable-next-line
  }, []);

  return (
    <Dashboard>
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
            <CardPoliticianComponent politician={politician} />
          </Col>
          <Col className="order-xl-1" xl="8">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">Diputados</h3>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form>
                  <CardInfoPoliticianComponent politician={politician} />
                  <SocialNetworksPolitician politician={politician} />
                  <AdditionalDataPolitician politician={politician} />
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Dashboard>
  );
};

export default PoliticianShowScreen;
