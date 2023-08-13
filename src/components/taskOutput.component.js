import { useContext } from "react"
import { MainContext } from "../context/MainContext"

export const DaysTaskOutput = () => {
    const { state: { daysTaskOutput } } = useContext(MainContext)

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


    return (
        <div className="days-task-output-container">
            {
                daysTaskOutput.length > 0 ?
                    daysTaskOutput.map((task) => (
                        <div className="task-display-entry">
                            {taskDisplay(task)}
                        </div>
                    ))
                    : null
            }
        </div>
    )
}