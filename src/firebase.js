/******************************************************************************
* FILENAME:
*   firebase.js

* DESCRIPTION:
*   Primary database layer. All direct interaction with the firebase websocket
*   for authentication or FireStore database resides in this file.

* NOTES:
*   - dispatch() is passed to several functions in this file, setting state
*     directly from this layer.
*   - Any change in the key/value structure of a UI boardObj must be reflected 
*     in saveUserBoardToDB().

* Usage Rights: Not for public use or redistribution.

******************************************************************************/

import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { userData } from './assets/initialDataConfig'

import {
  getFirestore,
  collection,
  query,
  getDocs,
  getDoc,
  doc,
  setDoc,
  onSnapshot,
} from 'firebase/firestore'

import weekChecker from './utilities/weekChecker'

let firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
}

const app = initializeApp(firebaseConfig)

export const authentication = getAuth(app)

const db = getFirestore()

export const userInitializationHandler = async (
  userAuth,
  dispatch,
  callback
) => {
  console.log(`Trace: userInitializationHandler`)
  if (!userAuth) return // prevent firing during lifecycle, before userAuth obj is obtained

  onSnapshot(
    doc(
      db,
      'users',
      `${userAuth.uid}`
    ),
    async (document) => {
      if (!document.exists()) {
        const createdAt = new Date()
        const { displayName, email, photoURL, uid } = userAuth
        let user = {
          displayName,
          email,
          photoURL,
          uid,
          createdAt,
        }
        try {
          await setDoc(
            doc(
              db,
              'users',
              `${userAuth.uid}`
            ),
            user
          )
          console.log('no exist')
          dispatch({
            type: 'SET_CURRENT_USER_TO_STATE',
            payload: { userObj: user },
          })
        } catch (error) {
          console.log('error creating user', error.message)
        }
      }  else if (document.exists()) {
        let userObjFromDB = document.data()
        userObjFromDB = {
          ...userObjFromDB,
        }

        dispatch({
          type: 'SET_CURRENT_USER_TO_STATE',
          payload: { userObj: userObjFromDB },
        })
      }
    }
  )
}

export const gatherUserDataFromDB = async (userAuth, dispatch) => {
  console.log(`Trace: gatherUserDataFromDB`)
  if (!userAuth) return
  let userDataArray = []
  const userBoardFirestoreRef = await collection(
    db,
    `users`,
    `${userAuth.uid}`,
    `testing`,
  )
  const userBoardQuery = query(userBoardFirestoreRef)
  const userBoardSnapshot = await getDocs(userBoardQuery)
  userBoardSnapshot.forEach((doc) => {
    userDataArray.push(doc.data())
  })
  let updatedUserData = weekChecker(userDataArray[0])
//   let testUserData = weekChecker(userData)
  dispatch({ type: 'SET_USERLISTS', payload: { userData: updatedUserData } })
}

export const saveUserDataToDB = async (userUID, userDataObj) => {
  console.log(`Trace: saveUserDataToDB`)
  console.log(userDataObj)
  const listFireStoreRef = doc(
    db,
    `users`,
    `${userUID}`,
    `testing`,
    `data`
    )
    
    const listSnapShot = await getDoc(listFireStoreRef)
    
    if (!listSnapShot.exists()) {
      try {
        await setDoc(listFireStoreRef, userDataObj)
    } catch (error) {
      console.log('error creating new list', error.message)
    }
  } else if (listSnapShot.exists()) {
    try {
      await setDoc(listFireStoreRef, userDataObj, {merge: true}) 
    } catch (error) {
      console.log('error updating list', error.message)
    }
  }
}

/* END of document ***********************************************************/
