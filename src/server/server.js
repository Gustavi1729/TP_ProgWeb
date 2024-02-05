const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const jsonParser = bodyParser.json();

app.use(express.static(path.join(__dirname, '..', '..', 'public')));


app.listen(3000, function () {
  console.log('Server listening on port 3000');
});


app.post('/', jsonParser, function (req, res) {
  const mensagem = req.body.mensagem;
  res.send(mensagem);
  
  })