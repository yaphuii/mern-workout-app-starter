import React, { useEffect } from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import WorkoutForm from '../components/WorkoutForm'
import WorkoutsList from '../components/WorkoutsList'

const Home = () => {
  const { dispatch } = useWorkoutsContext()

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await fetch('/api/workouts')
        if (!response.ok) {
          throw new Error('Failed to fetch workouts')
        }

        const json = await response.json()

        // Dispatch the workouts to the context
        dispatch({ type: 'SET_WORKOUTS', payload: json })
      } catch (error) {
        console.error('Error fetching workouts:', error)
      }
    }

    fetchWorkouts()
  }, [dispatch])

  return (
    <div className="home">
      <WorkoutForm />
      <WorkoutsList />
    </div>
  )
}

export default Home