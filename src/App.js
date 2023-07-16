import { useReducer } from 'react';
import './App.css';
import './scss/main.scss'
import { MainContext, MainReducer, initialMainState } from './context/MainContext';
import { AppWrapper } from './components/AppWrapper.component';

export const App = () => {
  const [state, dispatch] = useReducer(MainReducer, initialMainState)

  const value = { state, dispatch }

  return (
    <MainContext.Provider value={value}>
      <AppWrapper />
    </MainContext.Provider>
  )
}

