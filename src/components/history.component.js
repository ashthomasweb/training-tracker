import { useContext } from "react"
import { Week } from "./week.component"
import { MainContext } from "../context/MainContext"



export const History = () => {

    const { state: { userData }, dispatch } = useContext(MainContext)


    return (
        <div className="history-container">
            {userData ?
                <>
                    <Week />
                    <Week />
                    <Week />
                    <Week />
                    <Week />
                    <Week />
                    <Week />
                    <Week />
                    <Week />
                    <Week />
                    <Week />
                    <Week />
                    <Week />
                    <Week />
                    <Week />
                    <Week />
                    <Week />
                    <Week />
                    <Week />
                </>
                : null
            }
        </div>
    )
}