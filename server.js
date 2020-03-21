const express = require('express');
const connectDB = require('./db');
var cookieParser = require('cookie-parser');
const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false })).use(cookieParser());

app.use(express.static('public'));

// Define Routes
app.use(express.json());
app.use('/api/library', require('./routes/library'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/settings', require('./routes/settings'));

app.get('/', (req, res) => res.json({ msg: 'Welcome to API' }));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
