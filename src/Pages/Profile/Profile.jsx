import React,{useState,useEffect} from 'react'
import './Profile.scss'
import { useSelector,useDispatch } from 'react-redux'
import {FaRegUserCircle} from 'react-icons/fa'
import Axios from 'axios'
import { updateUser } from '../../slices/userSlice'
const Profile = () => {
    const {currentUser} = useSelector(state => state.user)
    const dispatch = useDispatch()
    const [data, setData] = useState({
       
        username: currentUser && currentUser.username,
        email:currentUser && currentUser.email,
        avatar:currentUser && currentUser.avatar,
        phone:currentUser && currentUser.phone,
        id:currentUser && currentUser._id

    })

    const [orders, setOrders] = useState([])

    const onChangeHandler = (e) => {
        setData({
          ...data,
          [e.target.name]:e.target.value
        })
      }

      const onChangeFileHandler = (e) => {

        let file = e.target.files[0]

        let reader = new FileReader();

        reader.onload = function(e) {
    // The file's text will be printed here

    console.log(e.target.result)
            setData({
        ...data,
       avatar:e.target.result  })
         };

    reader.readAsDataURL(file)
     
}
    
      const onSubmitHandler = (e) => {
        e.preventDefault()
        
        const updatedData = {
            username:data.username,
            email:data.email,
            phone:data.phone,
            avatar:data.avatar,
            id:data.id
      }

      //console.log(updatedData)
      dispatch(updateUser(updatedData))

       
      }

      useEffect(() => {
        
      const fetchOrders = async () =>{
         const response = await Axios.get(`https://farmish-api.herokuapp.com/api/v1/order/${data.id}`)
         
         setOrders(response.data.orders)
      }

      fetchOrders()
       
      }, [data.id])


      useEffect(() => {
        setData({
             
        username:currentUser && currentUser.username,
        email:currentUser && currentUser.email,
        avatar:currentUser && currentUser.avatar,
        phone:currentUser && currentUser.phone,
        id:currentUser && currentUser._id
        })
      }, [currentUser])
      
      
  return (
    <div className='profile-page'>
        <div className='profile-wrapper'>
          <form className='form' onSubmit={onSubmitHandler}>
          <div className='form__group'>
         <label htmlFor='username' className='form__label'>Username</label>
         <input required onChange={(e)=>onChangeHandler(e)} id='username' name='username' value={data.username} className='form__input' type="text" placeholder='Enter your username' />
        </div>
          <div className='form__group'>
         <label htmlFor='email' className='form__label'>Email</label>
         <input required onChange={(e)=>onChangeHandler(e)} id='email' name='email' value={data.email} className='form__input' type="email" placeholder='Enter your email' />
        </div>
        <div className='form__group'>
         <label htmlFor='phone' className='form__label'>Phone Number</label>
         <input required onChange={(e)=>onChangeHandler(e)} id='phone' name='phone' value={data.phone} className='form__input' type="phone" placeholder='Enter your Phone Number' />
        </div>
        <div className='form__group'>
        <label htmlFor='avatar' className='form__label'> {data.avatar ? <img className='avatar' src={data.avatar} alt='user-avatar'/> : <FaRegUserCircle size={40} /> }
        <span className='upload-new'>Select A Photo</span>
        <input type='file'  onChange={(e)=>onChangeFileHandler(e)} id='avatar' name='avatar' className='form__file' /> 
        </label> 
        </div>
        <div className='form__group'>
        <button className='btn' type='submit'>Update</button>
        </div>
        </form>
          <div className='user-orders'>
              <h3>My Order</h3>
              {orders && orders.filter((order) => order.user === currentUser._id).map((order,i)=>{
                  return <div className='user-order' key={i}><p>Purchased {order.products.length} products on {new Date(order.createdAt).toDateString()}</p></div>
              })}
          </div>
        </div>
    </div>
  )
}

export default Profile