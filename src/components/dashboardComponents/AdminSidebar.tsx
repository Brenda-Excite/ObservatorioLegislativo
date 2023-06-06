import { useState } from "react";
import { Collapse, DropdownMenu, DropdownItem, UncontrolledDropdown, DropdownToggle, Form, Input, InputGroupAddon, InputGroupText, InputGroup, Media, NavbarBrand, Navbar, NavItem, Nav, Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import { startLogout } from "../../actions/authActions";
import { useAppDispatch } from "../../hooks/redux-hooks";
import { validateAction } from "../../helpers/validatePermissions";
interface Props {
  routes: Array<Route>;
}

interface Route {
  path: string;
  icon: string;
  name: string;
  rol: string;
}

const AdminSidebar = ({ routes }: Props) => {
  const dispatch = useAppDispatch();
  const [collapseOpen, setCollapseOpen] = useState(false);

  // toggles collapse between opened and closed (true/false)
  const toggleCollapse = () => {
    setCollapseOpen(!collapseOpen);
  };
  const handleLogout = () => {
    localStorage.removeItem("currentUserActive");
    dispatch(startLogout());
  };

  // creates the links that appear in the left menu / Sidebar
  const createLinks = (routes: Array<Route>) => {
    return routes.map(
      (prop, key) =>
        validateAction(prop.rol) && (
          <NavItem key={key}>
            <Link className="nav-link" to={prop.path}>
              <i className={prop.icon} />
              {prop.name}
            </Link>
          </NavItem>
        )
    );
  };
  return (
    <Navbar className="navbar-vertical fixed-left navbar-light bg-white" expand="md" id="sidenav-main">
      <Container fluid style={{ display: "flex", flexWrap: "nowrap" }}>
        {/* Toggler */}
        <button className="navbar-toggler" type="button" onClick={toggleCollapse}>
          <span className="navbar-toggler-icon" />
        </button>
        {/* Brand */}
        <NavbarBrand className="pt-0">
          <img alt={"..."} className="navbar-brand-img img-logo " src={require("../../assets/images/logo_observatorio.png").default} />
        </NavbarBrand>
        {/* User */}
        <Nav className="align-items-center d-md-none">
          <UncontrolledDropdown nav>
            <DropdownToggle nav>
              <Media className="align-items-center">
                <span className="avatar avatar-sm rounded-circle" style={{ backgroundColor: "#e9e9e9" }}>
                  <img alt="..." src={require("../../assets/images/logo2.png").default} />
                </span>
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
        {/* Collapse */}
        <Collapse navbar isOpen={collapseOpen}>
          {/* Collapse header */}
          <div className="navbar-collapse-header d-md-none">
            <Row>
              <Col className="collapse-brand" xs="6">
                <Link to={"/"}>
                  <img alt="logo" src={require("../../assets/images/logo_observatorio.png").default} />
                </Link>
              </Col>
              <Col className="collapse-close" xs="6">
                <button className="navbar-toggler" type="button" onClick={toggleCollapse}>
                  <span />
                  <span />
                </button>
              </Col>
            </Row>
          </div>
          {/* Form */}
          <Form className="mt-4 mb-3 d-md-none">
            <InputGroup className="input-group-rounded input-group-merge">
              <Input aria-label="Search" className="form-control-rounded form-control-prepended" placeholder="Search" type="search" />
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <span className="fa fa-search" />
                </InputGroupText>
              </InputGroupAddon>
            </InputGroup>
          </Form>
          {/* Navigation */}
          <Nav navbar>{createLinks(routes)}</Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
};

export default AdminSidebar;
