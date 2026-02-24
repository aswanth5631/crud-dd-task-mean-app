const mongoose = require('mongoose');

const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/mean_db';

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Cannot connect to the database!', err));

const express = require('express');
const app = express();
app.use(express.json());

app.get('/', (req, res) => res.send('MEAN Backend is running!'));

const PORT = 8080;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
