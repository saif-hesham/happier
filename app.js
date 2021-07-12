//Required packages
const express = require('express');
const InfernalEngine = require('infernal-engine');
const mongoose = require('mongoose');

//Connections
const app = express();
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

//Establishing Database connection
mongoose.connect('mongodb+srv://admin-saif:test123@cluster0.m66zn.mongodb.net/usersDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//Creating the database schema and model
const userSchema = {
  name: String,
  email: String,
  password: String,
  weight: Number,
  height: Number,
  healthStatus: String,
  physicalActivity: String,
  recommendedSleep: String,
  diet: String,
  dTreePlan: String,
};

const User = mongoose.model('User', userSchema);

//Routes

//Home route
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

//Register routes
app.get('/register', (req, res) => {
  res.sendFile(__dirname + '/register.html');
});

app.post('/register', (req, res) => {
  async function getPlan() {
    const bmi =
      parseInt(req.body.weight) /
      Math.pow(parseInt(req.body.height) / 100, 2).toFixed(1);
    let engine = new InfernalEngine();
    let critterModel = require('./critterModel');
    console.log(req.body);
    await engine.import(critterModel);
    await engine.import({
      age: +req.body.age,
      bmi: bmi,
      gender: req.body.gender,
      dailyActivity: +req.body.dailyActivity,
      weight: +req.body.weight,
      height: +req.body.height,
      pregnant: +req.body.pregnant? +req.body.pregnant: false,
      dailyStress: +req.body.dailyStress,
      sleepHours: +req.body.dailySleep,
      dailySteps: +req.body.dailyWalk,
      fruitsAndVeggies: +req.body.fruitsAndVeggies,
    });

    let state = await engine.export();
    return state;
  }

  getPlan().then((m) => {
    //Registering the user in the database
    console.log(m.recommendedIntake);
    const email = req.body.email;

    User.findOne({ email: email }, (err, foundUser) => {
      if (err) {
        console.log(err);
      } else if (foundUser) {
        res.send(
          'User is already registered, please use another email address.'
        );
      } else {
        const newUser = new User({
          name:
            req.body.firstName.charAt(0).toUpperCase() +
            req.body.firstName.slice(1) +
            ' ' +
            req.body.lastName.charAt(0).toUpperCase() +
            req.body.lastName.slice(1),
          email: req.body.email,
          password: req.body.password,
          weight: parseInt(req.body.weight),
          height: parseInt(req.body.height),
          healthStatus: m.healthStatus,
          physicalActivity: m.physicalActivity,
          recommendedSleep: m.sleepTime,
          diet: m.recommendedIntake,
          dTreePlan: m.recommendedPlan,
        });
        newUser.save((err) => {
          if (err) {
            console.log(err);
          } else {
            res.render('home', {
              userName:
                req.body.firstName.charAt(0).toUpperCase() +
                req.body.firstName.slice(1) +
                ' ' +
                req.body.lastName.charAt(0).toUpperCase() +
                req.body.lastName.slice(1),
              bmiRate: m.bmi.toFixed(1),
              healthStatus: m.healthStatus,
              recommendedSleep: m.sleepTime,
              workout: m.physicalActivity,
              diet: m.diet,
              recommendedIntake: m.recommendedIntake,
              dTreePlan: m.recommendedPlan,
            });
          }
        });
      }
    });
  });
});

//Login routes
app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/login.html');
});

app.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email: email }, (err, foundUser) => {
    if (err) {
      res.send(
        "User wasn't found, please go back and make sure you have entered the correct email address."
      );
      console.log(err);
      return;
    } else if (foundUser.password === password) {
      res.render('home', {
        userName: foundUser.name,
        bmiRate: (
          parseInt(foundUser.weight) /
          Math.pow(parseInt(foundUser.height) / 100, 2)
        ).toFixed(1),
        healthStatus: foundUser.healthStatus,
        recommendedSleep: foundUser.recommendedSleep,
        workout: foundUser.physicalActivity,
        recommendedIntake: foundUser.diet,
        dTreePlan: foundUser.dTreePlan,
      });
    } else {
      res.send("The password isn't correct, please go back and try again");
    }
  });
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Server started on port 3000');
});
