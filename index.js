const express = require('express');
const fs = require('fs');

const app = express();
const port = 9999;
app.get('/', (req, res) => {
    res.send('Hey this is my API running 🥳')
})
app.get('/animes/v1/:animeName', (req, res) => {
  const animeName = req.params.animeName;
  const filePath = `./${animeName}/persos.json`;
  
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      res.status(404).json({ error: 'Anime not found' });
      return;
    }

    const characters = JSON.parse(data);
    res.json(characters);
  });
});

app.listen(port, () => {
  console.log(`API server is running on port ${port}`);
});
