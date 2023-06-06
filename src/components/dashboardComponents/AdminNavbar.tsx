import { DropdownMenu, DropdownItem, UncontrolledDropdown, DropdownToggle, Form, FormGroup, Navbar, Nav, Container, Media } from "reactstrap";
import { startLogout } from "../../actions/authActions";
import { useAppDispatch } from "../../hooks/redux-hooks";

const AdminNavbar = () => {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    localStorage.removeItem("currentUserActive");
    dispatch(startLogout());
  };
  return (
    <>
      <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
        <Container fluid>
          <Form className="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto">
            <FormGroup className="mb-0"></FormGroup>
          </Form>
          <Nav className="align-items-center d-none d-md-flex imgCont" navbar>
            <UncontrolledDropdown nav>
              <DropdownToggle className="pr-0" nav>
                <Media className="align-items-center">
                  <span
                    className="avatar avatar-sm rounded-circle"
                    style={{
                      backgroundColor: "#ffffff",
                    }}
                  >
                    <img alt="..." src={require("../../assets/images/logo2.png").default} />
                  </span>
                  <Media className="ml-2 d-none d-lg-block">
                    <span className="mb-0 text-sm font-weight-bold">Admistrador </span>
                  </Media>
                </Media>
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-arrow" right>
                <DropdownItem className="noti-title" header tag="div">
                  <h6 className="text-overflow m-0">Bienvenido!</h6>
                </DropdownItem>
                <DropdownItem href="#pablo" onClick={() => handleLogout()}>
                  <i className="fas fa-sign-out-alt" />
                  <span>Cerrar Sesión</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default AdminNavbar;
