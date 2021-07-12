//Required packages
const express = require('express');
const mongoose = require('mongoose');

//Connections
const app = express();
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

//Establishing Database connection
mongoose.connect('mongodb://localhost:27017/usersDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//Constants

const planSchema = {
  title: String,
  pregnantPlan: String,
  infantPlan: String,
  childPlan: String,
  childOverPlan: String,
  childUnderPlan: String,
  adultPlan: String,
  adultOverPlan: String,
  adultUnderPlan: String,
  olderAdultPlan: String,
  olderAdultOverPlan: String,
  olderAdultUnderPlan: String,
};

const sleepSchema = {
  title: String,
  infantRecommendedSleep: String,
  childRecommendedSleep: String,
  adultRecommendedSleep: String,
  olderAdultRecommendedSleep: String,
};

const Workout = mongoose.model('Workout', planSchema);
const Sleep = mongoose.model('Sleep', sleepSchema);

module.exports = {
  name: 'User',

  vIntake: 'unkown',
  sVar: 'unkown',
  sResult: 'unkown',
  recommendedPlan: 'unkown',
  healthStatus: 'unkown',
  physicalActivity: 'unkown',
  sleepTime: 'unkown',
  classified: 'unkown',
  diet: 'unkown',
  carbsIntake: 'unkown',
  proteinIntake: 'unkown',
  fatsIntake: 'unkown',
  recommendedIntake: 'unkown',
  recommendedCalIntake: 'unkown',
  dietGoal: 'unkown',
  amr: '',
  bmi: '',
  age: '',
  pregnant: '',
  fruitsAndVeggies: '',
  dailyStress: '',
  dailySteps: '',
  sleepHours: '',
  dailyActivity: '',
  gender: '',
  weight: '',
  height: '',

  isHealthy: async function (bmi) {
    if (bmi > 25) {
      return { healthStatus: 'overweight' };
    } else if (bmi < 18.5) {
      return { healthStatus: 'underweight' };
    } else {
      return { healthStatus: 'healthy' };
    }
  },

  classify: async function (age) {
    if (age >= 3 && age <= 5) {
      return { classified: 'infant' };
    } else if (age > 5 && age <= 17) {
      return { classified: 'child' };
    } else if (age > 17 && age <= 64) {
      return { classified: 'adult' };
    } else if (age > 64) {
      return { classified: 'older adult' };
    }
  },

  calcAmr: async (gender, height, weight, age, dailyActivity) => {
    return gender === 'male'
      ? {
          amr: Math.round(
            (10 * weight + 6.25 * height - 5 * age + 5) * dailyActivity
          ),
        }
      : {
          amr: Math.round(
            (10 * weight + 6.25 * height - 5 * age - 161) * dailyActivity
          ),
        };
  },

  calcCals: async (amr, healthStatus, pregnant) => {
    return pregnant
      ? {
          recommendedCalIntake: amr + pregnant,
          dietGoal: 'stay on the recommended caloric range',
        }
      : healthStatus === 'healthy'
      ? {
          recommendedCalIntake: amr,
          dietGoal: 'maintain your weight',
        }
      : healthStatus === 'overweight'
      ? {
          recommendedCalIntake: amr - 500,
          dietGoal: 'loose around 0.5 kg a week',
        }
      : {
          recommendedCalIntake: amr + 500,
          dietGoal: 'gain around 0.5 kg a week',
        };
  },

  calcMacros: async (recommendedCalIntake) => {
    return {
      carbsIntake: Math.round((recommendedCalIntake * 0.5) / 4),
      fatsIntake: Math.round((recommendedCalIntake * 0.25) / 9),
      proteinIntake: Math.round((recommendedCalIntake * 0.25) / 4),
    };
  },

  recommendIntake: async (
    recommendedCalIntake,
    dietGoal,
    carbsIntake,
    fatsIntake,
    proteinIntake
  ) => {
    return {
      recommendedIntake: `Your recommended daily caloric intake is ${recommendedCalIntake} calories, 
    make sure to stay within this limit to ${dietGoal}, also make sure to
    divide it as follows: ${carbsIntake} gms of carbs, 
    ${proteinIntake} gms of protein and ${fatsIntake} gms of fats`,
    };
  },

  dstress: async function (dailyStress, fruitsAndVeggies) {
    if (fruitsAndVeggies === 4) {
      if (dailyStress < 4) {
        this.sVar = 'daily stress is in the normal range';
        this.sResult = 'healthy';
      } else {
        this.sVar = 'daily stress is above average';
        this.sresult = 'unheatlhy';
      }
    }
  },

  sHours: async function (sleepHours, fruitsAndVeggies) {
    if (fruitsAndVeggies === 3) {
      if (sleepHours < 7) {
        this.sVar = 'daily sleeep hours are below the needed amount';
        this.sResult = 'unhealhty';
      } else if (sleepHours > 7 && sleepHours < 10) {
        this.sVar = 'daily sleep hours are in the perfect range';
        this.sResult = 'healthy';
      } else if (sleepHours === 10) {
        this.sVar = 'daily sleep hours are above the needed amount';
        this.sResult = 'unhealthy';
      }
    }
  },

  dSteps: async function (dailySteps, fruitsAndVeggies) {
    if (fruitsAndVeggies === 2) {
      if (dailySteps >= 1 && dailySteps <= 7) {
        this.sVar = 'daily steps activity is average';
        this.sResult = 'unhealthy';
      } else if (dailySteps > 7) {
        this.sVar = 'daily steps activity is in the perfect range';
        this.sResult = 'healhty';
      }
    }
  },

  fAndVeg: async function (fruitsAndVeggies) {
    if (fruitsAndVeggies >= 0 && fruitsAndVeggies < 2) {
      this.vIntake = 'so low';
      this.sVar = 0;
      this.sResult = 'unhealthy';
    } else if (fruitsAndVeggies >= 2 && fruitsAndVeggies < 4) {
      this.vIntake = 'avarege';
    } else if (fruitsAndVeggies === 4) {
      this.vIntake = 'above avarege';
    } else if (fruitsAndVeggies === 5) {
      this.vIntake = 'perfect';
      this.sVar = 0;
      this.sResult = 'healthy';
    }

    return this.sVar
      ? {
          recommendedPlan: `Your vegatables and fruits daily intake is ${this.vIntake} and your ${this.sVar}, which might lead to a ${this.sResult} bmi rate according to a wellbeing survey`,
        }
      : {
          recommendedPlan: `Your vegetables and fruits daily intake is ${this.vIntake}, which might lead to a ${this.sResult} bmi rate according to a wellbeing survey`,
        };
  },

  sleep: async function (classified) {
    await Sleep.findOne({ title: 'sleep' }, (err, foundPlan) => {
      if (err) {
        console.log(err);
      } else {
        if (classified === 'infant') {
          this.sleepTime = foundPlan.infantRecommendedSleep;
        } else if (classified === 'child') {
          this.sleepTime = foundPlan.childRecommendedSleep;
        } else if (classified === 'adult') {
          this.sleepTime = foundPlan.adultRecommendedSleep;
        } else if (classified === 'older adult') {
          this.sleepTime = foundPlan.olderAdultRecommendedSleep;
        }
      }
    });
    return {
      sleepTime: this.sleepTime,
    };
  },

  workout: async function (classified, healthStatus, pregnant) {
    await Workout.findOne({ title: 'workout' }, (err, foundPlan) => {
      if (err) {
        console.log(err);
      } else {
        if (pregnant) {
          this.physicalActivity = foundPlan.pregnantPlan;
        } else if (classified === 'infant') {
          this.physicalActivity = foundPlan.infantPlan;
        } else if (classified === 'child') {
          if (healthStatus === 'healthy') {
            this.physicalActivity = foundPlan.childPlan;
          } else if (healthStatus === 'overweight') {
            this.physicalActivity = foundPlan.childOverPlan;
          } else if (healthStatus === 'underweight') {
            this.physicalActivity = foundPlan.childUnderPlan;
          }
        } else if (classified === 'adult') {
          if (healthStatus === 'healthy') {
            this.physicalActivity = foundPlan.adultPlan;
          } else if (healthStatus === 'overweight') {
            this.physicalActivity = foundPlan.adultOverPlan;
          } else if (healthStatus === 'underweight') {
            this.physicalActivity = foundPlan.adultUnderPlan;
          }
        } else if (classified === 'older adult') {
          if (healthStatus === 'healthy') {
            this.physicalActivity = foundPlan.olderAdultPlan;
          } else if (healthStatus === 'overweight') {
            this.physicalActivity = foundPlan.olderAdultOverPlan;
          } else if (healthStatus === 'underweight') {
            this.physicalActivity = foundPlan.olderAdultUnderPlan;
          }
        }
      }
    });
    return {
      physicalActivity: this.physicalActivity,
    };
  },
};
