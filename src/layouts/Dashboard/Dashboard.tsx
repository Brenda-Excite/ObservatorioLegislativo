import { Container } from "react-bootstrap";
import AdminFooter from "../../components/dashboardComponents/AdminFooter";
import AdminNavbar from "../../components/dashboardComponents/AdminNavbar";
import AdminSidebar from "../../components/dashboardComponents/AdminSidebar";
import Cards from "../cards/cards";
import "../../styles/navStyle.css";

const routes = [
  {
    path: "/",
    name: "Ranking",
    icon: "fas fa-clipboard-list text-blue",
    rol: "ranking.display",
  },
  {
    path: "/global-settings",
    name: "Configuración Global",
    icon: "fas fa-cog text-info",
    rol: "global_settings.display",
  },
  {
    path: "/commissions",
    name: "Comisiones",
    icon: "fas fa-book-reader text-pink",
    rol: "commissions.display",
  },
  {
    path: "/cargo-comiciones",
    name: "Cargo Comisiones",
    icon: " fas fa-regular fa-users text-info",
    rol: "commissions_assign.display",
  },

  {
    path: "/districts",
    name: "Distritos",
    icon: "fas fa-map-marked-alt text-orange",
    rol: "district.display",
  },
  {
    path: "/politicians",
    name: "Diputados",
    icon: "fas fa-users text-info",
    rol: "politicians.display",
  },
  {
    path: "/legislatures",
    name: "Legislaturas",
    icon: "fas fa-calendar-week text-yellow",
    rol: "legislature.display",
  },
  {
    path: "/political-parties",
    name: "Partidos Políticos",
    icon: "fas fa-address-card text-red",
    rol: "political_parties.display",
  },
  {
    path: "/users",
    name: "Usarios",
    icon: "fas fa-solid fa-user text-info",
    rol: "users.display",
  },
  {
    path: "/roles",
    name: "Roles",
    icon: "fas fa-solid fa-sitemap text-green",
    rol: "roles.display",
  },
  {
    path: "/permissions",
    name: "Permisos",
    icon: "fas fa-solid fa-stream text-black",
    rol: "permissions.display",
  },
];
const Dashboard = ({ children }: any) => {
  return (
    <>
      <AdminSidebar routes={routes} />
      <div className="main-content">
        <AdminNavbar />
        <div className="header pb-8 pt-5 pt-md-8 navStyle">
          <p className="tittle">Observatorio Legislativo</p>
          <Cards />
        </div>
        {children}
        <Container>
          <AdminFooter />
        </Container>
      </div>
    </>
  );
};

export default Dashboard;
