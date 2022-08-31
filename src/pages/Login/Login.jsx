import React from 'react'
import "./login.css"

export default function Login() {
  return (
    <div className='Login'>
      <div className='button-design'>
        <h1 className='Login-title'>Login Using:</h1>
      <div className='google-login-button'>Sign in with Google</div>
      <div className='facebook-login-button'>Sign in with Facebook</div>
      </div>
    </div>
  )
}
