import React from 'react'
import { Link } from 'react-router-dom';
import './SignUp.scss';

const SignUp = () => {
  return (
    <div className='signup-page'>
      <div className='form-wrapper'>
        <h3 className='title'>Sign Up Form</h3>
        <form className='form'>
          <div className='form__group'>
           <label htmlFor='username' className='form__label'>Username</label>
           <input id='username' className='form__input' type="text" placeholder='Enter your username' />
          </div>
          <div className='form__group'>
           <label htmlFor='email' className='form__label'>Email</label>
           <input id='email' type="email" placeholder='Enter your email' className='form__input'/>
          </div>
          <div className='form__group'>
           <label htmlFor='password' className='form__label'>Password</label>
           <input id='password' className='form__input' type="password" placeholder='Enter your password' />
          </div>
          <div className='form__group'>
          <button className='btn'>Sign Up</button>
          </div>
          <div  className='form__group'>
           Signed Up? <Link className='link' to='/login'>Login</Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignUp