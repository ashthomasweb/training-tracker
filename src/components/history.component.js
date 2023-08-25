import { useContext, useEffect, useState } from "react"
import { Week } from "./week.component"
import { MainContext } from "../context/MainContext"

export const History = () => {

    const { state: { userData, currentTrainerID } } = useContext(MainContext)

    const [populatedWeekIndexArray, setPopulatedWeekIndexArray] = useState([])

    useEffect(() => {
        // console.log('Trace: weekPopulator()')

        if (currentTrainerID) {
            let populatedWeeks = currentTrainerID
                ? userData.trainers.filter(entry => entry.id === currentTrainerID)[0].history.length - 1
                : 52

            let array = []
            for (let i = 0; i < 52; i++) {
                if (i <= populatedWeeks) {
                    array.push(i)
                } else {
                    array.push(populatedWeeks)
                }
            }
            setPopulatedWeekIndexArray(array.reverse())
        }

    }, [currentTrainerID, userData.trainers])


    function returnWeeks() {
        // console.log('Trace: returnWeeks()')
        return (
            populatedWeekIndexArray.map((entry, index) => (
                <Week key={index} weekIndex={entry} />
            ))
        )
    }

    return (
        <div className="history-container">
            {currentTrainerID ?
                returnWeeks()
                : null
            }
        </div>
    )
}