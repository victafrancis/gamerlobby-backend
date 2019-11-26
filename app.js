//app.js file this file will hold the core logic
//of our Mean stack project’s backend logic
let express = require('express'),
  path = require('path'),
  mongoose = require('mongoose'),
  cors = require('cors'),
  bodyParser = require('body-parser'),
  dataBaseConfig = require('./database/db');

// Connecting mongoDB
mongoose.Promise = global.Promise;
mongoose.connect(dataBaseConfig.db, {
  useUnifiedTopology: true, useNewUrlParser: true
}).then(() => {
    console.log('Database connected sucessfully ')
  },
  error => {
    console.log('Could not connected to database : ' + error)
  }
)

// Set up express js port
const playerRoute = require('../backend/routes/player.route')
const userRoute = require('../backend/routes/user.route')

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(cors());
app.use(express.static(path.join(__dirname, 'dist/mean-stack-project')));
app.use('/', express.static(path.join(__dirname, 'dist/mean-stack-project')));
app.use('/api', playerRoute)
// app.use('/user', userRoute)


// Create port 4000
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  console.log('Connected to port ' + port)
})

// app.listen(process.env.PORT || 3000, function(){
//   console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
// });

// Find 404 and hand over to error handler
app.use((req, res, next) => {
  // next(createError(404));
  next(new Error("error"));
});

// error handler
app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});
