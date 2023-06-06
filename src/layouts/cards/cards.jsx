import { FaUsers } from "react-icons/fa";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import ListItemText from "@mui/material/ListItemText";
import { FaJedi } from "react-icons/fa";
import { FaBalanceScaleLeft } from "react-icons/fa";
import { FaChartArea } from "react-icons/fa";
import "../../styles/navStyle.css";

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  width: 330,
  color: theme.palette.text.primary,
}));

function createData(name, mumber, icon, color_fondo_icono) {
  return { name, mumber, icon, color_fondo_icono };
}
const diputados = [
  createData("NO. DE DIPUTADOS", "75", <FaUsers color="#FFFFFF" style={{ fontSize: "1.75rem" }} />, "#fb6340"),
  createData("PARTIDOS POLÍTICOS", "8", <FaJedi color="#FFFFFF" style={{ fontSize: "1.75rem" }} />, "#f5365c"),
  createData("MAYORÍA RELATIVA", "45", <FaBalanceScaleLeft color="#FFFFFF" style={{ fontSize: "1.75rem" }} />, "#ffd600"),
  createData("REP. PROPORCIONAL", "30", <FaChartArea color="#FFFFFF" style={{ fontSize: "1.75rem" }} />, "#13dcf2"),
];
/* console.log({ diputados }); */

export default function Apartados() {
  return (
    <Grid container columns={{ xs: 1, sm: 8, md: 8, lg: 4 }}>
      {diputados.map((diputados, index) => (
        <StyledPaper
          key={index}
          sx={{
            my: 2,
            mx: "auto",
            p: 2,
          }}
        >
          <Grid container spacing={0}>
            <Grid item xs zeroMinWidth key={diputados.name} className="tittleCard">
              <ListItemText primary={diputados.name} secondary={diputados.mumber} />
            </Grid>

            <Grid item>
              <div className="iconoDiseño" style={{ backgroundColor: diputados.color_fondo_icono }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  {diputados.icon}
                </div>
              </div>
            </Grid>
          </Grid>
        </StyledPaper>
      ))}
    </Grid>
  );
}
