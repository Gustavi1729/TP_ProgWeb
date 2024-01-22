const express = require('express');
const path = require('path');

const app = express();
app.use(express.static(path.join(__dirname, '..', '..', 'public')));

app.get('/', (req, res) => {
  res.send('Main page!');
});

app.listen(3000, function () {
  console.log('Server listening on port 3000');
});
