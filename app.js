const express = require('express');
const cors = require('cors');
const { ToyBot, Command } = require('./robot');

const app = express();
const PORT = 4000;

const robots = {};

app.use(cors());
app.use(express.json());

app.post('/simulate', (req, res) => {
  const { input, id } = req.body;
  let robot = robots[id];
  if (!robot) {
    robot = new ToyBot();
    robots[id] = robot;
  }

  const command = new Command(input);
  const output = command.execute(robot);

  res.json({ output });
})

app.listen(PORT, (error) => {
  if (!error) {
    console.log(`Server is listening ... ${PORT}`);
  } else {
    console.log("Error happened", error);
  }
})