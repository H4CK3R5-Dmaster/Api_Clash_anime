const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 9999;
const animeDirectory = './animes';

app.get('/', (req, res) => {
  res.send('Hey this is Anime API by H4CK3R5-Dmaster 🥳 look /animes and enjoy !');
});

app.get("/animes", (req, res) => {
  const animesDirectory = './animes';

  const animeFolders = fs.readdirSync(animesDirectory)
    .filter((folder) => {
      const fullPath = path.join(animesDirectory, folder);
      const persosFilePath = path.join(fullPath, 'persos.json');

      if (fs.existsSync(persosFilePath)) {
        const persosFileContent = fs.readFileSync(persosFilePath, 'utf-8');
        const parsedPersosFile = JSON.parse(persosFileContent);
        return Object.keys(parsedPersosFile).length > 0;
      }

      return false;
    })
    .sort();

  const animésDisponibles = animeFolders.map((folder) => {
    return { animé: folder };
  });

  const response = { "animés disponibles": animésDisponibles };
  res.json(response);
});





app.get('/animes/:animeName', (req, res) => {
  const animeName = req.params.animeName;
  const filePath = path.resolve('animes', animeName, 'persos.json');

  
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      
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
