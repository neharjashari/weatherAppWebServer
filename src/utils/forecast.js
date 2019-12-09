const request = require('request');

const forecast = (latitude, longitude, callback) => {
	const url =
		'https://api.darksky.net/forecast/3dc03029d54fe051da0f01bed84fecba/' +
		latitude +
		',' +
		longitude +
		'?units=si';

	request({ url: url, json: true }, (error, response) => {
		if (error) {
			callback('Unable to connect to weather service!', undefined);
		} else if (response.body.error) {
			callback('Unable to find the location!', undefined);
		} else {
			const temperature = response.body.currently.temperature;
			const precipProbability = response.body.currently.precipProbability;

			callback(
				undefined,
				response.body.daily.data[0].summary +
					' It is currently ' +
					temperature +
					' degrees out. There is a ' +
					precipProbability +
					'% chance of rain.'
			);
		}
	});
};

module.exports = forecast;
