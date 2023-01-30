import { Accordion } from "semantic-ui-react";
import { MeasurementsProp } from "../types/types";

const Measurement = ({
  value,
  lastUpdated,
  parameter,
  unit,
}: MeasurementsProp) => {
  const panel = [
    {
      key: `panel-${value}`,
      title: unit,
      content: `Air Quality: ${Math.round(
        value as number
      )} ${unit}, Parameter : ${parameter}`,
    },
  ];
  return <Accordion panels={panel} styled />;
};

export default Measurement;
