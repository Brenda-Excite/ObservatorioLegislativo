import Dashboard from "../../layouts/Dashboard/Dashboard";
import { Card, Container, Row /* Pagination, Form */ } from "react-bootstrap";
import TableRoles from "../../components/roles";
import { useEffect } from "react";
import { useAppDispatch } from "../../hooks/redux-hooks";
import { startLoadRoles } from "../../actions/roles";
import { Button, Col /* Input, InputGroup, InputGroupAddon, InputGroupText */ } from "reactstrap";
import BotonAdd from "../../components/roles/addModal";
import useHandleShowComponents from "../../hooks/useHandleShowComponents";

const Permissions = () => {
  const dispatch = useAppDispatch();
  const { show, handleShow, handleClose } = useHandleShowComponents();

  useEffect(() => {
    document.title = "Roles";
  }, []);

  useEffect(() => {
    dispatch(startLoadRoles());
  }, [dispatch]);

  return (
    <Dashboard>
      <Container className="mt--7" fluid>
        <Row>
          <div className="col">
            <Card className="shadow">
              <Card.Header className="border-0">
                <h3 className="mb-0">Roles</h3>
              </Card.Header>

              <Row className="mx-2">
                <Col className="my-3" xs={2} lg={6} xl={6}>
                  <Button color="success" onClick={handleShow}>
                    <i className="fas fa-plus-circle" />
                  </Button>
                  <BotonAdd open={show} handleClose={handleClose} />
                </Col>
              </Row>

              <div className="maginSpace">
                <TableRoles />
              </div>
            </Card>
          </div>
        </Row>
      </Container>
    </Dashboard>
  );
};

export default Permissions;
