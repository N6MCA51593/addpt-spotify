const express = require('express');
const connectDB = require('./db');
const cookieParser = require('cookie-parser');
const app = express();
const cors = require('cors');
const rateLimiter = require('./middleware/rateLimiter');
const poll = require('./poll');
const frontEndURI = process.env.FRONT_END_URI;

connectDB();

app.use(rateLimiter);
app.use(express.json({ extended: false })).use(cookieParser());
app.use(
  cors({
    origin: [frontEndURI],
    credentials: true
  })
);

app.use(express.json());
app.use('/api/library', require('./routes/library'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/settings', require('./routes/settings'));
app.use('/api/sync', require('./routes/sync'));
app.use('/api/history', require('./routes/history'));

//Poll Spotify API for users' played tracks history changes
const interval = 3600000;
setInterval(async () => {
  await poll();
  app.emit('message', { title: 'message' });
}, interval);
//app.on('message', data => console.log(data));
app.get('/', (req, res) => res.json({ msg: 'Welcome to API' }));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
