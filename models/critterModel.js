module.exports = {
  name: 'User',

  healthStatus: 'unkown',
  physicalActivity: 'unkown',
  sleepTime: 'unkown',
  classified: 'unkown',
  diet: 'unkown',
  bmi: '',
  age: '',
  pregnant: false,

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

  isPregnant: async function (pregnant) {
    if (pregnant) {
      return {
        physicalActivity: `if you haven’t been exercising regularly, you might start with moderate walking or swimming regimen,
        or perhaps prenatal yoga or Pilates classes, even just five to ten minutes a day is beneficial and a good place to start.`,
        diet: `It's important to remember that you are eating for two now, this is no time for fad or low-calorie dieting. In fact, as a general rule, 
        you need to consume about 300 more calories per day than you did before you became pregnant. You need these extra calories and nutrients so your baby can grow normally.`,
      };
    }
  },
  workoutAndDiet: async function (healthStatus, classified, pregnant) {
    if (!pregnant) {
      if (classified === 'infant') {
        return {
          physicalActivity: `Children at this age tend to have natural tendency towards being active so 3 hours of physical
          activiy throught the day would be perfect and that includes light, moderate and vigorous activities `,
          diet: `Make sure your child's diet consists the healthiest options out there, 
          including vegetables and fruits, low fat dairy products lean protiens (beans, chicken, turkey, fish, lean hamburger, tofu, eggs) ,
          whole-grain cereals and bread and limit processed food and sugary drinks.`,
        };
      } else if (classified === 'child') {
        if (healthStatus === 'healthy') {
          return {
            physicalActivity: `Recommended daily activity is a minimum of 60 minutes of moderate to vigorous activity per day,
            make sure to include Aerobic, muscle-strengthening and bone strenghtening activities`,
            diet: `Make sure to stay away from processed food, eat whole foods, lean protiens, 
            healthy carbs like sweet potatos, brown rice and whole grains and finally make sure to stay on your expected daily caloric intake`,
          };
        } else if (healthStatus === 'overweight') {
          return {
            physicalActivity: `A recommended start for your daily activity is a minimum of 30 minutes of moderate to vigorous activity per day,
            make sure to include Aerobic, muscle-strengthening and bone strenghtening 
            activities with more focus on aerobics as it helps more with loosing weight, the duration of daily activity goes up as you lose weight`,
            diet: `Make sure to stay away from processed food, eat whole foods, lean protiens, 
            healthy carbs like sweet potatos, brown rice and whole grains, try to have more 
            protien based diet and less carb based and finally make sure to stay on your expected daily caloric defecit`,
          };
        } else {
          return {
            physicalActivity: `A recommended start for your daily activity is a minimum of 30 minutes of moderate to vigorous activity per day,
            make sure to include Aerobic, muscle-strengthening and bone strenghtening 
            activities with more focus on muscle-strenghening as it helps more with gaining weight, the duration of daily activity goes up as you lose weight`,
            diet: `Make sure to stay away from processed food, eat whole foods, lean protiens, 
            healthy carbs like sweet potatos, brown rice and whole grains, try to have less
            protien based diet and more carb based and finally make sure to stay on your expected daily caloric surplus`,
          };
        }
      } else if (classified === 'adult') {
        if (healthStatus === 'healthy') {
          return {
            physicalActivity: `Recommended daily activity is a minimum of 50 minutes of moderate to vigorous activity per day,
            make sure to include Aerobic, muscle-strengthening and bone strenghtening activities`,
            diet: `Make sure to stay away from processed food, eat whole foods, lean protiens, 
            healthy carbs like sweet potatos, brown rice and whole grains and finally make sure to stay on your expected daily caloric intake`,
          };
        } else if (healthStatus === 'overweight') {
          return {
            physicalActivity: `A recommended start for your daily activity is a minimum of 25 minutes of moderate to vigorous activity per day,
            make sure to include Aerobic, muscle-strengthening and bone strenghtening 
            activities with more focus on aerobics as it helps more with loosing weight, the duration of daily activity goes up as you lose weight`,
            diet: `Make sure to stay away from processed food, eat whole foods, lean protiens, 
            healthy carbs like sweet potatos, brown rice and whole grains, try to have more 
            protien based diet and less carb based and finally make sure to stay on your expected daily caloric defecit`,
          };
        } else {
          return {
            physicalActivity: `A recommended start for your daily activity is a minimum of 25 minutes of moderate to vigorous activity per day,
            make sure to include Aerobic, muscle-strengthening and bone strenghtening 
            activities with more focus on muscle-strenghening as it helps more with gaining weight, the duration of daily activity goes up as you lose weight`,
            diet: `Make sure to stay away from processed food, eat whole foods, lean protiens, 
            healthy carbs like sweet potatos, brown rice and whole grains, try to have less
            protien based diet and more carb based and finally make sure to stay on your expected daily caloric surplus`,
          };
        }
      } else {
        if (healthStatus === 'healthy') {
          return {
            physicalActivity: `Recommended daily activity is a minimum of 30 minutes of moderate to vigorous activity per day,
            make sure to include Aerobic, muscle-strengthening and bone strenghtening activities`,
            diet: `Make sure to stay away from processed food, eat whole foods, lean protiens, 
            healthy carbs like sweet potatos, brown rice and whole grains and finally make sure to stay on your expected daily caloric intake`,
          };
        } else if (healthStatus === 'overweight') {
          return {
            physicalActivity: `A recommended start for your daily activity is a minimum of 20 minutes of moderate to vigorous activity per day,
            make sure to include Aerobic, muscle-strengthening and bone strenghtening 
            activities with more focus on aerobics as it helps more with loosing weight, the duration of daily activity goes up as you lose weight`,
            diet: `Make sure to stay away from processed food, eat whole foods, lean protiens, 
            healthy carbs like sweet potatos, brown rice and whole grains, try to have more 
            protien based diet and less carb based and finally make sure to stay on your expected daily caloric defecit`,
          };
        } else {
          return {
            physicalActivity: `A recommended start for your daily activity is a minimum of 20 minutes of moderate to vigorous activity per day,
            make sure to include Aerobic, muscle-strengthening and bone strenghtening 
            activities with more focus on muscle-strenghening as it helps more with gaining weight, the duration of daily activity goes up as you lose weight`,
            diet: `Make sure to stay away from processed food, eat whole foods, lean protiens, 
            healthy carbs like sweet potatos, brown rice and whole grains, try to have less
            protien based diet and more carb based and finally make sure to stay on your expected daily caloric surplus`,
          };
        }
      }
    }
  },

  sleep: async function (age) {
    if (age >= 3 && age <= 5) {
      return { sleepTime: 'The perfect sleep range is 10 - 13 hours' };
    } else if (age > 5 && age <= 13) {
      return { sleepTime: 'The perfect sleep range is from 9 to 11 hours' };
    } else if (age > 13 && age <= 17) {
      return { sleepTime: 'The perfect sleep range is from 8.5 - 9.5 hours' };
    } else if (age > 17 && age <= 64) {
      return { sleepTime: 'The perfect sleep range is from 7 - 9 hours' };
    } else if (age > 64) {
      return { sleepTime: 'The perfect sleep range is from 7 - 8 hours' };
    }
  },


};
