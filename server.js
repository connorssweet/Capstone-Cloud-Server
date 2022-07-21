'use strict';

const express = require('express');
const app = express();
const TTS = require('@google-cloud/text-to-speech');
require('dotenv').config();

const client = new TTS.TextToSpeechClient();

/*
Uses Google TTS to convert incoming text to MP3 encoded data
*/
async function convertTextToMp3(text) {
  //build request  
  const request = {
    input: {
      text: text
    },
    voice: {
      languageCode: 'en-US',
      ssmlGender: 'NEUTRAL'
    },
    audioConfig: {
      audioEncoding: 'MP3'
    }
  }

  //get speech from api
  const [response] = await client.synthesizeSpeech(request)

  //return audio content
  return response;
  //.audioContent;//.toString();
}

/*
Removes hyphens from text before conversion
*/
async function textToSpeech(text) {
  const formattedText = text.split('-').join(' ');
  return await convertTextToMp3(formattedText);
}

/* 
Handles GET /tts request
Requests take the form: GET /tts?text=example-text
*/
app.get('/tts', (req, res) => {
  const text = req.query.text;
  textToSpeech(text).
  then(result=> {
      res.send(result);
  });
});

// Designate port
const PORT = parseInt(process.env.PORT) || 8080;
app.listen(PORT, () => {
  console.log('TTS active on port ' + PORT);
});

module.exports = app;
