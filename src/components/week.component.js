import { useContext } from "react"
import { MainContext } from "../context/MainContext"

export const Week = (props) => {

    const { state: { userData }, dispatch } = useContext(MainContext)

    let currentTrainerHistory = userData.trainers[0].history[props.weekIndex]

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

    const getDailyInfo = (e) => {
        dispatch({ type: 'SET_DAYS_TASK_OUTPUT', payload: currentTrainerHistory[e.target.dataset.day] })
    }

    const dayArray = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']

    function Day(index) {
        return (
            <div
                key={index} 
                onClick={getDailyInfo}
                data-day={dayArray[index]}
                style={{
                    backgroundColor: `${currentTrainerHistory[dayArray[index]].length > 0
                        ? colorHandler(currentTrainerHistory[dayArray[index]])
                        : 'white'
                        }`,
                }}
            />
        )
    }

    function showMonth() {
        let date = new Date(currentTrainerHistory.startDate)
        let day = date.getDate()
        if (day <= 7) {
            return (
                <div style={{ position: 'absolute', top: -26 }} className="month-indication">
                    {currentTrainerHistory.startDate.substr(4, 3)}
                </div>
            )
        }
    }

    return (

            <div className="week-container" data-startdate={currentTrainerHistory.startDate}>
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