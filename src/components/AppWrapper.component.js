import { useContext, useEffect } from "react"
import SignInUpModal from '../components/sign-in-up-modal/sign-in-up-modal.component'
import { onAuthStateChanged, getAuth } from 'firebase/auth'
import { History } from '../components/history.component'
import { userInitializationHandler } from '../firebase'
import { MainContext } from '../context/MainContext'
import { TrainerSelect } from "./trainerSelect.component"
import { Header } from "./header.component"
import { DaysTaskOutput } from "./taskOutput.component"
import { NewTask } from "./newTask.component"
import { TaskList } from "./taskList.component"
import { gatherUserDataFromDB } from "../firebase"
import { userData } from "../assets/initialDataConfig"

export const AppWrapper = () => {

    const { state: { userObj }, dispatch } = useContext(MainContext)

    const userAuth = getAuth()

    useEffect(() => {
        // console.log(`Trace: useEffect/AuthHandler`)
        const unSubAuth = onAuthStateChanged(userAuth, async (userAuth) => {
            if (userAuth) {
                await userInitializationHandler(userAuth, dispatch, unSubAuth)
                await gatherUserDataFromDB(userAuth, dispatch)
                
            } else if (userAuth === null) {
                dispatch({
                    type: 'SET_CURRENT_USER_TO_STATE',
                    payload: { userObj: userAuth },
                })
            }
        })
    }, [dispatch, userAuth])

    return (
        <>
            {userObj === null && userData !== null ? (
                <SignInUpModal />
            ) : (
                <div className="app-container">
                    <TrainerSelect />
                    <Header />
                    <History />
                    <DaysTaskOutput />
                    <NewTask />
                    <TaskList />
                </div>
            )}</>
    )
}