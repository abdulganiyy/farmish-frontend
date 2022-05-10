import React,{useState} from 'react'
import { Link } from 'react-router-dom';
import './SignUp.scss';
import { useDispatch,useSelector } from 'react-redux'
import { signupUser } from '../../slices/userSlice'
import { Navigate } from 'react-router-dom'


const SignUp = () => {
  const dispatch = useDispatch();
  const {currentUser,error} = useSelector(state => state.user)

  const [data, setData] = useState({
    username:'',
    email:'',
    password:''
  })

  const onChangeHandler = (e) => {
    setData({
      ...data,
      [e.target.name]:e.target.value
    })
  }

  const onSubmitHandler = (e) => {
    e.preventDefault()
    dispatch(signupUser(data))
  }
  return (
    <div className='signup-page'>
      <div className='form-wrapper'>
        <h3 className='title'>Sign Up Form</h3>
        {error && <p>{error}</p>}
      {currentUser && (
          <Navigate to="/profile" replace={true} />
        )}
        <form className='form' onSubmit={onSubmitHandler}>
          <div className='form__group'>
           <label htmlFor='username' className='form__label'>Username</label>
           <input onChange={(e)=>onChangeHandler(e)} value={data.username} id='username' className='form__input' type="text" placeholder='Enter your username' />
          </div>
          <div className='form__group'>
           <label htmlFor='email' className='form__label'>Email</label>
           <input onChange={(e)=>onChangeHandler(e)} value={data.email} id='email' type="email" placeholder='Enter your email' className='form__input'/>
          </div>
          <div className='form__group'>
           <label htmlFor='password' className='form__label'>Password</label>
           <input onChange={(e)=>onChangeHandler(e)} value={data.password} id='password' className='form__input' type="password" placeholder='Enter your password' />
          </div>
          <div className='form__group'>
          <button className='btn' type='submit'>Sign Up</button>
          </div>
          
        </form>
        <div  className='form__group'>
           Signed Up? <Link className='link' to='/login'>Login</Link>
          </div>
      </div>
    </div>
  )
}

export default SignUp