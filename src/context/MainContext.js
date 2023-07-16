import { createContext } from "react";
import { userData } from "../assets/initialDataConfig";

export const MainContext = createContext()

export const initialMainState = {
    userObj: null,
    userData: userData
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
            console.log(`Trace: SET_CURRENT_TRAINER()`)
            console.log(action.payload)
            return {
              ...state,
              currentTrainer: action.payload
            }
          }
    
        default:
            break;
    }
}
