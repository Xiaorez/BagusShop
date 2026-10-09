import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import products from '../data/products'
import { useCart } from '../context/CartContext'

function ProductDetail() {
  const { id } = useParams()
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)

  const product = products.find(
    (item) => item.id === Number(id)
  )
  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="max-w-7xl mx-auto px-6 py-16 text-center">
          <h1 className="text-3xl font-bold text-blue-950">Product Not Found</h1>
          <p className="text-gray-500 mt-2">
            The product you are looking for does not exist.
          </p>
          <Link
            to="/products"
            className="inline-block mt-6 bg-blue-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition"
          >Back to Products
          </Link>
        </main>
      </div>
    )
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product)
    }
    setAdded(true)
    setTimeout(() => {
      setAdded(false)
    }, 1500)
  }
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-6 py-10">

        <Link
          to="/products"
          className="text-blue-700 font-semibold hover:text-blue-900"
        > ← Back to Products
        </Link>

        <div className="bg-white border border-gray-200 rounded-xl mt-6 p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="h-96 bg-blue-50 rounded-xl flex items-center justify-center text-9xl">
              <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-contain p-2" />
            </div>

            <div className="flex flex-col justify-center">
              <p className="text-blue-700 font-semibold">
                {product.category}
              </p>

              <h1 className="text-4xl font-bold text-blue-950 mt-2">
                {product.name}
              </h1>

              <div className="flex items-center gap-2 mt-4">
                <span className="text-yellow-500">★★★★★</span>
                <span className="text-gray-500">4.8</span>
              </div>

              <p className="text-3xl font-bold text-blue-900 mt-6">
                Rp {product.price.toLocaleString('id-ID')}
              </p>

              <p className="text-gray-600 leading-relaxed mt-5">
                High-quality {product.name.toLowerCase()} designed
                to provide comfort, style, and convenience for your
                everyday activities.
              </p>

              <div className="mt-5">
                <span className="text-green-600 font-semibold">✓ In Stock</span>
              </div>

              <div className="flex items-center gap-4 mt-6">
                <span className="font-semibold text-gray-700">Quantity</span>
                <div className="flex items-center border border-gray-300 rounded-lg">

                  <button
                    onClick={() =>
                      setQuantity(
                        quantity > 1
                          ? quantity - 1
                          : 1
                      )
                    }
                    className="px-4 py-2 text-lg hover:bg-gray-100"
                  >
                    −
                  </button>
                  <span className="px-5 font-semibold">
                    {quantity}
                  </span>

                  <button
                    onClick={() =>
                      setQuantity(quantity + 1)
                    }
                    className="px-4 py-2 text-lg hover:bg-gray-100">+
                  </button>
                </div>
              </div>
              <button
                onClick={handleAddToCart}
                className={`w-full mt-8 py-3 rounded-lg font-semibold transition ${
                  added
                    ? 'bg-green-600 text-white'
                    : 'bg-blue-900 text-white hover:bg-blue-800'
                }`}
              >
                {added
                  ? '✓ Added to Cart'
                  : `Add ${quantity} to Cart`}
              </button>

              <Link
                to="/cart"
                className="block text-center w-full mt-3 border border-blue-900 text-blue-900 py-3 rounded-lg font-semibold hover:bg-blue-50 transition"
              >View Cart
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
export default ProductDetail