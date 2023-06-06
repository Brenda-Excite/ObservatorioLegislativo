import { useState, useEffect, useRef } from "react";
import { Card, Container, Row /* Pagination */ } from "react-bootstrap";
import { Button, Col } from "reactstrap";
import {
  startLoadDataSelectPoliticalParties,
  startLoadSelectCommissions,
  startLoadSelectDistricts,
  startLoadSelectLegislatures,
} from "../../actions/dataSelectsAction";
import { startAddNewPoliticianExcel, startLoadPoliticians } from "../../actions/politiciansAction";
import ModalPoliticians from "../../components/politiciansComponents/modalPoliticians";
import PoliticiansTable from "../../components/politiciansComponents/politiciansTable";
import Backdrop from "../../components/uiComponents/backdrop";
//import SearchTextComponet from "../../components/uiComponents/searchTextComponet";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import useHandleShowComponents from "../../hooks/useHandleShowComponents";
import Dashboard from "../../layouts/Dashboard/Dashboard";
import useImportExcel from "../../hooks/useImportExcel";
import { convertDataExcelToPoliticiansData } from "../../helpers/rankingHelpers";
import { showAlert } from "../../helpers/messagesNotifications";
import { startLoadGlobalSettings } from "../../actions/globalSettingsAction";
import "../../styles/table.css";
import { validateAction } from "../../helpers/validatePermissions";

const PoliticianScreen = () => {
  const fileRef = useRef<HTMLInputElement>(null);
  const { settings } = useAppSelector((state) => state.global_settings);
  const dispatch = useAppDispatch();
  const { show, handleShow, handleClose } = useHandleShowComponents();
  const [backdropShow, setbackdropShow] = useState(false);
  const { dataList, setDataList, loadExcel } = useImportExcel();
  useEffect(() => {
    document.title = "Observatorio Dashboard-Políticos";
  }, []);

  useEffect(() => {
    if (dataList.length > 0) {
      setbackdropShow(true);
      createListPolitician();
    }
    // eslint-disable-next-line
  }, [dataList]);

  useEffect(() => {
    dispatch(startLoadDataSelectPoliticalParties());
    dispatch(startLoadSelectDistricts());
    dispatch(startLoadSelectLegislatures());
    dispatch(startLoadSelectCommissions());
    dispatch(startLoadPoliticians());
    dispatch(startLoadGlobalSettings());
    // eslint-disable-next-line
  }, []);

  const createListPolitician = () => {
    if (!settings.length) {
      showAlert("Error al importar", "Antes de importar diputados asegurate que ya has registrado la configuración global", "danger");
      setbackdropShow(false);
      setDataList([]);
      if (fileRef.current) {
        fileRef.current.value = "";
      }
      return;
    }
    dataList.forEach((politician: any) => {
      const data = convertDataExcelToPoliticiansData(politician, settings);
      dispatch(startAddNewPoliticianExcel(data));
    });
    setbackdropShow(false);
    setDataList([]);
    if (fileRef.current) {
      fileRef.current.value = "";
    }

    showAlert("Importación Exitosa", "La importación se ha guardado de forma correcta", "success");
  };

  const selectFile = () => {
    fileRef.current?.click();
  };

  return (
    <>
      <Dashboard>
        <Container className="mt--7" fluid>
          <Row>
            <div className="col">
              <Card className="shadow">
                <Card.Header className="border-0">
                  <h3 className="mb-0"> Diputados</h3>
                </Card.Header>
                <Row className="mx-2">
                  <Col className="my-3" xs={12} lg={6} xl={6}>
                    {validateAction("politicians.create") && (
                      <Button color="success" onClick={handleShow}>
                        <i className="fas fa-plus-circle" />
                      </Button>
                    )}
                    {validateAction("politicians.import_excel") && (
                      <Button color="success" onClick={selectFile}>
                        <i className="fas fa-upload" /> Importar
                        <input type="file" className="d-none" ref={fileRef} onChange={loadExcel} accept=".xlsx, .xls, .csv" />
                      </Button>
                    )}
                  </Col>
                </Row>
                {backdropShow ? <Backdrop /> : null}
                <div className="espacio">
                  <PoliticiansTable />
                </div>

                <ModalPoliticians open={show} handleClose={handleClose} />
                <Container>{/* PAGINACION */}</Container>
              </Card>
            </div>
          </Row>
        </Container>
      </Dashboard>
    </>
  );
};

export default PoliticianScreen;
