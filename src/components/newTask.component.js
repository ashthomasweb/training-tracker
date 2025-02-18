import { useContext, useRef } from "react"
import { MainContext } from "../context/MainContext"
import { uidGenerator50Max } from "../utilities/generators"

export const NewTask = (props) => {

    const { state: { currentTrainerID, userObj }, dispatch } = useContext(MainContext)
    const titleRef = useRef(null)
    const descriptionRef = useRef(null)
    const pointsRef = useRef(null)
    const priorityRef = useRef(null)


    const addTask = () => {
        
        let newTask = {
            id: uidGenerator50Max(15),
            title: titleRef.current.value,
            description: descriptionRef.current.value,
            pointValue: pointsRef.current.value,
            priority: priorityRef.current.value
        }

        let payload = {
            task: newTask,
            trainerID: currentTrainerID,
            userUID: userObj.uid
        }

        dispatch({type: 'ADD_NEW_TASK', payload: payload })
    }

    return (
        <div>
            <button onClick={addTask}>Add New Task</button>
            <table>
                <tbody>
                <tr>
                    <td>Task Title:</td>
                    <td><input ref={titleRef} type='text' placeholder='Name your activity'></input></td>
                </tr>
                <tr>
                    <td>Description:</td>
                    <td><input ref={descriptionRef} type='text' placeholder='Describe your activity'></input></td>
                </tr>
                <tr>
                    <td>Completion Points:</td>
                    <td><input ref={pointsRef} type='text' placeholder='How valuable is this task?'></input></td>
                </tr>
                <tr>
                    <td>Priority:</td>
                    <td><input ref={priorityRef} type='text' placeholder='Set task priority (Low, Med, High)'></input></td>
                </tr>
                </tbody>
            </table>
        </div>
    )
}
