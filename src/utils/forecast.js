const request = require("request");
const forecast = (lat, lng, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=45964aab9ef5798de7b3516467bd203d&query=${lat},${lng}&units=f`;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather services", undefined);
    } else if (body.error) {
      callback(
        "Unable to find location, please try another location",
        undefined
      );
    } else {
      callback(
        undefined,
        // weatherDescriptions: body.current.weather_descriptions[0],
        // temperature: body.current.temperature,
        // feelslike: body.current.feelslike,
        `${body.current.weather_descriptions[0]}, It is currently ${body.current.temperature} degrees but feels like ${body.current.feelslike}. The current wind speed is ${body.current.wind_speed} with a wind degree of ${body.current.wind_degree} at a direction of ${body.current.wind_dir}`
      );
    }
  });
};

module.exports = forecast;
