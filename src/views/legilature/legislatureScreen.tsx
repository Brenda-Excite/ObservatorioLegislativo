import { useEffect } from "react";
import { Card, Container, Row, /* Pagination, Form */ } from "react-bootstrap";
import { startLoadLegislatures } from "../../actions/legislatureActions";
import LegislaturesTable from "../../components/legislatureComponents/legislaturesTable";
import ModalLegislature from "../../components/legislatureComponents/addLegislature";
import { useAppDispatch } from "../../hooks/redux-hooks";
import useHandleShowComponents from "../../hooks/useHandleShowComponents";
import Dashboard from "../../layouts/Dashboard/Dashboard";
import { Button, Col, /* Input, InputGroup, InputGroupAddon, InputGroupText */ } from "reactstrap";
import "../../styles/table.css";

const LegislatureScreen = () => {
  const { show, handleShow, handleClose } = useHandleShowComponents();
  const dispatch = useAppDispatch();
  useEffect(() => {
    document.title = "Legislaturas";
  }, []);
  useEffect(() => {
    dispatch(startLoadLegislatures());
  }, [dispatch]);

  return (
    <Dashboard>
      <Container className="mt--7" fluid>
        <Row>
          <div className="col">
            <Card className="shadow" style={{ height: "130%" }}>
              <Card.Header className="border-0">
                <h3 className="mb-0"> Legislaturas</h3>
              </Card.Header>
              <Row className="mx-2">
                <Col className="my-3" xs={2} lg={6} xl={6}>
                  <Button color="success" onClick={handleShow}>
                    <i className="fas fa-plus-circle" />
                  </Button>
                </Col>
              </Row>
              <div className="maginSpace">
                <LegislaturesTable />
              </div>

              <ModalLegislature open={show} handleClose={handleClose} />
              <Container>{/* pagination */}</Container>
            </Card>
          </div>
        </Row>
      </Container>
    </Dashboard>
  );
};

export default LegislatureScreen;
