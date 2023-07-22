import { useContext } from "react"
import { MainContext } from "../context/MainContext"
import { saveUserDataToDB } from "../firebase"

export const TaskList = () => {
    const { state: { currentTrainerID, userData, userObj }, dispatch } = useContext(MainContext)

    const taskDisplay = (task) => {

        return (
            <table>
                <tbody>
                    <tr>
                        <td>Title:</td>
                        <td><strong>{task.title}</strong></td>
                    </tr>
                    <tr>
                        <td>Desc:</td>
                        <td>{task.description}</td>
                    </tr>
                    <tr>
                        <td>Points:</td>
                        <td>{task.pointValue}</td>
                    </tr>
                    <tr>
                        <td>Priority:</td>
                        <td>{task.priority}</td>
                    </tr>
                </tbody>
            </table>
        )
    }

    const addToHistory = (clickedID) => {
        let selectedTask = userData.trainers.filter(entry => entry.id === currentTrainerID)[0].tasks.filter(task => task.id === clickedID)[0]
        console.log(selectedTask)
        let mostRecentWeek = userData.trainers.filter(entry => entry.id === currentTrainerID)[0].history[0]
        const now = new Date();
        const currentDayOfWeekIndex = now.getDay();
        const daysOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
        const currentDayName = daysOfWeek[currentDayOfWeekIndex];
        mostRecentWeek[currentDayName].push(selectedTask)
        console.log(mostRecentWeek)

        const payload = {
            currentTrainerID,
            mostRecentWeek,
            userUID: userObj.uid
        }
        dispatch({type: 'ADD_TASK_TO_HISTORY', payload: payload})
    }

    return (
        <div className="task-list">
            {
                currentTrainerID !== null ?
                    userData.trainers.filter(entry => entry.id === currentTrainerID)[0].tasks.map((task) => (
                        <div className="task-display-entry" onDoubleClick={() => addToHistory(task.id)} >
                            {taskDisplay(task)}
                        </div>
                    ))
                    : null
            }
        </div>
    )
}