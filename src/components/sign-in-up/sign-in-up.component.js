/******************************************************************************
* FILENAME:
*   sign-in-up.component.tsx

* DESCRIPTION:
*   This is an area to place a general description of the file. Please limit
*   line length to less than 80. The header delimiter is 80 characters long.
*   Place an asterisk in column 1 to continue blocked comments.

* NOTES:
*   - 

* (c) Copyright Kloudlog LLC
* Usage Rights: Not for public use or redistribution.

******************************************************************************/


// import { useContext } from 'react'
// import { MainContext } from '../../context/main/MainState'
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'

// import { 
//   /* Assets */
//   /* Database */
//   authentication,
//   /* Helper Functions */
//   /* Components */
//   /* Icons */
// } from '../../../../export-hub'

import './sign-in-up.styles.scss'
import { authentication } from '../../firebase'

const SignInUp = () => {

  const firebaseSignIn = () => {
    const provider = new GoogleAuthProvider()
    signInWithPopup(authentication, provider)
      .then((result) => {
        console.log('signed in')
        // console.log(result)
      })
      .catch((err) => {
        // console.log(err)
      })
  }

  return (
    <div className='sign-in'>
      <h2 className='title'>Create an Account</h2>
      <span>
        By registering, you agree to our Terms of Service and Privacy Policy
      </span>
      <button
        type='button'
        onClick={firebaseSignIn}
        className='google-sign-in custom-button'>
        Sign Up With Google
      </button>
    </div>
  )
}

export default SignInUp

/* END of document ***********************************************************/
