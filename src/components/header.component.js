import { useContext } from "react";
import { MainContext } from "../context/MainContext";
import { getAuth } from "firebase/auth";

export const Header = () => {

    const { state: { userData, currentTrainerID }, dispatch } = useContext(MainContext)

    const userAuth = getAuth()

    const signOutHandler = () => {
        userAuth.signOut()
        dispatch({ type: 'SIGN_USER_OUT' })
    }

    const switchTrainers = () => {
        dispatch({ type: 'SET_CURRENT_TRAINER', payload: null })
    }

    const userSettings = () => {
        alert('Coming Soon!')
    }

    return (
        <div className="header">
            <h1>{currentTrainerID ? userData.trainers.filter(entry => entry.id === currentTrainerID)[0].title : null}</h1>
            <button onClick={signOutHandler}>Sign Out</button>
            <button onClick={switchTrainers}>Switch Trainers</button>
            <button onClick={userSettings}>Settings</button>
        </div>
    )
}