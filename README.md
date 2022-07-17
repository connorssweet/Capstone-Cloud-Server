# Capstone-Cloud-Server
This node express server lives on Google Cloud and will send MP3 encoded data when text is proviced.

To use text-to-speech, the GET reqeust will take this format:
{SERVER-LINK}:{PORT}/tts?text=text-to-encode

To use this server, you will also be required to configure a .env as well as storing a GCP service account key in a file called serviceAccount.json.
