import { /* useState, */ useEffect, useRef } from "react";
import { Card, Container, Row, /* Pagination, */ Form } from "react-bootstrap";
import { startLoadCommissions } from "../../actions/commissionActions";
import CommissionsTable from "../../components/commisionComponents/commissionsTable";
import { useAppDispatch } from "../../hooks/redux-hooks";
import useHandleShowComponents from "../../hooks/useHandleShowComponents";
import Dashboard from "../../layouts/Dashboard/Dashboard";
import { Button, Col /* Input, InputGroup, InputGroupAddon, InputGroupText */ } from "reactstrap";
import "../../styles/table.css";
import BotonAdd from "../../components/commisionComponents/addCommissions";

//importacion de excel
//import { convertDataExcelToComissionData } from "../../helpers/rankingHelpers";
//import { startAddNewComissionExcel } from "../../actions/commissionActions";
import useImportExcel from "../../hooks/useImportExcel";
//import { showAlert } from "../../helpers/messagesNotifications";

import { validateAction } from "../../helpers/validatePermissions";

const CommissionScreen = () => {
  const dispatch = useAppDispatch();
  const { show, handleShow, handleClose } = useHandleShowComponents();
  useEffect(() => {
    document.title = "Comisiones";
  }, []);
  useEffect(() => {
    dispatch(startLoadCommissions());
  }, [dispatch]);

  //exc
  const fileRef = useRef<HTMLInputElement>(null);
  // eslint-disable-next-line
  const { dataList, setDataList, loadExcel } = useImportExcel();
  //const [backdropShow, setbackdropShow] = useState(false);
  /* const createListPolitician = () => {
    dataList.forEach((commission: any) => {
      const data = convertDataExcelToComissionData(commission);
      dispatch(startAddNewComissionExcel(data));
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
      {validateAction("commissions.display") && (
        <Container className="mt--7" fluid>
          <Row>
            <div className="col">
              <Card className="shadow">
                <Card.Header className="border-0">
                  <h3 className="mb-0">Comisiones</h3>
                </Card.Header>
                <Row className="mx-2">
                  <Col className="my-3" xs={2} lg={6} xl={6}>
                    {validateAction("commissions.create") && (
                      <Button color="success" onClick={handleShow}>
                        <i className="fas fa-plus-circle" />
                      </Button>
                    )}

                    <BotonAdd open={show} handleClose={handleClose} />
                    {validateAction("commissions.import_excel") && (
                      <Button color="success" onClick={selectFile}>
                        <i className="fas fa-upload" /> Importar
                      </Button>
                    )}
                    <input type="file" className="d-none" ref={fileRef} onChange={loadExcel} accept=".xlsx, .xls, .csv" />
                  </Col>
                  <Col className="my-3 d-flex justify-content-end" xs={10} lg={6} xl={6}>
                    <Form>{/* buscador */}</Form>
                  </Col>
                </Row>
                <div className="maginSpace ">
                  <CommissionsTable />
                </div>

                {/*  <ModalCommissions open={show} handleClose={handleClose} /> */}
                <Container>
                  {/* <Row>
                  <Col className="my-3 d-flex justify-content-end" xs={12} sm={12} md={12} lg={12} xl={12}></Col>
                </Row> */}
                </Container>
              </Card>
            </div>
          </Row>
        </Container>
      )}
    </Dashboard>
  );
};

export default CommissionScreen;
