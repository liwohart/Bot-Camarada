require("dotenv").config();

const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');

const TOKEN_VARIABLE_NAME = "GOOGLE_TOKEN_JSON";
const DOTENV_PATH = '.env';

const SCOPES = ['https://www.googleapis.com/auth/drive'];

/**
* Create an OAuth2 client with the given credentials, and then execute the
* given callback function.
* @param {Object} credentials The authorization client credentials.
* @param {function} callback The callback to call with the authorized client.
*/
function authorize(credentials, callback) {
	const {client_secret, client_id, redirect_uris} = credentials.installed;
	const oAuth2Client = new google.auth.OAuth2(
	client_id, client_secret, redirect_uris[0]);

	// Check if we have previously stored a token.
	if (!process.env.GOOGLE_TOKEN_JSON) {
		return getAccessToken(oAuth2Client, callback);
	}
	oAuth2Client.setCredentials(JSON.parse(process.env.GOOGLE_TOKEN_JSON));
	callback(oAuth2Client);
}

/**
* Get and store new token after prompting for user authorization, and then
* execute the given callback with the authorized OAuth2 client.
* @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
* @param {getEventsCallback} callback The callback for the authorized client.
*/
function getAccessToken(oAuth2Client, callback) {
	const authUrl = oAuth2Client.generateAuthUrl({
		access_type: 'offline',
		scope: SCOPES,
	});
	console.log('Authorize this app by visiting this url:', authUrl);
	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout,
	});
	rl.question('Enter the code from that page here: ', (code) => {
		rl.close();
		oAuth2Client.getToken(code, (err, token) => {
			if (err) return console.error('Error retrieving access token', err);
			oAuth2Client.setCredentials(token);
			// Store the token to disk for later program executions
			fs.appendFile(DOTENV_PATH,`\n${TOKEN_VARIABLE_NAME}=${JSON.stringify(token)}`,
				(err) => {
					if (err) return console.log(err);
					console.log("Token stored as", TOKEN_VARIABLE_NAME);
				}
			);
			callback(oAuth2Client);
		});
	});
}

module.exports = authorize;