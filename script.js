const generateData = () => {
  // 10,000 Samples, 5000 each
  const numDataPoints = 5000;
  const data = [];
  
  //generate sin data
  for (let i = 0; i < numDataPoints / 2; i++) {
    const amplitude = Math.random() * 30 + 10;
    const frequency = Math.random() * 5 + 1;
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
  for (let i = 0; i < numDataPoints / 2; i++) {
    const item = {};
    for (let j = 0; j < 100; j++) {
      const value = Math.floor(Math.random() * 80 - 40); // Random value between -40 and 40
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

  const inputs = first100Values;
  const output = {
    label: item.label,
  };

  nn.addData(inputs, output);
});
console.log("Raw", nn.data);

// Step 5: normalize your data;
nn.normalizeData();
// Step 6: train your neural network
// Epoch: 60 - 40
// Batch Size: 20 - 10
const trainingOptions = {
  epochs: 50,
  batchSize: 20,
};

console.log('Epochs: ', trainingOptions.epochs)
console.log('Batch Size: ', trainingOptions.batchSize)
nn.train(trainingOptions, finishedTraining);

// Step 7: use the trained model
function finishedTraining() {
  classify();
}

// Step 8: make a classification
function classify() {
  for (let i = 0; i < 5; i++) {
    const amplitude = Math.random() * 30 + 10;
    const frequency = Math.random() * 5 + 1;
    const phase = Math.random() * Math.PI * 2;
    const sinInput = {};
    for (let j = 0; j < 100; j++) {
      const value = Math.round(amplitude * Math.sin(frequency * j + phase));
      sinInput[j] = value; 
    }
    nn.classify(sinInput, handleResults);
    const noiseInput = {};
    for (let j = 0; j < 100; j++) {
      const value = Math.floor(Math.random() * 80 - 40); // Random value between -40 and 40
      noiseInput[j] = value; // Assign the noise value to numerical indices
    }
    nn.classify(noiseInput, handleResults)
  }
}

// Step 9: define a function to handle the results of your classification
function handleResults(error, result) {
  if (error) {
    console.error(error);
    return;
  }
  console.log(result[0]);
}
