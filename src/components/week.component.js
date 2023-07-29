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
            element !== null && (dailyTotal = Number(dailyTotal) + Number(element.pointValue))
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
        dispatch({ type: 'SET_DAYS_TASK_OUTPUT', payload: currentTrainerHistory[e.target.dataset.day] })
    }

    const dayArray = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
    function Day(index) {
        // console.log('Trace: Day()')
        // let date = new Date(currentTrainerHistory.startDate)
        // let day = date.getDate()
        // console.log(day)
        return (
            <div
                onClick={getDailyInfo}
                data-day={dayArray[index]}
                style={{
                    backgroundColor: `${currentTrainerHistory[dayArray[index]].length > 0
                        ? colorHandler(currentTrainerHistory[dayArray[index]])
                        : 'white'
                        }`,
                    // outline: `${day === 1 ? '1px solid black!important' : 'none'}`
                }}
            />
        )
    }

    function showMonth() {
        let daysSinceLastSatEntry = 0
        let weeksSinceLastSat = 0
        let newDate

        function isDateMoreThanAWeekOld(dateToCheck) {
            console.log(`Trace: isDateMoreThanAWeekOld`)

            const oneWeekAgo = new Date();
            oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
            daysSinceLastSatEntry = (oneWeekAgo - dateToCheck) / 1000 / 60 / 60 / 24 + 7
            weeksSinceLastSat = ((daysSinceLastSatEntry % 7) - daysSinceLastSatEntry) / 7
            return dateToCheck < oneWeekAgo;
        }


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

    // showMonth()

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