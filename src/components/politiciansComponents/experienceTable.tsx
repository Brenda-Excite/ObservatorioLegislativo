import { Button } from "reactstrap";

const ExperienceTable = ({experience , handleDeleteExperience}:any) => {
    return (
        <tr>
            <td align="center">{experience.initialPeriod || 'N/E'}</td>
            <td align="center">{experience.finalPeriod || 'N/E'}</td>
            <td align="center">{experience.position}</td>
            <td align="center">{experience.label}</td>
            <td align="center">
            <Button color="danger" onClick={()=>handleDeleteExperience(experience.position)}>
             <i className="far fa-trash-alt"/>
            </Button>
            </td>
        </tr>
    );
};

export default ExperienceTable;