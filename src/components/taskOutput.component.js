import { useContext } from "react"
import { MainContext } from "../context/MainContext"

export const DaysTaskOutput = () => {
    const { state: { daysTaskOutput }} = useContext(MainContext)

    return (
        <div className="days-task-output-container">
           {
               daysTaskOutput.length > 0 ?
               daysTaskOutput.map((task, index) => (
                <>
                <p>{JSON.stringify(task, null, 5)}</p>
                <br/>

                </>
               ))
               : null
           } 
        </div>
    )
}