const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 9999;
const animeDirectory = './animes';

app.get('/', (req, res) => {
  const animesDirectory = './animes';
  const gamesDirectory = './jeuxvideo';

  let totalPersos = 0;

  // Compter les personnages des animés
  const animeFolders = fs.readdirSync(animesDirectory)
    .filter((folder) => {
      const fullPath = path.join(animesDirectory, folder);
      const persosFilePath = path.join(fullPath, 'persos.json');

      if (fs.existsSync(persosFilePath)) {
        const persosFileContent = fs.readFileSync(persosFilePath, 'utf-8');
        const parsedPersosFile = JSON.parse(persosFileContent);
        return parsedPersosFile.personnages.length > 0;
      }

      return false;
    });

  animeFolders.forEach((folder) => {
    const persosFilePath = path.join(animesDirectory, folder, 'persos.json');
    const persosFileContent = fs.readFileSync(persosFilePath, 'utf-8');
    const parsedPersosFile = JSON.parse(persosFileContent);
    totalPersos += parsedPersosFile.personnages.length;
  });

  // Compter les personnages des jeux vidéo
  const gameFolders = fs.readdirSync(gamesDirectory)
    .filter((folder) => {
      const fullPath = path.join(gamesDirectory, folder);
      const persosFilePath = path.join(fullPath, 'persos.json');

      if (fs.existsSync(persosFilePath)) {
        const persosFileContent = fs.readFileSync(persosFilePath, 'utf-8');
        const parsedPersosFile = JSON.parse(persosFileContent);
        return parsedPersosFile.personnages.length > 0;
      }

      return false;
    });

  gameFolders.forEach((folder) => {
    const persosFilePath = path.join(gamesDirectory, folder, 'persos.json');
    const persosFileContent = fs.readFileSync(persosFilePath, 'utf-8');
    const parsedPersosFile = JSON.parse(persosFileContent);
    totalPersos += parsedPersosFile.personnages.length;
  });
  let routes = [];
  app._router.stack.forEach((middleware) => {
    if (middleware.route && middleware.route.path !== '/') {
      routes.push(middleware.route.path);
    }
  });

  let explanation = 'Hey, this is the Anime API by H4CK3R5-Dmaster 🥳';
  explanation += '<br><br>Available routes: ' + routes.join(', ');
  explanation += '<br><br>You can find the available anime in /animes and the available video games in /jeuxvideo. ';
  explanation += '<br><br>Explanation of :animeName and :jeiName:';
  explanation += '<br><br>:animeName and :jeuName are dynamic route parameters.';
  explanation += '<br>They are used to capture variable values in the URL.';
  explanation += '<br>When you define a route with /animes/:animeName,';
  explanation += ' the segment :animeName can be replaced with any value in the URL.';
  explanation += '<br>You can access this value using req.params.animeName';
  explanation += ' in your processing logic.';
  explanation += '<br>For example, if you call /animes/OnePiece,';
  explanation += ' the value "OnePiece" will be captured and used in your logic';
  explanation += ' to retrieve information about that specific anime.';
  explanation += '<br>Similarly, you can use :jeuName in a route like /jeuxvideo/:jeuName';
  explanation += ' to capture the game name in the URL and use it in your processing.';
  explanation += `<br><br>total number of characters overall : ${totalPersos}`;


  
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
        return parsedPersosFile.personnages.length > 0;
      }

      return false;
    })
    .sort();

  let totalPersos = 0;

  const animésDisponibles = animeFolders.map((folder) => {
    const persosFilePath = path.join(animesDirectory, folder, 'persos.json');
    const persosFileContent = fs.readFileSync(persosFilePath, 'utf-8');
    const parsedPersosFile = JSON.parse(persosFileContent);
    const nombrePersos = parsedPersosFile.personnages.length;

    totalPersos += nombrePersos;

    return { animé: folder, nombrePersos };
  });

  const response = { "nombre total de personnages": totalPersos,  "animés disponibles": animésDisponibles};
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
        return parsedPersosFile.personnages.length > 0;
      }

      return false;
    })
    .sort();

  let totalPersos = 0;

  const gamesDisponibles = gamesFolders.map((folder) => {
    const persosFilePath = path.join(gamesDirectory, folder, 'persos.json');
    const persosFileContent = fs.readFileSync(persosFilePath, 'utf-8');
    const parsedPersosFile = JSON.parse(persosFileContent);
    const nombrePersos = parsedPersosFile.personnages.length;

    totalPersos += nombrePersos;

    return { jeux: folder, nombrePersos };
  });

  const response = { "nombre total de personnages": totalPersos, "jeux_vidéo disponibles": gamesDisponibles };
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
