const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
const config = require('config');

const app = express();

// Connect Database
connectDB();

const Preference = require('./models/Preference');

async function asyncCall() {
  const preference = await Preference.find().sort({_id:-1}).limit(1);
  pref = preference[0];
  console.log(pref.preference1);
  const temp = pref.preference1;

  var spawn = require('child_process').spawn;
  const process = spawn('python', ['rec.py',temp]);
  process.stdout.on('data', (data) => {
    test = data.toString();
  });
  process.stderr.on('data', (data) => {
    console.log('err results: %j', data.toString('utf8'))
  });
  process.stdout.on('end', function(){
  });

}

asyncCall();

// Init Middleware
app.use(express.json());

// Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/internships', require('./routes/api/internship'));
app.use('/api/recommendations', require('./routes/api/recommendation'));
app.use('/api/hackathons', require('./routes/api/hackathon'));

//Deployment on Heroku (Yet to complete)
// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
} 

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
