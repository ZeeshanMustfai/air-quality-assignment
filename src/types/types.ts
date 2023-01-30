export interface CityAirQuality {
    city: string;
    aqiData: OneCityProp;
  }
  export interface MeasurementsProp {
    lastUpdated?: string;
    parameter?: string;
    unit?: string;
    value?: number | null;
  }
  export interface OneCityProp {
    [x: string]: any;
    location?: string | null;
    city?: string | null;
    country?: string | null;
    coordinates?: number | null;
    measurements?: MeasurementsProp[];
  }