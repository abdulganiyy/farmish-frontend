import React,{useEffect} from 'react'
import './Home.scss'
import BigHero from '../../assets/big-hero.jpg'
import { Link } from 'react-router-dom'
import ProductCard from '../../Components/ProductCard/ProductCard'

import { useSelector,useDispatch } from 'react-redux'
import { fetchProducts } from '../../slices/shopSlice'
//import { loadApp } from '../../slices/userSlice'

const Home = () => {
  const {products} = useSelector(state => state.shop)

  //console.log(products)
  const dispatch = useDispatch()

  useEffect(() => {
   
    dispatch(fetchProducts())
    //dispatch(loadApp)
    
  }, [dispatch])
  
  return (
    <div className='wrap'>
       <div className='hero'>
           <img src={BigHero} alt='hero'/>
           <div className='hero__content wrapper'>
               <h2 className='hero__title'>Online Farm Products Market Place</h2>
               <h2 className='hero__title'>Easy Shopping</h2>
               <h2 className='hero__title'>Door Step Dellivery</h2>
               <p><Link to='/shop' className='btn'>Shop Now</Link></p>
           </div>
       </div>
       <div className='featured'>
         <h3 className='title title--mb title--mt'>Featured Products</h3>
         <div className='featured__products'>
           {products && products.map((product,i)=> <ProductCard key={i} product={product}/>)}
         </div>
       </div>
    </div>
  )
}

export default Home 