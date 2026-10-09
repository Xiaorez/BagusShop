import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { useCart } from '../context/CartContext'

function Cart() {
  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart()

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )

  const shipping = cart.length > 0 ? 20000 : 0

  const total = subtotal + shipping
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-6 py-10">
 
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-blue-950">Shopping Cart</h1>
          <p className="text-gray-500 mt-1">Review your items before checkout</p>
        </div>
        {cart.length === 0 ? (

          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <div className="text-6xl mb-5">🛒</div>
            <h2 className="text-2xl font-bold text-blue-950">Your cart is empty</h2>
            <p className="text-gray-500 mt-2 mb-6">You haven't added any products yet.</p>
            <Link
              to="/"
              className="inline-block bg-blue-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition"
            >Continue Shopping
            </Link>
          </div>
        ) : (

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            <div className="lg:col-span-2 space-y-4">

              {cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-white border border-gray-200 rounded-xl p-5">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-5">

                    <div className="w-24 h-24 bg-blue-50 rounded-lg flex items-center justify-center text-4xl shrink-0">
                      <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"/>
                    </div>

                    <div className="flex-1">
                      <p className="text-sm text-gray-500">{item.category}</p>
                      <h2 className="text-lg font-bold text-blue-950">{item.name}</h2>
                      <p className="text-blue-900 font-semibold mt-1">
                        Rp {item.price.toLocaleString('id-ID')}
                      </p>
                    </div>

                    <div className="flex items-center border border-gray-300 rounded-lg">
                      <button
                        onClick={() => decreaseQuantity(item.id)}
                        className="px-3 py-2 text-lg hover:bg-gray-100">
                        −
                      </button>
                      <span className="px-4 font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => increaseQuantity(item.id)}
                        className="px-3 py-2 text-lg hover:bg-gray-100">
                        +
                      </button>
                    </div>

                    <div className="text-right min-w-28">
                      <p className="font-bold text-blue-950">
                        Rp {(item.price * item.quantity).toLocaleString('id-ID')}
                      </p>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-sm text-red-500 hover:text-red-700 mt-2">Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6 h-fit">
              <h2 className="text-xl font-bold text-blue-950 mb-6">Order Summary</h2>
              <div className="space-y-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>
                    Rp {subtotal.toLocaleString('id-ID')}
                  </span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>
                    Rp {shipping.toLocaleString('id-ID')}
                  </span>
                </div>
                <div className="border-t pt-4 flex justify-between">
                  <span className="font-bold text-blue-950">
                    Total
                  </span>
                  <span className="font-bold text-xl text-blue-900">
                    Rp {total.toLocaleString('id-ID')}
                  </span>
                </div>
              </div>
              <Link
                to="/checkout"
                className="block text-center w-full mt-6 bg-blue-900 text-white py-3 rounded-lg font-semibold hover:bg-blue-800 transition">
                Proceed to Checkout
              </Link>
              <Link
                to="/"
                className="block text-center w-full mt-3 text-blue-700 font-semibold hover:text-blue-900"
              >Continue Shopping
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
export default Cart