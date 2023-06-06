import { useEffect } from "react";
import Dashboard from "../../layouts/Dashboard/Dashboard";
import { Card, Container, Row /* Pagination */ } from "react-bootstrap";
import { Button, Col } from "reactstrap";
//import SearchTextComponet from "../../components/uiComponents/searchTextComponet";
import RankingsTable from "../../components/rankingComponents/RankingsTable";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { startLoadRankingPoliticians } from "../../actions/rankingActions";
import ModalRanking from "../../components/rankingComponents/ModalRanking";
import useHandleShowComponents from "../../hooks/useHandleShowComponents";
import { startLoadSelectPoliticians } from "../../actions/dataSelectsAction";
import { startLoadGlobalSettings } from "../../actions/globalSettingsAction";
import "../../styles/table.css";
import { validateAction } from "../../helpers/validatePermissions";

const LegislativeObservatoryScreen = () => {
  const dispatch = useAppDispatch();
  const { update } = useAppSelector((state) => state.ranking);
  const { show, handleShow, handleClose } = useHandleShowComponents();

  useEffect(() => {
    document.title = "Observatorio Dashboard- Ranking";
  }, []);

  useEffect(() => {
    dispatch(startLoadSelectPoliticians());
    dispatch(startLoadGlobalSettings());
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    dispatch(startLoadRankingPoliticians());
    // eslint-disable-next-line
  }, [update]);

  //const handleSubmitSearch = () => {};
  return (
    <Dashboard>
      {validateAction("ranking.display") && (
        <Container className="mt--7" fluid>
          <Row>
            <div className="col">
              <Card className="shadow">
                <Card.Header className="border-0">
                  <h3 className="mb-0">Ranking</h3>
                </Card.Header>
                {validateAction("ranking.update") && (
                  <Row className="mx-2">
                    <Col className="my-3" xs={2} lg={6} xl={6}>
                      <Button color="success" onClick={() => handleShow()}>
                        <i className="fas fa-edit" />
                      </Button>
                    </Col>
                  </Row>
                )}
                <div className="espacio ">
                  <RankingsTable />
                </div>

                <ModalRanking open={show} handleClose={handleClose} />
                <Container>
                  <Row>{/* pagination */}</Row>
                </Container>
              </Card>
            </div>
          </Row>
        </Container>
      )}
    </Dashboard>
  );
};

export default LegislativeObservatoryScreen;
