const express = require('express');
const app = express();
app.get('/', (req, res) => {
  res.send('Drop a ❤ if this worked for you!')
  console.log('Pinged!')
});
module.exports = () => {
  app.listen(3000);
}
