import { useContext } from "react";
import { MainContext } from "../context/MainContext";

export const TrainerSelect = () => {
    const { state: { userData, currentTrainerID }, dispatch } = useContext(MainContext)

    const setCurrentTrainer = (trainerID) => {
        dispatch({ type: 'SET_CURRENT_TRAINER', payload: trainerID })
    }

    return (
        <div className='trainer-select'
        style={{display: `${currentTrainerID ? 'none' : 'flex'}`}}>
            <h1>Welcome {userData.name}!</h1>
            <span>Please select your trainer</span>
            <ul>
                {userData.trainers.map((trainerEntry, index) => (
                    <li key={index} onClick={() => setCurrentTrainer(trainerEntry.id)}>{trainerEntry.title}</li>
                ))}
            </ul>
        </div>
    )
}