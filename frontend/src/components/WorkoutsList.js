import React, { useEffect, useContext } from 'react'
import { WorkoutsContext } from '../context/WorkoutsContext' // Import the context

const WorkoutList = () => {
  const { workouts, dispatch } = useContext(WorkoutsContext) // Access workouts and dispatch from context

  useEffect(() => {
    // Fetch workouts when component mounts
    const fetchWorkouts = async () => {
      try {
        const response = await fetch('/api/workouts')
        const data = await response.json()
        // Dispatch SET_WORKOUTS action to store workouts in context
        dispatch({ type: 'SET_WORKOUTS', payload: data })
      } catch (error) {
        console.error('Error fetching workouts:', error)
      }
    }

    fetchWorkouts()
  }, [dispatch]) // Only re-run effect when dispatch changes

  const deleteWorkout = async (id) => {
    try {
      const response = await fetch(`/api/workouts/${id}`, {
        method: 'DELETE'
      })

      if (!response.ok) {
        throw new Error('Failed to delete workout')
      }

      // Dispatch DELETE_WORKOUT action to update state
      dispatch({ type: 'DELETE_WORKOUT', payload: { _id: id } })
    } catch (error) {
      console.error('Error deleting workout:', error)
    }
  }

  return (
    <div>
      <h1>Workouts</h1>
      <ul>
        {workouts.map((workout) => (
          <li key={workout._id}>
            {workout.title} - {workout.reps} reps, {workout.load}kg
            <button onClick={() => deleteWorkout(workout._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default WorkoutList
