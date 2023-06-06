import { /* useState, */ useEffect, useRef } from "react";
import { Card, Container, Row /* Pagination, Form */ } from "react-bootstrap";
import { startLoadAssignCommissions } from "../../actions/AssignCommissions";
import AssingCommissionsTable from "../../components/assignCommissionsComponents/assignCommissionsTable";
import ModalAssingCommissions from "../../components/assignCommissionsComponents/addAsigCommicion";
import { useAppDispatch } from "../../hooks/redux-hooks";
import useHandleShowComponents from "../../hooks/useHandleShowComponents";
import Dashboard from "../../layouts/Dashboard/Dashboard";
import { Button, Col /* Input, InputGroup, InputGroupAddon, InputGroupText */ } from "reactstrap";
import "../../styles/table.css";

//impor de excel
//importacion de excel
//import { convertDataExcelToAsingComissionData } from "../../helpers/rankingHelpers";
//import { startAddNewAsingComissionExcel } from "../../actions/AssignCommissions";
import useImportExcel from "../../hooks/useImportExcel";
//import { showAlert } from "../../helpers/messagesNotifications";

import { validateAction } from "../../helpers/validatePermissions";

const AssingCommissionScreen = () => {
  const dispatch = useAppDispatch();
  const { show, handleShow, handleClose } = useHandleShowComponents();
  useEffect(() => {
    document.title = "Comisiones";
  }, []);
  useEffect(() => {
    dispatch(startLoadAssignCommissions());
  }, [dispatch]);

  //exc
  const fileRef = useRef<HTMLInputElement>(null);
  // eslint-disable-next-line
  const { dataList, setDataList, loadExcel } = useImportExcel();
  //const [backdropShow, setbackdropShow] = useState(false);

  /* const createListPolitician = () => {
    dataList.forEach((assignCommission: any) => {
      const data = convertDataExcelToAsingComissionData(assignCommission);
      dispatch(startAddNewAsingComissionExcel(data));
    });
    setbackdropShow(false);
    setDataList([]);
    if (fileRef.current) {
      fileRef.current.value = "";
    }

    showAlert("Importación Exitosa", "La importación se ha guardado de forma correcta", "success");
  }; */

  /* const handleSubmitSearch = (query: string) => {
     dispatch(startSearchPoliticians(query));
   }; */

  const selectFile = () => {
    fileRef.current?.click();
  };

  return (
    <Dashboard>
      {validateAction("commissions_assign.display") && (
        <Container className="mt--7" fluid>
          <Row>
            <div className="col">
              <Card className="shadow" style={{ height: "110%" }}>
                <Card.Header className="border-0">
                  <h3 className="mb-0">Cargo Comiciones</h3>
                </Card.Header>
                <Row className="mx-2">
                  <Col className="my-3" xs={2} lg={6} xl={6}>
                    {validateAction("commissions_assign.create") && (
                      <Button color="success" onClick={handleShow}>
                        <i className="fas fa-plus-circle" />
                      </Button>
                    )}

                    {validateAction("commissions_assign.import_excel") && (
                      <Button color="success" onClick={selectFile}>
                        <i className="fas fa-upload" /> Importar
                      </Button>
                    )}
                    <input type="file" className="d-none" ref={fileRef} onChange={loadExcel} accept=".xlsx, .xls, .csv" />
                  </Col>
                </Row>
                <div className="maginSpace">
                  <AssingCommissionsTable />
                </div>

                <ModalAssingCommissions open={show} handleClose={handleClose} />
                <Container>{/* Pagination */}</Container>
              </Card>
            </div>
          </Row>
        </Container>
      )}
    </Dashboard>
  );
};

export default AssingCommissionScreen;
