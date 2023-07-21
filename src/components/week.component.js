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

    const colorHandler = (dailyInput) => {
        let dailyTotal = 0
        dailyInput.forEach(element => {
            dailyTotal = dailyTotal + element.pointValue
        });

        if (dailyTotal > 0 & dailyTotal <= 10) {
            return lightGreen
        }
        if (dailyTotal > 10 & dailyTotal <= 20) {
            return mediumGreen
        }
        if (dailyTotal > 20 & dailyTotal <= 30) {
            return standardGreen
        }
        if (dailyTotal > 30 & dailyTotal <= 40) {
            return darkGreen
        }
        if (dailyTotal > 40) {
            return gold
        }

    }

    const getDailyInfo = (e) => {
        dispatch({type: 'SET_DAYS_TASK_OUTPUT', payload: currentTrainerHistory[e.target.dataset.day] })
    }

    const dayArray = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
    function Day(index) {
        return (
            <div
                onClick={getDailyInfo}
                data-day={dayArray[index]}
                style={{
                    backgroundColor: `${currentTrainerHistory[dayArray[index]].length > 0
                            ? colorHandler(currentTrainerHistory[dayArray[index]])
                            : 'white'
                        }`
                }}
            />
        )
    }

    return (
        <div className="week-container">
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