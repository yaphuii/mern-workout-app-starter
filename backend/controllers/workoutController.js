import Workout from '../models/workoutModel.js';
import mongoose from 'mongoose';

// Get all workouts
export const getWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find({}).sort({ createdAt: -1 });
    res.status(200).json(workouts);
  } catch (error) {
    console.error(error); // Log error
    res.status(400).json({ error: 'Error fetching workouts' });
  }
};

// Get a single workout
export const getWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such workout' });
  }

  try {
    const workout = await Workout.findById(id);
    if (!workout) {
      return res.status(404).json({ error: 'No such workout' });
    }
    res.status(200).json(workout);
  } catch (error) {
    console.error(error); // Log error
    res.status(400).json({ error: 'Error fetching workout' });
  }
};

// Create a new workout
export const createWorkout = async (req, res) => {
  const { title, load, reps } = req.body;

  let emptyFields = [];
  if (!title) emptyFields.push('title');
  if (!load) emptyFields.push('load');
  if (!reps) emptyFields.push('reps');

  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all fields', emptyFields });
  }

  try {
    const workout = await Workout.create({ title, load, reps });
    res.status(201).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a workout
export const deleteWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'No such workout' });
  }

  try {
    const workout = await Workout.findOneAndDelete({ _id: id });
    if (!workout) {
      return res.status(400).json({ error: 'No such workout' });
    }
    res.status(200).json(workout);
  } catch (error) {
    console.error(error); // Log error
    res.status(400).json({ error: `Error deleting workout: ${error.message}` });
  }
};

// Update a workout
export const updateWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'No such workout' });
  }

  try {
    const workout = await Workout.findOneAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true } // This option returns the updated document
    );
    if (!workout) {
      return res.status(400).json({ error: 'No such workout' });
    }
    res.status(200).json(workout);
  } catch (error) {
    console.error(error); // Log error
    res.status(400).json({ error: `Error updating workout: ${error.message}` });
  }
};