import { createContext } from "react";
import { userData } from "../assets/initialDataConfig";

export const MainContext = createContext()

export const initialMainState = {
  userObj: null,
  userData: userData,
  currentTrainerID: null,
  daysTaskOutput: []
}

export const MainReducer = (state, action) => {
  switch (action.type) {

    case 'SET_CURRENT_USER_TO_STATE': {
      // console.log(`Trace: SET_CURRENT_USER_TO_STATE()`)
      let data = action.payload.userObj
      let userObj = data
      return {
        ...state,
        userObj: userObj,
      }
    }

    case 'SIGN_USER_OUT': {
      // console.log(`Trace: SIGN_USER_OUT()`)
      let userObj = null
      return {
        ...state,
        userObj: userObj,
      }
    }

    case 'SET_CURRENT_TRAINER': {
      // console.log(`Trace: SET_CURRENT_TRAINER()`)
      return {
        ...state,
        currentTrainerID: action.payload
      }
    }

    case 'SET_DAYS_TASK_OUTPUT': {
      // console.log(`Trace: SET_DAYS_TASK_OUTPUT()`)
      return {
        ...state,
        daysTaskOutput: [...action.payload]
      }
    }

    case 'ADD_NEW_TASK': {
      const updatedUserData = {
        ...state.userData,
        trainers: state.userData.trainers.map(trainer => {
          if (trainer.id === action.payload.trainerID) {
            return {
              ...trainer,
              tasks: [...trainer.tasks, action.payload.task],
            };
          }
          return trainer;
        }),
      };

      return {
        ...state,
        userData: updatedUserData
      }
    }

    default:
      break;
  }
}
