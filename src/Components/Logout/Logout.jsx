import {useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { userActions } from '../../slices/userSlice'
import { useNavigate } from 'react-router-dom'

const Logout = () => {
    let navigate = useNavigate();
    const dispatch = useDispatch()

    useEffect(() => {
     
      dispatch(userActions.logout())
      navigate('/signup',{ replace: true })
      
    }, [dispatch,navigate])
    
  return null
}

export default Logout