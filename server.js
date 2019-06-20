const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
const PORT = process.env.PORT || 5000;

const app = express();

//Connect Database
connectDB();

//init Middleware
app.use(express.json({ extended: false }));

//Define Routes
app.use('/techs', require('./routes/techs'));
app.use('/logs', require('./routes/logs'));

//Serve static assets in production
// if (process.env.NODE_ENV === 'production') {
//   //Set static folder
//   app.use(express.static('build'));

//   app.get('*', (req, res) =>
//     res.sendFile(path.resolve(__dirname, 'build', 'index.html'))
//   );
// }

app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')));
app.get('/ping', function(req, res) {
  return res.send('pong');
});
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
