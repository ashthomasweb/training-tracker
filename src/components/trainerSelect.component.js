import { useContext } from "react";
import { MainContext } from "../context/MainContext";

export const TrainerSelect = () => {
    const { state: { userData }, dispatch } = useContext(MainContext)

    const setCurrentTrainer = (trainerID) => {
        dispatch({ type: 'SET_CURRENT_TRAINER', payload: trainerID })
    }

    console.log(userData.trainers)
    return (
        <>
            <h1>Welcome {userData.name}!</h1>
            <span>Please select your trainer</span>
            <ul>
                {userData.trainers.map((trainerEntry) => (
                    <li onClick={() => setCurrentTrainer(trainerEntry.id)}>{trainerEntry.title}</li>
                ))}
            </ul>
        </>
    )
}