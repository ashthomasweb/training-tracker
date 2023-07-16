/******************************************************************************
* FILENAME:
*   sign-in-up-modal.component.tsx

* DESCRIPTION:
*   This is an area to place a general description of the file. Please limit
*   line length to less than 80. The header delimiter is 80 characters long.
*   Place an asterisk in column 1 to continue blocked comments.

* NOTES:
*   - 

* (c) Copyright Kloudlog LLC
* Usage Rights: Not for public use or redistribution.

******************************************************************************/

// import { 
//   /* Assets */
//   /* Database */
//   /* Helper Functions */
//   /* Components */
//   SignInUp,
//   /* Icons */
// } from '../../../../export-hub'

import './sign-in-up-modal.styles.scss'
import SignInUp from '../sign-in-up/sign-in-up.component'

const SignInUpModal = () => {

  const modalToggle = () => {
    // Needs display reducer call
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    let el = document.querySelector('.sign-modal').style
    el.display === 'block' ? (el.display = 'none') : (el.display = 'block')
  }

  return (
    <div className='sign-in-and-sign-up'>
      <button
        style={{ position: 'absolute', top: '10px', right: '10px' }}
        type='button'
        onClick={modalToggle}>
        Close
      </button>
      <SignInUp />
    </div>
  )
}

export default SignInUpModal

/* END of document ***********************************************************/
