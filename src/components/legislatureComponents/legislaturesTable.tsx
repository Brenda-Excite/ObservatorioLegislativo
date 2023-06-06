import { Table } from "react-bootstrap";
import { useAppSelector } from "../../hooks/redux-hooks";
import { Legislature } from "../../interfaces/legislaturesInterfaces";
import LegislatureTable from "./legislatureTable";
import "../../styles/navStyle.css";

const LegislaturesTable = () => {
  const { legislatures } = useAppSelector((state) => state.legislature);
  return (
    <div className="sombraTable">
      <Table className="align-items-center table-flush" responsive>
        <thead className="thead-light">
          <tr>
            <th scope="col" className="text-center">
              #
            </th>
            <th scope="col" className="text-center">
              legislatura
            </th>
            <th scope="col" className="text-center">
              Opciones
            </th>
          </tr>
        </thead>
        <tbody>
          {!legislatures.length ? (
            <tr>
              <td colSpan={4} align="center">
                No se encuentran legislaturas registradas
              </td>
            </tr>
          ) : (
            legislatures.map((legislature: Legislature, index: number) => <LegislatureTable key={legislature.id} legislature={legislature} index={index} />)
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default LegislaturesTable;
