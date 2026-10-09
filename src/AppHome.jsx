import { useState } from 'react'
import Navbar from './components/Navbar'
import products from './data/products'
import ProductCard from './components/ProductCard'

function AppHome() {
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

  const featuredProducts = filteredProducts.slice(0, 4)
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <section className="bg-blue-50">
        <div className="max-w-7xl mx-auto px-6 py-20 text-center">
          <p className="text-blue-700 font-semibold mb-3">WELCOME TO SHOP</p>

          <h2 className="text-5xl font-bold text-blue-950 mb-5">Upgrade Your Lifestyle</h2>

          <p className="text-gray-600 max-w-xl mx-auto mb-8">
            Discover quality products designed to make your everyday
            life easier and better.
          </p>

          <a
            href="#featured-products"
            className="inline-block bg-blue-900 text-white px-7 py-3 rounded-lg font-semibold hover:bg-blue-800 transition"
          >Shop Now
          </a>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row gap-4 justify-between">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-2/3 border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full md:w-1/3 border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option>All Categories</option>
            <option>Electronics</option>
            <option>Fashion</option>
            <option>Accessories</option>
          </select>
        </div>
      </section>

      <section
        id="featured-products"
        className="max-w-7xl mx-auto px-6 pb-16"
      >

        <div className="flex items-center justify-between mb-7">
          <div>
            <h2 className="text-3xl font-bold text-blue-950">Featured Products</h2>
            <p className="text-gray-500 mt-1">Explore our popular products</p>
          </div>

          <a
            href="/products"
            className="text-blue-700 font-semibold hover:text-blue-900 transition"
          >View All →
          </a>
        </div>
        {featuredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        ) : (

          <div className="text-center py-16">
            <p className="text-5xl mb-4">🔍</p>

            <h3 className="text-xl font-bold text-blue-950">No products found</h3>

            <p className="text-gray-500 mt-2">Try another product name or category.</p>
          </div>
        )}
      </section>
    </div>
  )
}
export default AppHome