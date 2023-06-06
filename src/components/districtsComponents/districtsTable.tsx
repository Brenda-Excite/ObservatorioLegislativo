import { Table } from "react-bootstrap";
import { useAppSelector } from "../../hooks/redux-hooks";
import DistrictTable from "./districtTable";
import { District } from "../../interfaces/districtsInterfaces";
import "../../styles/table.css";

//search
import React, { useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import "../../styles/search.css";
import Pagination, {
  bootstrap5PaginationPreset,
} from "react-responsive-pagination";


const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.1),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.black, 0.15),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const DistrictsTable = () => {
  const { districts } = useAppSelector((state) => state.district);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pagination = 10;

  const searcher = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    console.log(e.target.value);
  };
  //metodo filtrado
  let results = [];
  if (!search) {
    results = districts;
  } else {
    results = districts.filter((dato: any) => dato.name.toLowerCase().includes(search.toLocaleLowerCase()));
  }
  return (
    <div className="sombraTable">
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        {/* <input type="text" placeholder="search" value={search} onChange={searcher} /> */}
        <Search className="search">
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>

          <StyledInputBase onChange={searcher} value={search} placeholder="Buscar…" inputProps={{ "aria-label": "search" }} />
        </Search>
      </div>
      <Table className="align-items-center table-flush borderTable " responsive size="sm">
        <thead className="thead-light">
          <tr>
            <th scope="col" className="text-center">
              Distrito ID
            </th>
            <th scope="col" className="text-center">
              Número en Romano
            </th>
            <th scope="col" className="text-center">
              Nombre del Distrito
            </th>
            <th scope="col" className="text-center">
              Número de Representados
            </th>
            <th scope="col" className="text-center">
              Opciones
            </th>
          </tr>
        </thead>
        <tbody>
          {!results.length ? (
            <tr>
              <td colSpan={6} align="center">
                No se encuentran distritos registrados{" "}
              </td>
            </tr>
          ) : (
            results
            .slice((currentPage - 1) * pagination, currentPage * pagination)
            .map((district: District) => <DistrictTable key={district.id} district={district} />)
          )}
        </tbody>
      </Table>
      <div className="pagination-space">
        <Pagination
          {...bootstrap5PaginationPreset}
          current={currentPage}
          total={Math.ceil(results.length / pagination)}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default DistrictsTable;
