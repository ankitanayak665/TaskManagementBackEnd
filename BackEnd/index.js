const express = require('express');
const { db } = require('./src/models/userModel');
const app = express();
const port = process.env.PORT || 5000;
const mongo = require('./src/models/db')
const {User} = require('./src/models/userModel')
const {Cred} = require('./src/models/userModel')
const cors = require('cors');
const authRouter = require('./src/Routes/AuthRouter')
app.use(cors());
app.use(express.json());
app.use('/auth',authRouter)
app.get('/', (req, res) => {
  res.send('Hello, World!');
});
app.post('/addTask', async (req, res) => {
  try {
    const taskItem = {
      title: req.body.title,
      description: req.body.description,
    };

    // Save the new task in the database
    const result = await User.create(taskItem);
    
    // Send a response back to the client
    res.status(201).json({ message: "Task added successfully", task: result });
  } catch (error) {
    res.status(500).json({ error: "Failed to add task" });
  }
});
app.patch('/editTask', async (req, res) => {
  console.log("Request body:", req.body);
  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: req.body.id }, // Find by ID
      {
        title: req.body.title,
        description: req.body.description,
      },
      { new: true } // Return the updated document
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "Task not found" });
    }

    // Send a response back to the client with the updated task
    res.status(200).json({ message: "Task edited successfully", task: updatedUser });
  } catch (error) {
    console.error("Error editing task:", error);
    res.status(500).json({ error: "Failed to edit task" });
  }
});

// GET route to retrieve all tasks
app.get('/allTasks', async (req, res) => {
  try {
    const tasks = await User.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});
app.delete('/taskItem/:id', async (req, res) => {
  const { id } = req.params; // Extract the ID from the URL parameters
  try {
    const deletedTask = await User.findByIdAndDelete(id); // Delete the task by ID
    if (!deletedTask) {
      return res.status(404).json({ error: "Task not found" }); // If no task is found
    }
    res.status(200).json({ message: "Task deleted successfully", deletedTask }); // Respond with success
  } catch (error) {
    res.status(500).json({ error: "Failed to delete task" }); // Handle errors
  }
});

async function fetchTasks() {
  try {
    const result = await User.create({
      "title":"Task 2",
      "description":"test2"
    }); // Use Tasks.find() directly with Mongoose
  } catch (error) {
  }
}


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});