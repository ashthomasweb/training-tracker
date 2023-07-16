import { useContext } from "react"
import { MainContext } from "../context/MainContext"

export const Week = () => {

    const { state: { userData }, dispatch } = useContext(MainContext)



    return (

        <div className="week-container">
            <input checked={userData.trainers[0].history[1].sunday.length > 0 ? true : false } type="checkbox"/>
            <input checked={userData.trainers[0].history[1].monday.length > 0 ? true : false } type="checkbox"/>
            <input checked={userData.trainers[0].history[1].tuesday.length > 0 ? true : false } type="checkbox"/>
            <input checked={userData.trainers[0].history[1].wednesday.length > 0 ? true : false } type="checkbox"/>
            <input checked={userData.trainers[0].history[1].thursday.length > 0 ? true : false } type="checkbox"/>
            <input checked={userData.trainers[0].history[1].friday.length > 0 ? true : false } type="checkbox"/>
            <input checked={userData.trainers[0].history[1].saturday.length > 0 ? true : false } type="checkbox"/>
        </div>
    )
}