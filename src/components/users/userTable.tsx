import { Table } from "react-bootstrap";
import { useAppSelector } from "../../hooks/redux-hooks";
import RowsData from "./rowsData";
import React, { useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import "../../styles/search.css";
import { User } from "../../interfaces/userInterface";

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

    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const UsersTable = () => {
  const { users } = useAppSelector((state) => state.user);
  const [search, setSearch] = useState("");

  const searcher = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    console.log(e.target.value);
  };

  //metodo filtrado
  let results = [];
  if (!search) {
    results = users;
  } else {
    results = users.filter((dato: any) => dato.displayName.toLowerCase().includes(search.toLocaleLowerCase()));
  }

  return (
    <div className="sombraTable">
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Search className="search">
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>

          <StyledInputBase onChange={searcher} value={search} placeholder="Buscar…" inputProps={{ "aria-label": "search" }} />
        </Search>
      </div>
      <Table className="align-items-center table-flush borderTable" responsive>
        <thead className="thead-light">
          <tr>
            <th scope="col" className="text-center">
              Nombre
            </th>
            <th scope="col" className="text-center">
              Correo
            </th>
            <th scope="col" className="text-center">
              Tipo de usuario
            </th>
            <th scope="col" className="text-center" colSpan={2}>
              Opciones
            </th>
          </tr>
        </thead>
        <tbody>
          {!results.length ? (
            <tr>
              <td colSpan={4} align="center">
                No se encuentran usuarios registrados
              </td>
            </tr>
          ) : (
            results.map((user: User, index: number) => <RowsData key={user.id} user={user} index={index} />)
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default UsersTable;
