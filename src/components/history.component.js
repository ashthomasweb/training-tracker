import { useContext, useEffect, useState } from "react"
import { Week } from "./week.component"
import { MainContext } from "../context/MainContext"

export const History = () => {

    const { state: { userData, currentTrainerID, userObj }, dispatch } = useContext(MainContext)

    const [populatedWeekIndexArray, setPopulatedWeekIndexArray] = useState([])

    useEffect(() => {
        if (currentTrainerID) {
            let populatedWeeks = currentTrainerID
                ? userData.trainers.filter(entry => entry.id === currentTrainerID)[0].history.length - 1
                : 52

            let array = []
            for (let i = 0; i < 52; i++) {
                if (i < populatedWeeks) {
                    array.push(i)
                } else {
                    array.push(populatedWeeks)
                }
            }
            setPopulatedWeekIndexArray(array.reverse())
        }
    }, [currentTrainerID, userData, userObj])

    useEffect(() => {
        console.log(`Trace: useEffect() addWeeks`)
        let daysSinceLastSatEntry = 0
        let weeksSinceLastSat = 0
        let newDate


        function addToHistory(week) {
            console.log(`Trace: addToHistory`)

            let payload = {
                successiveEmptyWeek: week,
                currentTrainerID
            }
            dispatch({ type: 'ADD_EMPTY_WEEK', payload })
        }

        const newWeek = () => {
            console.log(`Trace: newWeek`)

            function addWeekToDate(date) {
                console.log(`addWeekToDate`)

                date.setDate(date.getDate() + 7);
                return date;
            }

            let emptyWeek = userData.trainers.filter(entry => entry.id === currentTrainerID)[0].history[userData.trainers.filter(entry => entry.id === currentTrainerID)[0].history.length - 1]
            let newWeekEntry = {
                ...emptyWeek
            }
            if (newDate === undefined) {
                newDate = addWeekToDate(new Date(userData.trainers.filter(entry => entry.id === currentTrainerID)[0].history[0].startDate))
            } else (
                newDate = addWeekToDate(newDate)
            )
            newWeekEntry.startDate = newDate.toDateString()
            newWeekEntry.weekNumber = userData.trainers.filter(entry => entry.id === currentTrainerID)[0].history[0].weekNumber + 1
            return newWeekEntry
        }

        function isDateMoreThanAWeekOld(dateToCheck) {
            console.log(`Trace: isDateMoreThanAWeekOld`)

            const oneWeekAgo = new Date();
            oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
            daysSinceLastSatEntry = (oneWeekAgo - dateToCheck) / 1000 / 60 / 60 / 24 + 7
            weeksSinceLastSat = ((daysSinceLastSatEntry % 7) - daysSinceLastSatEntry) / 7
            return dateToCheck < oneWeekAgo;
        }

        if (userData !== null && currentTrainerID !== null) {
            console.log('first condition')
            const mostRecentWeek = new Date(userData.trainers.filter(entry => entry.id === currentTrainerID)[0].history[0].startDate)

            if (isDateMoreThanAWeekOld(mostRecentWeek)) {
                console.log('second cond')

                for (let i = 0; i < Math.abs(weeksSinceLastSat); i++) {
                    addToHistory(newWeek())
                }
            }
        }

    }, [currentTrainerID, dispatch, userData])

    function returnWeeks() {
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
            {/* <button onClick={addWeek}>Add Week</button> */}
        </div>
    )
}