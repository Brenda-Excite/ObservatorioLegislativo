import { useEffect } from "react";
import { Card, Container, Row /* Pagination, Form */ } from "react-bootstrap";
import { startLoadUsers } from "../../actions/userAction";
import UserTable from "../../components/users/userTable";
//import ModalUser from "../../components/users/modalUsers";
import { useAppDispatch } from "../../hooks/redux-hooks";
import useHandleShowComponents from "../../hooks/useHandleShowComponents";
import Dashboard from "../../layouts/Dashboard/Dashboard";
import { Button, Col /* Input, InputGroup, InputGroupAddon, InputGroupText */ } from "reactstrap";
import "../../styles/table.css";
import BotonAdd from "../../components/users/addModal";
import { validateAction } from "../../helpers/validatePermissions";

const UserScreen = () => {
  const dispatch = useAppDispatch();
  const { show, handleShow, handleClose } = useHandleShowComponents();
  useEffect(() => {
    document.title = "Usuarios";
  }, []);
  useEffect(() => {
    dispatch(startLoadUsers());
  }, [dispatch]);

  return (
    <Dashboard>
      {validateAction("users.display") && (
        <Container className="mt--7" fluid>
          <Row>
            <div className="col">
              <Card className="shadow">
                <Card.Header className="border-0">
                  <h3 className="mb-0">Usuario</h3>
                </Card.Header>
                {validateAction("users.create") && (
                  <Row className="mx-2">
                    <Col className="my-3" xs={2} lg={6} xl={6}>
                      <Button color="success" onClick={handleShow}>
                        <i className="fas fa-plus-circle" />
                      </Button>
                      <BotonAdd open={show} handleClose={handleClose} />
                    </Col>
                  </Row>
                )}
                <div className="maginSpace">
                  <UserTable />
                </div>

                {/* <ModalUser open={show} handleClose={handleClose} /> */}
              </Card>
            </div>
          </Row>
        </Container>
      )}
    </Dashboard>
  );
};

export default UserScreen;
