import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
function ProductCard({ product }) {
  const { addToCart } = useCart()
  const [added, setAdded] = useState(false)
  const handleAddToCart = () => {
    addToCart(product)
    setAdded(true)
    setTimeout(() => {
      setAdded(false)
    }, 1500)
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition">
      <div className="h-52 bg-blue-50 flex items-center justify-center">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"/>
      </div>

      <div className="p-5">
        <p className="text-sm text-gray-500">
          {product.category}
        </p>
        <h3 className="text-lg font-bold text-gray-900 mt-1">
          {product.name}
        </h3>
        <p className="text-blue-900 font-bold text-lg mt-3">
          Rp {product.price.toLocaleString('id-ID')}
        </p>
        <div className="flex gap-2 mt-4">

          <Link
            to={`/product/${product.id}`}
            className="flex-1 text-center border border-blue-900 text-blue-900 py-2.5 rounded-lg font-semibold hover:bg-blue-50 transition"
          >
            Detail
          </Link>

          <button
            onClick={handleAddToCart}
            className={`flex-1 py-2.5 rounded-lg font-semibold transition ${
              added
                ? 'bg-green-600 text-white'
                : 'bg-blue-900 text-white hover:bg-blue-800'
            }`}>
            {added ? '✓ Added' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  )
}
export default ProductCard