import { useContext } from "react"
import { MainContext } from "../context/MainContext"

export const TaskList = () => {
    const { state: { currentTrainerID, userData, userObj, addToSelected }, dispatch } = useContext(MainContext)

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

    const addTaskToToday = (selectedTask) => {
        const emptyWeek = userData.trainers.filter(entry => entry.id === currentTrainerID)[0].history[0] // ATTN: Will need trainerIndex to be set

        function deepClone(obj) {
            if (obj === null || typeof obj !== 'object') {
                return obj;
            }

            if (Array.isArray(obj)) {
                const newArray = [];
                for (let i = 0; i < obj.length; i++) {
                    newArray[i] = deepClone(obj[i]);
                }
                return newArray;
            }

            const newObj = {};
            for (const key in obj) {
                if (obj.hasOwnProperty(key)) {
                    newObj[key] = deepClone(obj[key]);
                }
            }

            return newObj;
        }

        let mostRecentWeek = deepClone(emptyWeek);

        const now = new Date();
        const currentDayOfWeekIndex = now.getDay();
        const daysOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
        const currentDayName = daysOfWeek[currentDayOfWeekIndex];
        mostRecentWeek[currentDayName].push(selectedTask)

        const payload = {
            currentTrainerID,
            mostRecentWeek,
            userUID: userObj.uid
        }

        return payload
    }

    const addTaskToSelected = (selectedTask, addToSelected) => {
        const history = userData.trainers.filter(entry => entry.id === currentTrainerID)[0].history
        const selectedWeek = history[addToSelected.weekIndex] // ATTN: Will need trainerIndex to be set
        selectedWeek[addToSelected.day].push(selectedTask)

        debugger

        const payload = {
            currentTrainerID,
            history,
            userUID: userObj.uid
        }

        return payload
    }

    const addToHistory = (clickedID) => {
        let selectedTask = userData.trainers.filter(entry => entry.id === currentTrainerID)[0].tasks.filter(task => task.id === clickedID)[0]

        let payload

        if (addToSelected.weekIndex !== null) { // NEEDS ADDITIONAL CONDITION TO ALLOW FOR MULTIPLE TASKS TO BE IMPLEMENTED, OR TURN OFF AFTER ONE
            payload = addTaskToSelected(selectedTask, addToSelected)
            dispatch({ type: 'ADD_TASK_TO_BACK_HISTORY', payload })
        } else {
            payload = addTaskToToday(selectedTask)
            dispatch({ type: 'ADD_TASK_TO_HISTORY', payload: payload })
        }
    }

    return (
        <div className="task-list">
            {
                currentTrainerID !== null ?
                    userData.trainers.filter(entry => entry.id === currentTrainerID)[0].tasks.map((task, index) => (
                        <div key={index} className="task-display-entry" onDoubleClick={() => addToHistory(task.id)} >
                            {taskDisplay(task)}
                        </div>
                    ))
                    : null
            }
        </div>
    )
}