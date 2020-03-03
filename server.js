const express = require('express');
const connectDB = require('./db');
var cookieParser = require('cookie-parser');
const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false })).use(cookieParser());

// Define Routes
//app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
//app.use('/api/contacts', require('./routes/contacts'));

app.get('/', (req, res) => res.json({ msg: 'Welcome to API' }));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
