// Centralized way to manage the state of the workouts

// CreateContext: Create a context object.
// useReducer: An alternative to useState. 
// Accepts a reducer of type (state, action) => newState, 
// and returns the current state paired with a dispatch method.
import { createContext, useReducer } from 'react'

// Context used to share the workout state and DISPATCH
// function across the component tree.
export const WorkoutsContext = createContext()

// Reducer function to handle the state changes
export const workoutsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_WORKOUTS':
      return { 
        workouts: action.payload 
      }
    case 'CREATE_WORKOUT':
      return { 
        workouts: [action.payload, ...state.workouts] 
      }
    case 'DELETE_WORKOUT':
      return { 
        workouts: state.workouts.filter(w => w._id !== action.payload._id) 
      }
    default:
      return state
  }
}

// Context provider
export const WorkoutsContextProvider = ({ children }) => {
  // useReducer returns the current state and a dispatch method
  const [state, dispatch] = useReducer(workoutsReducer, { 
    workouts: null
  })
  
  return (
    <WorkoutsContext.Provider value={{ ...state, dispatch }}>
      { children }
    </WorkoutsContext.Provider>
  )
}