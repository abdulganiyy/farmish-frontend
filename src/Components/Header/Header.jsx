import React,{useState} from 'react'
import './Header.scss';
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import {FaShoppingCart} from 'react-icons/fa'


const Header = () => {
    const [showModal, setShowModal] = useState(false)

    const {currentUser} = useSelector(state => state.user)
    const {cart} = useSelector(state => state.shop)

    

  return (
    <div className='header wrapper'>
        <div className='logo '>
            <Link to='/' className='link'>Farmish</Link>
        </div>
        <nav className={showModal?`nav nav--show`:'nav'}>
            <ul>
               {currentUser ? (<><li><Link to='/profile' className='link link--mobile'>Welcome {currentUser.username}</Link></li><li><Link to='/logout' className='link link--mobile'>Logout</Link></li></>) :null} 
                {currentUser ? null :(<><li><Link to='/login' className='link link--mobile'>Login</Link></li>
                <li><Link to='/signup' className='link link--mobile'>Signup</Link></li></>)}
                <li><Link to='/cart' className='link link--mobile'><FaShoppingCart size={'1.5rem'} /></Link>{ cart.length ? <span className='cart__count'>{cart.length}</span> : null}</li>
            </ul>
        </nav>
        <div className={showModal?`harmburger harmburger--close`:'harmburger'} onClick={()=> setShowModal(!showModal)}>
          <div className='harmburger__middle'></div>
        </div>
    </div>
  )
}

export default Header