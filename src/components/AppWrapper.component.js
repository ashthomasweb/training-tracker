import { useContext, useEffect } from "react"
import SignInUpModal from '../components/sign-in-up-modal/sign-in-up-modal.component'
import { onAuthStateChanged, getAuth } from 'firebase/auth'
import { History } from '../components/history.component'
import { userInitializationHandler } from '../firebase'
import { MainContext } from '../context/MainContext'
import { TrainerSelect } from "./trainerSelect.component"
import { Header } from "./header.component"
import { DaysTaskOutput } from "./taskOutput.component"

export const AppWrapper = () => {
    const { state: { userObj }, dispatch } = useContext(MainContext)

    const userAuth = getAuth()

    useEffect(() => {
        console.log(`Trace: useEffect/AuthHandler`)
        const unSubAuth = onAuthStateChanged(userAuth, async (userAuth) => {
            if (userAuth) {
                await userInitializationHandler(userAuth, dispatch, unSubAuth)
                // await gatherUserListsFromDB(userAuth, dispatch, true)

                dispatch({
                    type: 'SET_CURRENT_USER_TO_STATE',
                    payload: { userObj: userAuth },
                })
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
            {userObj === null ? (
                <SignInUpModal />
            ) : (
                <div className="app-container">
                    <TrainerSelect />
                    <Header />
                    <History />
                    <DaysTaskOutput />
                </div>
            )}</>
    )
}