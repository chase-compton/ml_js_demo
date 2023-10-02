const generateData = () => {
  //generate sin data
  const numDataPoints = 100;
  const data = [];

  for (let i = 0; i < numDataPoints; i++) {
    const amplitude = Math.random() * 50 + 10;
    const frequency = Math.random() * 10 + 1;
    const phase = Math.random() * Math.PI * 2;
    const item = {};
    for (let j = 0; j < 100; j++) {
      const value = Math.round(amplitude * Math.sin(frequency * j + phase));
      item[j] = value; // Assign the sine wave value to numerical indices
    }
    item.label = "sin"; // Set the label
    data.push(item);
  }

  //generate noise data
  for (let i = 0; i < numDataPoints; i++) {
    const item = {};
    for (let j = 0; j < 100; j++) {
      const value = Math.floor(Math.random() * 120 - 60); // Random value between 10 and 60
      item[j] = value; // Assign the noise value to numerical indices
    }
    item.label = "noise"; // Set the label
    data.push(item);
  }

  return data;
};

const data = generateData();
console.log(data);

// Step 2: set neural network options
const options = {
  task: "classification",
  debug: true,
};

// Step 3: initialize your neural network
const nn = ml5.neuralNetwork(options);

// Step 4: add data to the neural network
data.forEach((item) => {
  const first100Values = {};

  for (let i = 0; i < 100; i++) {
    if (item[i] !== undefined) {
      first100Values[i] = item[i];
    }
  }

  console.log('100 Values', first100Values);
  const inputs = first100Values;
  console.log(inputs);
  const output = {
    label: item.label,
  };

  nn.addData(inputs, output);
});
console.log('Raw', nn.data);

// Step 5: normalize your data;
nn.normalizeData();
// Step 6: train your neural network
const trainingOptions = {
  epochs: 32,
  batchSize: 12,
};
nn.train(trainingOptions, finishedTraining);

// Step 7: use the trained model
function finishedTraining() {
  classify();
}

// Step 8: make a classification
function classify() {
  const amplitude = Math.random() * 50 + 10;
  const frequency = Math.random() * 10 + 1;
  const phase = Math.random() * Math.PI * 2;
  const input = {};
  for (let j = 0; j < 100; j++) {
    const value = Math.round(amplitude * Math.sin(frequency * j + phase));
    input[j] = value; // Assign the sine wave value to numerical indices
  }
  nn.classify(input, handleResults);
}

// Step 9: define a function to handle the results of your classification
function handleResults(error, result) {
  if (error) {
    console.error(error);
    return;
  }
  console.log(result);
}
