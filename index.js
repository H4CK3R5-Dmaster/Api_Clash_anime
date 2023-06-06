const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 9999;
const animeDirectory = './animes';

app.get('/', (req, res) => {
  let routes = [];
  app._router.stack.forEach((middleware) => {
    if (middleware.route && middleware.route.path !== '/') {
      routes.push(middleware.route.path);
    }
  });

  let explanation = 'Hey, this is the Anime API by H4CK3R5-Dmaster 🥳';
  explanation += '<br><br>Available routes: ' + routes.join(', ');
  explanation += '<br><br>You can find the available anime in /animes and the available video games in /jeuxvideo. ';
  explanation += '<br><br>Explanation of :animeName and :gameName:';
  explanation += '<br><br>:animeName and :gameName are dynamic route parameters.';
  explanation += '<br>They are used to capture variable values in the URL.';
  explanation += '<br>When you define a route with /animes/:animeName,';
  explanation += ' the segment :animeName can be replaced with any value in the URL.';
  explanation += '<br>You can access this value using req.params.animeName';
  explanation += ' in your processing logic.';
  explanation += '<br>For example, if you call /animes/OnePiece,';
  explanation += ' the value "OnePiece" will be captured and used in your logic';
  explanation += ' to retrieve information about that specific anime.';
  explanation += '<br>Similarly, you can use :gameName in a route like /games/:gameName';
  explanation += ' to capture the game name in the URL and use it in your processing.';
  
  res.send(explanation);
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

app.get("/jeuxvideo", (req, res) => {
  const gamesDirectory = './jeuxvideo';

  const gamesFolders = fs.readdirSync(gamesDirectory)
    .filter((folder) => {
      const fullPath = path.join(gamesDirectory, folder);
      const persosFilePath = path.join(fullPath, 'persos.json');

      if (fs.existsSync(persosFilePath)) {
        const persosFileContent = fs.readFileSync(persosFilePath, 'utf-8');
        const parsedPersosFile = JSON.parse(persosFileContent);
        return Object.keys(parsedPersosFile).length > 0;
      }

      return false;
    })
    .sort();

  const gamesDisponibles = gamesFolders.map((folder) => {
    return { jeux: folder };
  });

  const response = { "jeux_vidéo disponibles": gamesDisponibles };
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
app.get('/jeuxvideo/:jeuName', (req, res) => {
  const jeuName = req.params.jeuName;
  const filePath = path.resolve('jeuxvideo', jeuName, 'persos.json');

  
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
