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
