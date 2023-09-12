import { useContext, useEffect, useState } from "react"
import { Week } from "./week.component"
import { MainContext } from "../context/MainContext"

export const History = () => {

    const { state: { userData, currentTrainerID, addToSelected }, dispatch } = useContext(MainContext)

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

    const clearAddToSelected = () => {
        const newAddToSelected = {
            weekIndex: null,
            day: null
        }
        dispatch({
            type: 'SET_ADD_TO_SELECTED_CONDITIONS', payload: { addToSelected: newAddToSelected }
        })
    }


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
            {
                addToSelected.weekIndex !== null
                    ?
                    <div className="update-history-container">
                        <span>Update History Active</span>
                        <button
                            className="add-to-selected"
                            onClick={clearAddToSelected}
                        >
                            Clear Update Mode
                        </button>
                    </div>
                    : null
            }
        </div>
    )
}