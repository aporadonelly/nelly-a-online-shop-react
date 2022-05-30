import SignUpForm from '../../components/sign-up-form/sign-up-form.component'
import SignInForm from '../../components/sign-in-form/sign-in-form.component'

import './authentication.scss'

const SignIn = () => {
  return (
    <div className="authentication-container">
      <SignInForm />
      <SignUpForm />
      <h1></h1>
    </div>
  )
}
export default SignIn
