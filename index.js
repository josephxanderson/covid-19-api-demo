/*
 * COVID-19 API Demonstration
 * Index / Main Entry Point
 *
 * © 2020 Joseph Anderson
 */

// Require the HTTP, URL, and Axios libraries.
const http = require('http');
const url = require('url');
const axios = require('axios');

// Set our base API URL.
const apiBaseUrl = 'https://api.covid19api.com';

// Create the HTTP server.
const server = http.createServer((req, res) => {

	// Extract the URL path into a variable.
	var page = url.parse(req.url).pathname;

	// Index page
	if (page == '/') {
		// Send this request with the HTTP code `200` (OK),
		// and a `Content-Type` header of text/plain.
		res.writeHead(200, {'Content-Type': 'text/plain'});

		// The content to return.
		res.write('Welcome to the COVID-19 API Demonstration :)')
		res.write('\n')
		res.write('Check out my endpoints: /recovered, and /confirmed.')

		// Send the response to the browser.
		res.end();
	}

	// Recovered page
	if (page == '/recovered') {
		// Send this request with the HTTP code `200` (OK),
		// and a `Content-Type` header of text/plain.
		res.writeHead(200, {'Content-Type': 'text/plain'});

		const apiEndpoint = apiBaseUrl + '/total/country/united-states/status/recovered';

		// Use the Axios library to create a Promise.
		// A Promise is is an object that may produce
		// a value some time in the future; either 
		// a resolved value, or a reason that
		// it couldn't be resolved.
		axios.get(apiEndpoint).then((response) => {
			// The Promise succeeded.

			// Extract just the data from the response. If you want 
			// to see what else is in the `response` object, 
			// try `console.log(response)`!
			var data = response.data;

			// Use `pop()` to get the last object in the array of data.
			// Keep in mind that `pop()` actually modifies the 
			// `data` object and also removes the last
			// item as well as returning it.
			var lastItem = data.pop();

			// Get the value from the `Cases` key.
			var numberOfCases = lastItem.Cases;

			// The content to return.
			res.write('Recovered cases as of now: ' + numberOfCases);
		})
		.catch((error) => {
			// The Promise failed.

			// Log the error to the console.
			console.log(error);

			// The content to return.
			res.write('Couldn\'t do that. Try again in a few seconds.');
		})
		.finally(() => {
			// This `finally` callback will always run
			// regardless of what the Promise returns.

			// Send the response to the browser.
			res.end();
		});
	}

	// Confirmed page
	if (page == '/confirmed') {
		// Send this request with the HTTP code `200` (OK),
		// and a `Content-Type` header of text/plain.
		res.writeHead(200, {'Content-Type': 'text/plain'});

		const apiEndpoint = apiBaseUrl + '/total/country/united-states/status/confirmed';

		// Use the Axios library to create a Promise.
		// A Promise is is an object that may produce
		// a value some time in the future; either 
		// a resolved value, or a reason that
		// it couldn't be resolved.
		axios.get(apiEndpoint).then((response) => {
			// The Promise succeeded.

			// Extract just the data from the response. If you want 
			// to see what else is in the `response` object, 
			// try `console.log(response)`!
			var data = response.data;

			// Use `pop()` to get the last object in the array of data.
			// Keep in mind that `pop()` actually modifies the 
			// `data` object and also removes the last
			// item as well as returning it.
			var lastItem = data.pop();

			// Get the value from the `Cases` key.
			var numberOfCases = lastItem.Cases;

			// The content to return.
			res.write('Confirmed cases as of now: ' + numberOfCases);
		})
		.catch((error) => {
			// The Promise failed.

			// Log the error to the console.
			console.log(error);

			// The content to return.
			res.write('Couldn\'t do that. Try again in a few seconds.');
		})
		.finally(() => {
			// This `finally` callback will always run
			// regardless of what the Promise returns.

			// Send the response to the browser.
			res.end();
		});
	}

});

// Start listening to port 8080.
server.listen(8080);