import { useEffect } from "react";
import { Image } from "react-bootstrap";
import { useGetImage } from "../../hooks/useGetImage";
import { Politician } from "../../interfaces/politiciansInterface";

interface Props {
  politician: Politician;
  index: number;
}
const RankingTable = ({ politician, index }: Props) => {
  const { name, image_path, percentile_Indicators, political_party } = politician;

  const { photo, getImagePath } = useGetImage();

  useEffect(() => {
    getImagePath(image_path ? image_path : "produccion/political-parties/default-image.png");
    // eslint-disable-next-line
  }, [image_path]);
  return (
    <tr>
      <td align="center">{index + 1}</td>
      <td align="center">{<Image src={photo} width="80" alt="name" roundedCircle />}</td>
      <td align="center">{name}</td>
      <td align="center">{political_party.value}</td>
      <td align="center">{percentile_Indicators.assistances}</td>
      <td align="center">{percentile_Indicators.commisions_assistances}</td>
      <td align="center">{percentile_Indicators.full_participation}</td>
      <td align="center">{percentile_Indicators.initiatives_presented}</td>
      <td align="center">{percentile_Indicators.transparency}</td>
      <td align="center">{percentile_Indicators.initiatives_approved}</td>
      <td align="center">{percentile_Indicators.total}</td>
    </tr>
  );
};

export default RankingTable;
