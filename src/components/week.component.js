import { useContext } from "react"
import { MainContext } from "../context/MainContext"

export const Week = (props) => {

    const { state: { userData, addToSelected }, dispatch } = useContext(MainContext)

    let thisWeeksHistory = userData.trainers[0].history[props.weekIndex]

    let lightGreen = '#8accff'
    let mediumGreen = '#2fb5ff'
    let standardGreen = '#3292ff'
    let darkGreen = '#227dff'
    let gold = '#ffd600'
    let purple = '#b22cff'
    let perfect = '#000000'

    const colorHandler = (dailyInput) => {
        let dailyTotal = 0
        dailyInput.forEach(element => {
            element !== null && (dailyTotal = Number(dailyTotal) + Number(element.pointValue))
        });

        if (dailyTotal > 0 & dailyTotal <= 12) {
            return lightGreen
        }
        if (dailyTotal > 12 & dailyTotal <= 24) {
            return mediumGreen
        }
        if (dailyTotal > 24 & dailyTotal <= 36) {
            return standardGreen
        }
        if (dailyTotal > 36 & dailyTotal <= 49) {
            return darkGreen
        }
        if (dailyTotal > 49 & dailyTotal <= 75) {
            return gold
        }
        if (dailyTotal > 75 & dailyTotal <= 99) {
            return purple
        }
        if (dailyTotal >  99) {
            return perfect
        }

    }

    const addToSelectedDay = (e) => {
        e.preventDefault()
        console.log(thisWeeksHistory[e.target.dataset.day])
        const addToSelected = {
            weekIndex: props.weekIndex,
            day: e.target.dataset.day
        }
        console.log(addToSelected)
        dispatch({ type: 'SET_ADD_TO_SELECTED_CONDITIONS', payload: { addToSelected }})
    }

    const getDailyInfo = (e) => {
        dispatch({ type: 'SET_DAYS_TASK_OUTPUT', payload: thisWeeksHistory[e.target.dataset.day] })
    }

    const dayArray = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']

    function Day(index) {
        return (
            <div
                key={index} 
                onClick={getDailyInfo}
                onContextMenu={addToSelectedDay}
                data-day={dayArray[index]}
                style={{
                    backgroundColor: `${thisWeeksHistory[dayArray[index]].length > 0
                        ? colorHandler(thisWeeksHistory[dayArray[index]])
                        : 'white'
                        }`,
                    boxShadow: `${props.weekIndex === addToSelected.weekIndex && dayArray[index] === addToSelected.day ? '0 0 7px red' : 'none'}`
                }}
            />
        )
    }

    function showMonth() {
        let date = new Date(thisWeeksHistory.startDate)
        let day = date.getDate()
        if (day <= 7) {
            return (
                <div style={{ position: 'absolute', top: -26 }} className="month-indication">
                    {thisWeeksHistory.startDate.substr(4, 3)}
                </div>
            )
        }
    }

    return (

            <div className="week-container" data-startdate={thisWeeksHistory.startDate}>
            {showMonth()}
                {
                    props ?
                        dayArray.map((day, index) => (
                            Day(index)
                        ))
                        : null
                }
            </div>
    )
}