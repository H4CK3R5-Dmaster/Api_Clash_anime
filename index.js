const express = require('express');
const fs = require('fs');

const app = express();
const port = 9999;
const url = "/animes"
app.get('/', (req, res) => {
    res.send('Hey this is my API running 🥳')
})

app.get('/animes', (req, res) => {
    res.send("Find all animes")
})
app.get('/animes/v1/:animeName', (req, res) => {
  const animeName = req.params.animeName;
  console.log(animeName)
  const filePath = `/animes/${animeName}/persos.json`;
  console.log(filePath)
  
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
