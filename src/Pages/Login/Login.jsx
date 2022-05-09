import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import './Login.scss'
import { useDispatch,useSelector } from 'react-redux'
import { loginUser } from '../../slices/userSlice'
import { Navigate } from 'react-router-dom'

const Login = () => {
  const dispatch = useDispatch();
  const {currentUser,error} = useSelector(state => state.user)

  const [data, setData] = useState({
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
    dispatch(loginUser(data))
  }
  return (
    <div className='signup-page'>
    <div className='form-wrapper'>
      <h3 className='title'>Login Form</h3>
      {error && <p>{error}</p>}
      {currentUser && (
          <Navigate to="/profile" replace={true} />
        )}
      <form className='form' onSubmit={onSubmitHandler}>
        <div className='form__group'>
         <label htmlFor='email' className='form__label'>Email</label>
         <input required onChange={(e)=>onChangeHandler(e)} id='email' name='email' value={data.email} className='form__input' type="email" placeholder='Enter your email' />
        </div>
        <div className='form__group'>
         <label htmlFor='password' className='form__label'>Password</label>
         <input required onChange={(e)=>onChangeHandler(e)} id='password' name='password' value={data.password} className='form__input' type="password" placeholder='Enter your password' />
        </div>
        <div className='form__group'>
        <button onClick={onSubmitHandler} className='btn' type='submit'>Login</button>
        </div>
        
      </form>
      <div  className='form__group'>
         Not yet registered? <Link className='link' to='/signup'>Register</Link>
        </div>
    </div>
  </div>
  )
}

export default Login