const mongoose = require('mongoose');

const MONGO_URI = 'mongodb+srv://ankitanayak665:gO0VNOAWfFGvipQh@taskmanagement.seenj.mongodb.net/?retryWrites=true&w=majority&appName=TaskManagement';

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });