import React, { useState } from "react";
import { Form, Message, Button, Card, Header, Grid } from "semantic-ui-react";
import axios from "axios";
import ResultCard from "./ResultCard";
import { CityAirQuality } from "../types/types";
import { getCapitalize } from "../helper/helper";

const AirQualityAssessment: React.FC = () => {
  const [error, setError] = useState<string>("");
  const [formError, setFormError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isResultFound, setResultFound] = useState(false);
  const [cities, setCities] = useState({
    firstCity: "",
    secondCity: "",
  });
  const [firstCityData, setFirstCityData] = useState<CityAirQuality | null>(
    null
  );
  const [secondCityData, setSecondCityData] = useState<CityAirQuality | null>(
    null
  );

  const handleCities = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormError(false);
    setCities({ ...cities, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { firstCity, secondCity } = cities;
    if (firstCity === "" || secondCity === "") {
      setFormError(true);
      return;
    }

    setIsLoading(true);

    try {
      const [firstCityRes, secondCityRes] = await Promise.all([
        axios.get(
          `${process.env.REACT_APP_BASE_URL}${getCapitalize(firstCity)}`
        ),
        axios.get(
          `${process.env.REACT_APP_BASE_URL}${getCapitalize(secondCity)}`
        ),
      ]);
      setResultFound(true);
      setIsLoading(false);
      setFirstCityData({
        city: firstCity,
        aqiData: firstCityRes.data.results,
      });
      setSecondCityData({
        city: secondCity,
        aqiData: secondCityRes.data.results,
      });
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="form-main">
      {!isResultFound ? (
        <>
          {formError && <Message error content={"Both fields are required"} />}
          {error && <Message error content={error} />}
          <Header>
            Please enter two cities in the below form for checking Air quality
          </Header>
          <Card className="air-card">
            <div className="wrapper-form">
              <Form onSubmit={handleSubmit}>
                <Form.Input
                  placeholder="Enter first city name"
                  value={cities?.firstCity}
                  name="firstCity"
                  onChange={handleCities}
                  label="First City"
                />

                <Form.Input
                  placeholder="Enter second city name"
                  value={cities?.secondCity}
                  name="secondCity"
                  onChange={handleCities}
                  label="Second City"
                />

                <Button type="submit" loading={isLoading}>
                  Compare
                </Button>
              </Form>
            </div>
          </Card>
        </>
      ) : (
        <div className="result-main">
          <Grid columns={2}>
            <Grid.Row>
              <Grid.Column>
                <Header as={"h3"}>
                  {getCapitalize(firstCityData?.city as string)}
                </Header>
                {firstCityData?.aqiData?.length > 0 ? (
                  firstCityData?.aqiData?.map((item: any) => {
                    return (
                      <ResultCard
                        city={item?.city}
                        country={item?.country}
                        key={item?.coordinates}
                        coordinates={item?.coordinates}
                        location={item?.location}
                        measurements={item?.measurements}
                      />
                    );
                  })
                ) : (
                  <Message error content={"Result not found"} />
                )}
              </Grid.Column>
              <Grid.Column>
                <Header as={"h3"}>
                  {getCapitalize(secondCityData?.city as string)}
                </Header>
                {secondCityData?.aqiData.length > 0 ? (
                  secondCityData?.aqiData?.map((item: any) => {
                    return (
                      <ResultCard
                        city={item?.city}
                        country={item?.country}
                        key={item?.coordinates}
                        coordinates={item?.coordinates}
                        location={item?.location}
                        measurements={item?.measurements}
                      />
                    );
                  })
                ) : (
                  <Message error content={"Result not found"} />
                )}
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Button className="backToHome" onClick={() => setResultFound(false)}>
            Back To Form
          </Button>
        </div>
      )}
    </div>
  );
};

export default AirQualityAssessment;
