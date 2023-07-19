import { useContext } from "react"
import { MainContext } from "../context/MainContext"

export const Week = (props) => {

    const { state: { userData } } = useContext(MainContext)

    let currentTrainerHistory = userData.trainers[0].history[props.weekIndex]

    let lightGreen = '#9be9a8'
    let mediumGreen = '#40c463'
    let standardGreen = '#30a14e'
    let darkGreen = '#30a14e'
    let gold = '#ffd700'

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

    return (
        <div className="week-container">
            <div readOnly style={{backgroundColor: `${currentTrainerHistory.sunday.length > 0 
                ? colorHandler(currentTrainerHistory.sunday) 
                : 'white'
                } `}} />
            <div readOnly style={{backgroundColor: `${currentTrainerHistory.monday.length > 0 
                ? colorHandler(currentTrainerHistory.monday)  
                : 'white'
                } `}} />
            <div readOnly style={{backgroundColor: `${currentTrainerHistory.tuesday.length > 0 
                ? colorHandler(currentTrainerHistory.tuesday)     
                : 'white'
                } `}} />
            <div readOnly style={{backgroundColor: `${currentTrainerHistory.wednesday.length > 0 
                ? colorHandler(currentTrainerHistory.wednesday)   
                : 'white'
                } `}} />
            <div readOnly style={{backgroundColor: `${currentTrainerHistory.thursday.length > 0 
                ? colorHandler(currentTrainerHistory.thursday)    
                : 'white'
                } `}} />
            <div readOnly style={{backgroundColor: `${currentTrainerHistory.friday.length > 0 
                ? colorHandler(currentTrainerHistory.friday) 
                : 'white'
                } `}} />
            <div readOnly style={{backgroundColor: `${currentTrainerHistory.saturday.length > 0 
                ? colorHandler(currentTrainerHistory.saturday)    
                : 'white'
                } `}} />
        </div>
    )
}