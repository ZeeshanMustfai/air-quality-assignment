import { Card } from "semantic-ui-react";
import Measurement from "./Measurement";
import { MeasurementsProp, OneCityProp } from "../types/types";

const ResultCard = ({
  city,
  location,
  country,
  coordinates,
  measurements,
}: OneCityProp) => {
  return (
    <Card className="resultCard">
      <Card.Content>
        <Card.Header>{city}</Card.Header>
        <Card.Meta>Air Quality Index</Card.Meta>
        <Card.Description>
          <div>Location : {location ?? "n/a"}</div>
          <div className="coordinates">Country : {country ?? "n/a"}</div>
          {measurements?.map((item: MeasurementsProp) => {
            return (
              <Measurement
                parameter={item?.parameter}
                value={item?.value}
                key={item?.lastUpdated}
                unit={item?.unit}
                lastUpdated={item?.lastUpdated}
              />
            );
          })}
        </Card.Description>
      </Card.Content>
    </Card>
  );
};

export default ResultCard;
