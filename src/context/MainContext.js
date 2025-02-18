import { createContext } from "react";
// import { userData } from "../assets/initialDataConfig";
import { saveUserDataToDB } from "../firebase";

export const MainContext = createContext()

export const initialMainState = {
  userObj: null,
  userData: null,
  currentTrainerID: null,
  daysTaskOutput: [],
  historyReady: false,
  addToSelected: {
    weekIndex: null,
    day: null
  }
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
      // console.log(`Trace: ADD_NEW_TASK()`)
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

      saveUserDataToDB(action.payload.userUID, updatedUserData)
      return {
        ...state,
        userData: updatedUserData
      }
    }

    case 'ADD_TASK_TO_HISTORY': {
    //   console.log(`Trace: ADD_TASK_TO_HISTORY()`)
      const history = state.userData.trainers.filter(trainer => trainer.id === action.payload.currentTrainerID)[0].history
    //   debugger
      history[0] = action.payload.mostRecentWeek
    //   debugger
      const updatedUserData = {
        ...state.userData,
        trainers: state.userData.trainers.map(trainer => {
          if (trainer.id === action.payload.currentTrainerID) {
            return {
              ...trainer,
              history
            };
          }
          return trainer;
        }),
      };
    //   debugger
      saveUserDataToDB(action.payload.userUID, updatedUserData)
      return {
        ...state,
        userData: updatedUserData
      }
    }

    case 'ADD_TASK_TO_BACK_HISTORY': {
          console.log(`Trace: ADD_TASK_TO_BACK_HISTORY()`)
          debugger
          const history = action.payload.history
          const updatedUserData = {
            ...state.userData,
            trainers: state.userData.trainers.map(trainer => {
              if (trainer.id === action.payload.currentTrainerID) {
                return {
                  ...trainer,
                  history
                };
              }
              return trainer;
            }),
          };
          debugger
          saveUserDataToDB(action.payload.userUID, updatedUserData)
          return {
            ...state,
            userData: updatedUserData
          }
        }
    
    case 'SET_USERLISTS': {
      console.log(`Trace: SET_USERLISTS()`)

    //   debugger
      return {
        ...state,
        userData: action.payload.userData
      }
    }

    case 'SET_HISTORY_READY': {
      // console.log(`Trace: SET_HISTORY_READY()`)
      return {
        ...state,
        historyReady: true
      }
    }

    case 'SET_ADD_TO_SELECTED_CONDITIONS': {
        console.log(`Trace: SET_ADD_TO_SELECTED_CONDITIONS()`)
        return {
          ...state,
          addToSelected: action.payload.addToSelected
        }
      }

    default:
      break;
  }
}
