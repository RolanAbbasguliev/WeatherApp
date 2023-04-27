export interface IWeatherToday {
  location: {
    name: string;
    region: string;
    country: string;
    lat: number;
    lon: number;
    tz_id: string;
    localtime_epoch: number;
    localtime: Date;
  };
  current: {
    last_updated_epoch: number;
    last_updated: string;
    temp_c: number;
    temp_f: number;
    is_day: number;
    condition: {
      text: string;
      icon: string;
      code: number;
    };
    wind_mph: number;
    wind_kph: number;
    wind_degree: number;
    wind_dir: string;
    pressure_mb: number;
    pressure_in: number;
    recip_mm: number;
    precip_in: number;
    humidity: number;
    cloud: number;
    feelslike_c: number;
    feelslike_f: number;
    vis_km: number;
    vis_miles: number;
    uv: number;
    gust_mph: number;
    gust_kph: number;
  };
}

export interface IWeatherDaily {
  timelines: {
    daily: [
      {
        time: Date;
        values: {
          cloudBaseAvg: number;
          cloudBaseMax: number;
          cloudBaseMin: number;
          cloudCeilingAvg: number;
          cloudCeilingMax: number;
          cloudCeilingMin: number;
          cloudCoverAvg: number;
          cloudCoverMax: number;
          cloudCoverMin: number;
          dewPointAvg: number;
          dewPointMax: number;
          dewPointMin: number;
          evapotranspirationAvg: number;
          evapotranspirationMax: number;
          evapotranspirationMin: number;
          evapotranspirationSum: number;
          freezingRainIntensityAvg: number;
          freezingRainIntensityMax: number;
          freezingRainIntensityMin: number;
          humidityAvg: number;
          humidityMax: number;
          humidityMin: number;
          iceAccumulationAvg: number;
          iceAccumulationLweAvg: number;
          iceAccumulationLweMax: number;
          iceAccumulationLweMin: number;
          iceAccumulationLweSum: number;
          iceAccumulationMax: number;
          iceAccumulationMin: number;
          iceAccumulationSum: number;
          moonriseTime: Date;
          moonsetTime: Date;
          precipitationProbabilityAvg: number;
          precipitationProbabilityMax: number;
          precipitationProbabilityMin: number;
          pressureSurfaceLevelAvg: number;
          pressureSurfaceLevelMax: number;
          pressureSurfaceLevelMin: number;
          rainAccumulationAvg: number;
          rainAccumulationLweAvg: number;
          rainAccumulationLweMax: number;
          rainAccumulationLweMin: number;
          rainAccumulationMax: number;
          rainAccumulationMin: number;
          rainAccumulationSum: number;
          rainIntensityAvg: number;
          rainIntensityMax: number;
          rainIntensityMin: number;
          sleetAccumulationAvg: number;
          sleetAccumulationLweAvg: number;
          sleetAccumulationLweMax: number;
          sleetAccumulationLweMin: number;
          sleetAccumulationLweSum: number;
          sleetAccumulationMax: number;
          sleetAccumulationMin: number;
          sleetIntensityAvg: number;
          sleetIntensityMax: number;
          sleetIntensityMin: number;
          snowAccumulationAvg: number;
          snowAccumulationLweAvg: number;
          snowAccumulationLweMax: number;
          snowAccumulationLweMin: number;
          snowAccumulationLweSum: number;
          snowAccumulationMax: number;
          snowAccumulationMin: number;
          snowAccumulationSum: number;
          snowIntensityAvg: number;
          snowIntensityMax: number;
          snowIntensityMin: number;
          sunriseTime: Date;
          sunsetTime: Date;
          temperatureApparentAvg: number;
          temperatureApparentMax: number;
          temperatureApparentMin: number;
          temperatureAvg: number;
          temperatureMax: number;
          temperatureMin: number;
          uvHealthConcernAvg: number;
          uvHealthConcernMax: number;
          uvHealthConcernMin: number;
          uvIndexAvg: number;
          uvIndexMax: number;
          uvIndexMin: number;
          visibilityAvg: number;
          visibilityMax: number;
          visibilityMin: number;
          weatherCodeMax: number;
          weatherCodeMin: number;
          windDirectionAvg: number;
          windGustAvg: number;
          windGustMax: number;
          windGustMin: number;
          windSpeedAvg: number;
          windSpeedMax: number;
          windSpeedMin: number;
        };
      }
    ];
  };

  location: {
    lat: number;
    lon: number;
    name: string;
    type: string;
  };
}

export interface IWeatherCard {
  dayDate: Date;
  imgUrl: string;
  minTemp: number;
  maxTemp: number;
}

export interface IWeatherHightLights {
  uvIndex: number;
  wind_kph: number;
  sunriseTime: Date;
  sunsetTime: Date;
  vis_km: number;
  humidity: number;
  feelslike_c: number;
}
