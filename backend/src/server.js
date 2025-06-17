const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/portfolio';
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log('Mongo connection error:', err));

app.get('/api', (req, res) => {
  res.json({ message: 'Welcome to the portfolio API' });
});

app.use('/api', require('../routes/authRoutes'));
app.use('/api/sections', require('./routes/sections'));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
