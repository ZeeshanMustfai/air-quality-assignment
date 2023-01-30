import AirQualityAssessment from "./components/AirQualityAssessment";
import AirAnimation from "./components/AirAnimation";
import { Grid } from "semantic-ui-react";

const App = () => {
  return (
    <Grid className="mainGrid">
      <Grid.Row columns={2}>
        <Grid.Column>
          <AirAnimation />
        </Grid.Column>
        <Grid.Column>
          <AirQualityAssessment />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default App;
