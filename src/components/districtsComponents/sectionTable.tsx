import { Button } from "react-bootstrap";

interface Props{
    section:string;
    handleDeleteSection: (s: string) => void
}
const SectionTable = ({section , handleDeleteSection}:Props) => {
    return (
        <tr>
         <td align="center">{section}</td>
         <td align="center">
             <Button variant="danger"
              onClick={()=>handleDeleteSection(section)}
             >
                 Eliminar
            </Button>
         </td>
        </tr>
    );
};

export default SectionTable;