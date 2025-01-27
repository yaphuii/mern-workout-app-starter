const Workout = require('../models/workoutModel');
const mongoose = require('mongoose');

// Get all workouts
const getWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find({}).sort({ createdAt: -1 });
    res.status(200).json(workouts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single workout
const getWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid ID' });
  }

  try {
    const workout = await Workout.findById(id);
    if (!workout) {
      return res.status(404).json({ error: 'Workout not found' });
    }
    res.status(200).json(workout);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new workout
const createWorkout = async (req, res) => {
  const { title, reps, load } = req.body;

  let emptyFields = [];
  if (!title) emptyFields.push('title');
  if (!reps) emptyFields.push('reps');
  if (!load) emptyFields.push('load');

  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all the fields', emptyFields });
  }

  try {
    const workout = await Workout.create({ title, reps, load });
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a workout
const deleteWorkout = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid ID' })
  }

  try {
    const workout = await Workout.findOneAndDelete({ _id: id })
    if (!workout) {
      return res.status(400).json({ error: 'Workout not found' })
    }
    res.status(200).json({ message: 'Workout deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Update a workout
const updateWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid ID' });
  }

  try {
    const workout = await Workout.findOneAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true } // Return the updated workout
    );

    if (!workout) {
      return res.status(400).json({ error: 'Workout not found' });
    }

    res.status(200).json(workout);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getWorkouts,
  getWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkout
};
