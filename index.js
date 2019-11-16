const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const vttToJson = require('vtt-to-json');
const app = express();
const PORT = 8000;

// fix cors problem
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));

app.use(bodyParser.json());

// open file use http://127.0.0.1:8000/api/video/playlist.m3u8
app.use('/api/video', express.static(path.join(__dirname, 'assets', 'stream')));

app.get('/api/parser', function (req, res) {
  const content = fs.readFileSync('./assets/demo.vtt', { encoding: 'utf-8' });

  vttToJson(content).then(r => res.send(r));
});

app.listen(PORT, () => console.log('listen port 8000'));