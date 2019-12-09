const path = require('path');
const express = require('express');

console.log(__dirname);
console.log(path.join(__dirname, '../public'));

const app = express();

const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates');

// Dynamic files
app.set('view engine', 'hbs');
app.set('views', viewsPath); // Without this command the hbs only works if the follder that contains the .hbs file is named "views"

// Serving up static files
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
		title: 'Help',
		message: 'You access the pages by switching the path of URL.'
	});
});

app.get('/weather', (req, res) => {
	res.send({
		forecast: 'Supermjegull',
		location: 'Prishtina'
	});
});

app.listen(3000, () => {
	console.log('Server is up on port 3000.');
});

// app.get('', (req, res) => {
// 	res.send('<h1>Weather</h1>');
// });

// app.get('/help', (req, res) => {
// 	res.send([
// 		{
// 			name: 'Nehar',
// 			age: 21
// 		},
// 		{
// 			name: 'Andrew',
// 			age: 27
// 		}
// 	]);
// });

// app.get('/about', (req, res) => {
// 	res.send('<h1>About Page</h1>');
// });
