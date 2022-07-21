const URL = "https://solar-virtue-356102.nn.r.appspot.com";
const REQ_TTS = "/tts";
const PARAM_TEXT = "?text=";
const REQUEST = URL + REQ_TTS + PARAM_TEXT;
var player = require('play-sound')(opts = {})
var startDate, endDate;

function playAudio(file) {
	endDate   = new Date();
	player.play(file, function (err) {
		if (err) throw err;
		console.log("Audio finished");
		var diffSeconds = (endDate.getTime() - startDate.getTime()) / 1000;
		console.log("Time to response: " + diffSeconds + " seconds");
	  });
}

const axios = require('axios');
const fs = require('fs');
const util = require('util');

async function writeMP3(res) {
	const writeFile = util.promisify(fs.writeFile);
	console.log(res.data.audioContent.data)
	buf = Buffer.from(res.data.audioContent.data, 'binary');
	await writeFile('output.mp3', buf, 'binary');
	console.log('Audio content written to file: output.mp3');
}
function getTTS(text) {
	startDate = new Date();

	axios
  .get(REQUEST + text)
  .then(res => {
	writeMP3(res);
	playAudio("output.mp3");
  })
  .catch(error => {
    console.error(error);
  });

}	

getTTS("boop")