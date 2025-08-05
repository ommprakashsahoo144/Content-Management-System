const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();

// Routes
const authRoutes = require('./routes/authRoutes');
// More routes like userRoutes, articleRoutes etc. will be added

const userRoutes = require('./routes/userRoutes');
const articleRoutes = require('./routes/articleRoutes');
const commentRoutes = require('./routes/commentRoutes');
const likeRoutes = require('./routes/likeRoutes');

app.use('/api/users', userRoutes);
app.use('/api/articles', articleRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/likes', likeRoutes);


app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

app.get('/', (req, res) => res.send('CMS API is running...'));

module.exports = app;
