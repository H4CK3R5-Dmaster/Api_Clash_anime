const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 9999;
const animeDirectory = './animes';

app.get('/', (req, res) => {
  res.send('Hey this is my API running 🥳');
});

app.get('/animes/:animeName', (req, res) => {
  const animeName = req.params.animeName;
  const filePath = path.join(animeDirectory, animeName, 'persos.json');
  
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      res.status(404).json({ error: 'Anime not found' });
      res.send(err)
      return;
    }

    const characters = JSON.parse(data);
    res.json(characters);
  });
});

app.listen(port, () => {
  console.log(`API server is running on port ${port}`);
});
