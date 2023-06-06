import { useEffect } from "react";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import { startLoadGlobalSettings } from "../../actions/globalSettingsAction";
import GlobalSettingsFormModal from "../../components/global-settingsComponents/globalSettingsFormModal";
import GlobalSettingsTable from "../../components/global-settingsComponents/globalSettingsTable";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import useHandleShowComponents from "../../hooks/useHandleShowComponents";
import Dashboard from "../../layouts/Dashboard/Dashboard";
import "../../styles/table.css";
import { validateAction } from "../../helpers/validatePermissions";

const GlobalSettingScreen = () => {
  const dispatch = useAppDispatch();
  const { settings } = useAppSelector((state) => state.global_settings);
  const { show, handleShow, handleClose } = useHandleShowComponents();
  useEffect(() => {
    document.title = "Observatorio Dashboard-Configuración global";
  }, []);
  useEffect(() => {
    dispatch(startLoadGlobalSettings());
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <Dashboard>
        {validateAction("global_settings.display") && (
          <Container className="mt--7" fluid>
            <Row>
              <div className="col">
                <Card className="shadow" style={{ height: "130%" }}>
                  <Card.Header className="border-0">
                    <h3 className="mb-0"> Configuración Global</h3>
                  </Card.Header>
                  <Row className="mx-2">
                    <Col className="my-3" xs={2} lg={6} xl={6}>
                      {!settings.length ? (
                        <Button color="success" onClick={handleShow}>
                          <i className="fas fa-plus-circle" />
                        </Button>
                      ) : null}
                    </Col>
                  </Row>
                  <div className="maginSpace">
                    <GlobalSettingsTable />
                  </div>

                  <GlobalSettingsFormModal open={show} handleClose={handleClose} />
                </Card>
              </div>
            </Row>
          </Container>
        )}
      </Dashboard>
    </>
  );
};

export default GlobalSettingScreen;
