import { uidGenerator50Max } from "./generators"

export default function weekChecker(userData) {
    console.log('TRACE: weekChecker()')

    function addWeek(trainer, trainerIndexToUpdate) {
        console.log(`Trace: addWeeks`)
        let daysSinceLastSatEntry = 0
        let weeksSinceLastSat = 0
        let newDate
        let newWeekNum
        const mostRecentWeek = new Date(trainer.history[0].startDate)


        function isDateMoreThanAWeekOld(dateToCheck) {
            console.log(`Trace: isDateMoreThanAWeekOld`)
            
            const oneWeekAgo = new Date();
            oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
            daysSinceLastSatEntry = (oneWeekAgo - dateToCheck) / 1000 / 60 / 60 / 24 + 7
            weeksSinceLastSat = Math.abs(((daysSinceLastSatEntry % 7) - daysSinceLastSatEntry) / 7)
            return dateToCheck < oneWeekAgo;
        }

        function newWeek() {
            console.log(`Trace: newWeek`)

            function addWeekToDate(date) {
                console.log(`addWeekToDate`)
                date.setDate(date.getDate() + 7);
                return date;
            }

            let emptyWeek = trainer.history[trainer.history.length - 1]
            let newWeekEntry = {
                ...emptyWeek
            }
            if (newDate === undefined) {
                newDate = addWeekToDate(new Date(trainer.history[0].startDate))
                newWeekNum = +trainer.history[0].weekNumber + 1
            } else {
                newDate = addWeekToDate(newDate);
                ++newWeekNum
            }
            newWeekEntry.startDate = newDate.toDateString()
            newWeekEntry.weekNumber = newWeekNum
            newWeekEntry.id = uidGenerator50Max(15)
            return newWeekEntry
        }


        if (isDateMoreThanAWeekOld(mostRecentWeek)) {
            for (let i = 0; i < weeksSinceLastSat; i++) {
                debugger
                userData.trainers[trainerIndexToUpdate].history.unshift(newWeek())
            }
        }
    }

    function trainerWeekLoop() {
        console.log(`Trace: trainerWeekLoop`)
        userData.trainers.forEach((trainer, index) => {
            index === 0 && addWeek(trainer, 0)
        })
    }
    trainerWeekLoop()

    return userData
}
