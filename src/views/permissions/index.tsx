import Dashboard from "../../layouts/Dashboard/Dashboard";
import { Card, Container, Row /* Pagination, Form */ } from "react-bootstrap";
import TablePermissions from "../../components/permissions";
import { useEffect } from "react";
import { useAppDispatch } from "../../hooks/redux-hooks";
import { startLoadPermissions } from "../../actions/permission";

import { validateAction } from "../../helpers/validatePermissions";
import { Button, Col } from "reactstrap";
import useHandleShowComponents from "../../hooks/useHandleShowComponents";
import BotonAdd from "../../components/permissions/addModalPermissions";

const Permissions = () => {
  const dispatch = useAppDispatch();
  const { show, handleShow, handleClose } = useHandleShowComponents();
  useEffect(() => {
    document.title = "Permisos";
  }, []);
  useEffect(() => {
    dispatch(startLoadPermissions());
  }, [dispatch]);

  return (
    <Dashboard>
      {validateAction("permissions.display") && (
        <Container className="mt--7" fluid>
          <Row>
            <div className="col">
              <Card className="shadow">
                <Card.Header className="border-0">
                  <h3 className="mb-0">Permissions</h3>
                </Card.Header>
                <Col className="my-3" xs={2} lg={6} xl={6}>
                  {validateAction("permissions.create") && (
                    <Button color="success" onClick={handleShow}>
                      <i className="fas fa-plus-circle" />
                    </Button>
                  )}
                  <BotonAdd open={show} handleClose={handleClose} />
                </Col>
                <div className="maginSpace">
                  <TablePermissions />
                </div>
              </Card>
            </div>
          </Row>
        </Container>
      )}
    </Dashboard>
  );
};

export default Permissions;
