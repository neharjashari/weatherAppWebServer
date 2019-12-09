const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

console.log(__dirname);
console.log(path.join(__dirname, '../public'));

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location (Dynamic files)
app.set('view engine', 'hbs');
app.set('views', viewsPath); // Without this command the hbs only works if the follder that contains the .hbs file is named "views"
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
	// Dynamic content (view)
	res.render('index', {
		title: 'Weather',
		name: 'Nehar Jashari'
	});
});

app.get('/about', (req, res) => {
	res.render('about', {
		title: 'About',
		name: 'Nehar Jashari'
	});
});

app.get('/help', (req, res) => {
	res.render('help', {
		message: 'You access the pages by switching the path of URL.',
		title: 'Help',
		name: 'Nehar Jashari'
	});
});

app.get('/weather', (req, res) => {
	const address = req.query.address;

	if (!address) {
		return res.send({
			errorMessage: 'You must provide an address term'
		});
	}

	// = {} 	-Destructuring by setting a default empty object, in order to work properly.
	geocode(address, (error, { location, latitude, longitude } = {}) => {
		if (error) {
			return res.send({ error });
		}

		forecast(latitude, longitude, (error, forecastData) => {
			if (error) {
				return res.send({ error });
			}

			res.send({
				forecast: forecastData,
				location: location
			});
		});
	});
});

app.get('/products', (req, res) => {
	// console.log(req.query);
	// console.log(req.query.search);
	// console.log(req.query.rating);

	if (!req.query.search) {
		return res.send({
			errorMessage: 'You must provide a search term'
		});
	}

	res.send({
		products: []
	});
});

app.get('/help/*', (req, res) => {
	res.render('404', {
		title: '404',
		name: 'Nehar Jashari',
		errorMessage: 'Article not found'
	});
});

// Match everything else (every other route)
// This needs to come last, to be able to work
app.get('*', (req, res) => {
	res.render('404', {
		title: '404',
		name: 'Nehar Jashari',
		errorMessage: 'Page not found'
	});
});

app.listen(3000, () => {
	console.log('Server is up on port 3000.');
});
