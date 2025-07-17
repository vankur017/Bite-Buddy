import React, { useEffect, useState } from 'react'
import StoreCards from './StoreCards'

const Store = () => {
  
  const [data, setData] = useState([])


  const fetchProducts = async()=>{
    try{
    const data = await fetch('https://dummyjson.com/products')
    const json = await data.json()
    console.log(json);

    setData(json.products)
    }
    catch(error){
      console.error('Unable to proccess request', error)
    }
  }
  
  useEffect(()=>{
    fetchProducts()
  }, [])


  return (
    <div>
        <StoreCards data={data} setData={setData}/>
    </div>
  )
}

export default Store