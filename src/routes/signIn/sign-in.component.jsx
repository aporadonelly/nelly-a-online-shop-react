import {
  signInWithGooglePopUp,
  createUserDocFromAuth,
} from '../../utils/firebase/firebase.utils'

import SignUpForm from '../../components/sign-up-form/sign-up-form.component'

const SignIn = () => {
  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopUp()
    const userDocRef = await createUserDocFromAuth(user)
    console.log(userDocRef)
  }

  return (
    <div>
      <h1>Sign In Page</h1>
      <button onClick={logGoogleUser}>Sign In with Google Popup</button>
      <SignUpForm />
      <h1></h1>
    </div>
  )
}
export default SignIn
