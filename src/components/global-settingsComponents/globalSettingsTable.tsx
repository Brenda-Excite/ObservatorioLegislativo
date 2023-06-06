import { Table } from "react-bootstrap";
import { useAppSelector } from "../../hooks/redux-hooks";
import { GlobalSettings } from "../../interfaces/globalSettingsInterface";
import GlobalSettingTable from "./globalSettingTable";

const GlobalSettingsTable = () => {
  const { settings } = useAppSelector((state) => state.global_settings);

  return (
    <div className="sombraTable">
      <Table className="align-items-center table-flush" responsive size="sm">
        <thead className="thead-light">
          <tr>
            <th scope="col" className="text-center">
              LEGISLATURA ACTUAL
            </th>
            <th scope="col" className="text-center">
              NO. TOTAL DE SESIONES PLENARIAS
            </th>
            <th scope="col" className="text-center">
              NO. DE SESIONES POR PERIODO
            </th>
            <th scope="col" className="text-center">
              Opciones
            </th>
          </tr>
        </thead>
        <tbody>
          {!settings.length ? (
            <tr>
              <td colSpan={6} align="center">
                No se encuentran distritos registrados{" "}
              </td>
            </tr>
          ) : (
            settings.map((setting: GlobalSettings) => <GlobalSettingTable key={setting.id} setting={setting} />)
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default GlobalSettingsTable;
