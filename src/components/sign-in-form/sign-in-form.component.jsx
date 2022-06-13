import { useState } from 'react'
import {
  createUserDocFromAuth,
  signInWithGooglePopUp,
  signInAuthWithEmailAndPassword,
} from '../../utils/firebase/firebase.utils'

import Button from '../button/button.component'
import FormInput from '../form-input/form-input.component'

import './sign-in-form.component.scss'

const defaultFormValues = {
  email: '',
  password: '',
}

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormValues)
  const { email, password } = formFields

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormFields({ ...formFields, [name]: value })
  }

  const resetFormFields = () => {
    setFormFields(defaultFormValues)
  }

  const signInWithGoogle = async () => {
    await signInWithGooglePopUp()
  }

  //to submit form in signin page
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { user } = await signInAuthWithEmailAndPassword(email, password)

      resetFormFields()
    } catch (err) {
      switch (err.code) {
        case 'auth/invalid-email':
          alert('Invalid Email provided.')
          break
        case 'auth/wrong-password':
          alert('Wrong Password.')
          break
        case 'auth/user-not-found':
          alert('No user associated with this email. ')
          break
        default:
          console.log(err, 'err')
          break
      }
    }
  }

  return (
    <div className="sign-in-container">
      <h2>Sign in with your email and password</h2>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />
        <FormInput
          label="Password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />
        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button type="button" buttonType="google" onClick={signInWithGoogle}>
            Google Sign In
          </Button>
        </div>
      </form>
    </div>
  )
}

export default SignInForm
