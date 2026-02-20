import React, { useEffect, useState } from 'react'
import StoreCards from './StoreCards'

const Store = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const res = await fetch('https://dummyjson.com/products?limit=100')
      if (!res.ok) throw new Error('Failed to fetch products')
      const json = await res.json()
      setData(json.products)
    } catch (err) {
      setError(err.message || 'Unable to load products')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  return (
    <div>
      <StoreCards data={data} loading={loading} error={error} />
    </div>
  )
}

export default Store