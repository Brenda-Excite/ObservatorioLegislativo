import { useEffect } from "react";
import { Card, Container, Row /* Form, Pagination */ } from "react-bootstrap";
import { startLoadPoliticalsParties } from "../../actions/piliticalsPartiesAction";
import ModalPoliticalParty from "../../components/politicalPartiesComponents/addPoliticanParty";
import PoliticalsTable from "../../components/politicalPartiesComponents/politicalsTable";
import { useAppDispatch } from "../../hooks/redux-hooks";
import useHandleShowComponents from "../../hooks/useHandleShowComponents";
import Dashboard from "../../layouts/Dashboard/Dashboard";
import { Button, Col /* Input, InputGroup, InputGroupAddon, InputGroupText */ } from "reactstrap";
import { validateAction } from "../../helpers/validatePermissions";

const PoliticalPartiesScreen = () => {
  const dispatch = useAppDispatch();
  const { show, handleShow, handleClose } = useHandleShowComponents();

  useEffect(() => {
    document.title = "Partidos Políticos";
  }, []);

  useEffect(() => {
    dispatch(startLoadPoliticalsParties());
  }, [dispatch]);

  return (
    <Dashboard>
      <Container className="mt--7" fluid>
        <Row>
          <div className="col">
            <Card className="shadow">
              <Card.Header className="border-0">
                <h3 className="mb-0"> Partidos Políticos</h3>
              </Card.Header>
              <Row className="mx-2">
                <Col className="my-3" xs={2} lg={6} xl={6}>
                  {validateAction("political_parties.create") && (
                    <Button color="success" onClick={handleShow}>
                      <i className="fas fa-plus-circle" />
                    </Button>
                  )}
                </Col>
              </Row>
              <div className="maginSpace">
                <PoliticalsTable />
              </div>

              <ModalPoliticalParty open={show} handleClose={handleClose} />
              <Container>{/* paginacion */}</Container>
            </Card>
          </div>
        </Row>
      </Container>
    </Dashboard>
  );
};

export default PoliticalPartiesScreen;
