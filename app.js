let InfernalEngine = require('infernal-engine');

async function getPlan() {
 
  let engine = new InfernalEngine();

  let critterModel = require('./models/critterModel');

  await engine.import(critterModel);
  await engine.import({
    age: 8,
    bmi: 24,
    pregnant: true,
  });

  let state = await engine.export();
  return state;   
}

getPlan().then((m)=> {
  
  console.log(`Recommended Sleep: ${m.sleepTime},
   recommended diet: ${m.diet}, 
   recommended workout: ${m.physicalActivity}`);
});

