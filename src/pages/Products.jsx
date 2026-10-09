import { useState } from 'react'
import Navbar from '../components/Navbar'
import ProductCard from '../components/ProductCard'
import products from '../data/products'

function Products() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All Categories')
  const filteredProducts = products.filter((product) => {
    const matchSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase())
    const matchCategory =
      category === 'All Categories' ||
      product.category === category
    return matchSearch && matchCategory
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-blue-950">All Products</h1>

          <p className="text-gray-500 mt-1">Explore all products available at SHOP</p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-10">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:flex-1 border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full md:w-64 border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option>All Categories</option>
            <option>Electronics</option>
            <option>Fashion</option>
            <option>Accessories</option>
          </select>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        ) : (

          <div className="text-center py-16">
            <p className="text-5xl mb-4">
              🔍
            </p>
            <h2 className="text-xl font-bold text-blue-950">No products found</h2>
            <p className="text-gray-500 mt-2">Try another product name or category.</p>
          </div>
        )}
      </main>
    </div>
  )
}

export default Products