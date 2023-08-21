export default function weekChecker(dispatch, userData) {
    console.log('TRACE: weekChecker()')
    
    console.log(dispatch)
    console.log(userData)

    debugger
    return userData

    // addWeek() {
    //     console.log(`Trace: useEffect() addWeeks`)
    //     let daysSinceLastSatEntry = 0
    //     let weeksSinceLastSat = 0
    //     let newDate

    //     function isDateMoreThanAWeekOld(dateToCheck) {
    //         console.log(`Trace: isDateMoreThanAWeekOld`)

    //         const oneWeekAgo = new Date();
    //         oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    //         daysSinceLastSatEntry = (oneWeekAgo - dateToCheck) / 1000 / 60 / 60 / 24 + 7
    //         weeksSinceLastSat = ((daysSinceLastSatEntry % 7) - daysSinceLastSatEntry) / 7
    //         return dateToCheck < oneWeekAgo;
    //     }

    //     function addToHistory(week) {
    //         console.log(`Trace: addToHistory`)

    //         let payload = {
    //             successiveEmptyWeek: week,
    //             currentTrainerID,
    //             userUID: userObj.uid
    //         }
    //         this.props.dispatch({ type: 'ADD_EMPTY_WEEK', payload })
    //     }

    //     function newWeek () {
    //         console.log(`Trace: newWeek`)

    //         function addWeekToDate(date) {
    //             console.log(`addWeekToDate`)

    //             date.setDate(date.getDate() + 7);
    //             return date;
    //         }

    //         let emptyWeek = userData.trainers.filter(entry => entry.id === currentTrainerID)[0].history[userData.trainers.filter(entry => entry.id === currentTrainerID)[0].history.length - 1]
    //         let newWeekEntry = {
    //             ...emptyWeek
    //         }
    //         if (newDate === undefined) {
    //             newDate = addWeekToDate(new Date(userData.trainers.filter(entry => entry.id === currentTrainerID)[0].history[0].startDate))
    //         } else (
    //             newDate = addWeekToDate(newDate)
    //         )
    //         newWeekEntry.startDate = newDate.toDateString()
    //         newWeekEntry.weekNumber = userData.trainers.filter(entry => entry.id === currentTrainerID)[0].history[0].weekNumber + 1
    //         return newWeekEntry
    //     }

    //     if (userData !== null && currentTrainerID !== null) {
    //         console.log('first condition')
    //         const mostRecentWeek = new Date(userData.trainers.filter(entry => entry.id === currentTrainerID)[0].history[0].startDate)

    //         if (isDateMoreThanAWeekOld(mostRecentWeek)) {
    //             console.log('second cond')

    //             for (let i = 0; i < Math.abs(weeksSinceLastSat); i++) {
    //                 addToHistory(newWeek())
    //             }

    //         }
    //     }
    // }

}

