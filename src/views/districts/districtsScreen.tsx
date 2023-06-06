import { useEffect } from "react";
import { Card, Container, Row /* Pagination, Form */ } from "react-bootstrap";
import { startLoadDistricts } from "../../actions/districtsActions";
import DistrictsTable from "../../components/districtsComponents/districtsTable";
import ModalDistricts from "../../components/districtsComponents/addDistricts";
import { useAppDispatch } from "../../hooks/redux-hooks";
import useHandleShowComponents from "../../hooks/useHandleShowComponents";
import Dashboard from "../../layouts/Dashboard/Dashboard";
import { Button, Col /* Input, InputGroup, InputGroupAddon, InputGroupText */ } from "reactstrap";
import "../../styles/table.css";
import { validateAction } from "../../helpers/validatePermissions";

const DistrictsScreen = () => {
  const { show, handleShow, handleClose } = useHandleShowComponents();
  const dispatch = useAppDispatch();
  useEffect(() => {
    document.title = "Distritos";
  }, []);

  useEffect(() => {
    dispatch(startLoadDistricts());
  }, [dispatch]);
  return (
    <Dashboard>
      {validateAction("district.display") && (
        <Container className="mt--7" fluid>
          <Row>
            <div className="col">
              <Card className="shadow">
                <Card.Header className="border-0">
                  <h3 className="mb-0"> Distritos</h3>
                </Card.Header>
                <Row className="mx-2">
                  <Col className="my-3" xs={2} lg={6} xl={6}>
                    {validateAction("district.update") && (
                      <Button color="success" onClick={handleShow}>
                        <i className="fas fa-plus-circle" />
                      </Button>
                    )}
                    <ModalDistricts open={show} handleClose={handleClose} />
                  </Col>
                </Row>
                <div className="maginSpace">
                  <DistrictsTable />
                </div>

                <Container>{/* pagination */}</Container>
              </Card>
            </div>
          </Row>
        </Container>
      )}
    </Dashboard>
  );
};

export default DistrictsScreen;
