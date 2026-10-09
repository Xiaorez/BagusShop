import { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { useCart } from '../context/CartContext'
function Checkout() {
  const { cart, clearCart } = useCart()
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address: '',
    city: '',
    payment: '',
  })
  const [error, setError] = useState('')
  const [paymentInfo, setPaymentInfo] = useState(false)
  const [orderSuccess, setOrderSuccess] = useState(false)
  const handleChange = (e) => {
    const { name, value } = e.target

    if (name === 'phone') {
      const onlyNumbers = value.replace(/[^0-9]/g, '')
      setFormData({
        ...formData,
        phone: onlyNumbers,
      })
      setError('')
      return
    }
    setFormData({
      ...formData,
      [name]: value,
    })
    setError('')
  }
  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )
  const shipping = cart.length > 0 ? 20000 : 0
  const total = subtotal + shipping

  const handlePlaceOrder = () => {
    const {
      fullName,
      phone,
      address,
      city,
      payment,
    } = formData
    if (
      !fullName.trim() ||
      !phone.trim() ||
      !address.trim() ||
      !city.trim() ||
      !payment
    ) {
      setError(
        'Please complete all shipping information and select a payment method.'
      )
      return
    }

    if (phone.length < 10 || phone.length > 15) {
      setError(
        'Phone number must contain between 10 and 15 digits.'
      )
      return
    }

    setPaymentInfo(true)

    setTimeout(() => {
      document
        .getElementById('payment-information')
        ?.scrollIntoView({
          behavior: 'smooth',
        })
    }, 100)
  }

  const handleConfirmOrder = () => {
    clearCart()
    setPaymentInfo(false)
    setOrderSuccess(true)
  }

  if (orderSuccess) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="max-w-3xl mx-auto px-6 py-20">
          <div className="bg-white border border-gray-200 rounded-xl p-10 text-center">
            <div className="text-6xl mb-5">✅</div>
            <h1 className="text-3xl font-bold text-blue-950">Order Placed Successfully!</h1>
            <p className="text-gray-500 mt-3">
Thank you for your purchase. Your order has been received.
            </p>
            <div className="bg-blue-50 rounded-lg p-4 mt-6 text-left">
              <p className="text-sm text-gray-500">Payment Method</p>
              <p className="font-semibold text-blue-950 mt-1">{formData.payment}</p>
            </div>
            <Link
              to="/"
              className="inline-block mt-8 bg-blue-900 text-white px-7 py-3 rounded-lg font-semibold hover:bg-blue-800 transition"
            >
              Back to Home
            </Link>
          </div>
        </main>
      </div>
    )
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="max-w-3xl mx-auto px-6 py-20">
          <div className="bg-white border border-gray-200 rounded-xl p-10 text-center">
            <div className="text-6xl mb-5">🛒</div>
            <h1 className="text-2xl font-bold text-blue-950">Your cart is empty</h1>
            <p className="text-gray-500 mt-2">Please add a product before checkout.</p>
            <Link
              to="/"
              className="inline-block mt-6 bg-blue-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition"
            >Continue Shopping
            </Link>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-blue-950">Checkout</h1>
          <p className="text-gray-500 mt-1">Complete your order</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h2 className="text-xl font-bold text-blue-950 mb-6">Shipping Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number
                  </label>

                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    inputMode="numeric"
                    maxLength="15"
                    placeholder="08xxxxxxxxxx"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                  />

                  <p className="text-xs text-gray-400 mt-1">Only numbers, 10–15 digits</p>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Address
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    rows="3"
                    placeholder="Enter your address"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Enter your city"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h2 className="text-xl font-bold text-blue-950 mb-6">Payment Method</h2>
              <div className="space-y-4">
                <label
                  className={`flex items-center gap-3 border rounded-lg p-4 cursor-pointer transition ${
                    formData.payment === 'Bank Transfer'
                      ? 'border-blue-700 bg-blue-50'
                      : 'border-gray-200 hover:bg-blue-50'
                  }`}>
                  <input
                    type="radio"
                    name="payment"
                    value="Bank Transfer"
                    checked={
                      formData.payment === 'Bank Transfer'
                    }
                    onChange={handleChange}
                  />
                  <div>
                    <p className="font-semibold text-blue-950">Bank Transfer</p>
                    <p className="text-sm text-gray-500">BCA / BRI / BNI / Mandiri</p>
                  </div>
                </label>

                <label
                  className={`flex items-center gap-3 border rounded-lg p-4 cursor-pointer transition ${
                    formData.payment === 'E-Wallet'
                      ? 'border-blue-700 bg-blue-50'
                      : 'border-gray-200 hover:bg-blue-50'
                  }`}>
                  <input
                    type="radio"
                    name="payment"
                    value="E-Wallet"
                    checked={
                      formData.payment === 'E-Wallet'
                    }
                    onChange={handleChange}
                  />
                  <div>
                    <p className="font-semibold text-blue-950">QRIS / E-Wallet</p>
                    <p className="text-sm text-gray-500">GoPay / OVO / DANA / QRIS</p>
                  </div>
                </label>

                <label
                  className={`flex items-center gap-3 border rounded-lg p-4 cursor-pointer transition ${
                    formData.payment === 'COD'
                      ? 'border-blue-700 bg-blue-50'
                      : 'border-gray-200 hover:bg-blue-50'
                  }`}>
                  <input
                    type="radio"
                    name="payment"
                    value="COD"
                    checked={
                      formData.payment === 'COD'
                    }
                    onChange={handleChange}
                  />
                  <div>
                    <p className="font-semibold text-blue-950">Cash on Delivery</p>
                    <p className="text-sm text-gray-500">Pay when your order arrives</p>
                  </div>
                </label>
              </div>
            </div>
            {paymentInfo && (
              <div
                id="payment-information"
                className="bg-white border border-blue-200 rounded-xl p-6">
                <h2 className="text-xl font-bold text-blue-950">Payment Information</h2>
                <p className="text-gray-500 mt-1">
                  Please complete your payment before confirming the order.
                </p>

                {formData.payment === 'Bank Transfer' && (
                  <div className="mt-6">
                    <div className="bg-blue-50 rounded-xl p-6">
                      <p className="text-sm text-gray-500">Transfer to</p>
                      <h3 className="text-xl font-bold text-blue-950 mt-1">Bank BCA</h3>
                      <p className="text-3xl font-bold text-blue-900 mt-4 tracking-wider">
                        1234567890
                      </p>
                      <p className="text-gray-600 mt-2">BAGUS SHOP INDONESIA</p>
                    </div>
                    <div className="border-t mt-6 pt-5">
                      <div className="flex justify-between">
                        <span className="text-gray-600">otal Payment</span>
                        <span className="text-xl font-bold text-blue-900">
                          Rp {total.toLocaleString('id-ID')}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {formData.payment === 'E-Wallet' && (
                  <div className="mt-6 text-center">
                    <p className="font-semibold text-blue-950 mb-4">
                      Scan QRIS to Pay
                    </p>
                    <div className="w-56 h-56 mx-auto bg-gray-100 border border-gray-300 rounded-xl flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-7xl">▦</div>
                        <p className="text-xs text-gray-500 mt-2">QRIS CODE</p>
                      </div>
                    </div>
                    <p className="text-gray-500 mt-4">
                      Scan this QR code using your preferred
                      payment application.
                    </p>
                    <p className="text-2xl font-bold text-blue-900 mt-4">
                      Rp {total.toLocaleString('id-ID')}
                    </p>
                  </div>
                )}

                {formData.payment === 'COD' && (
                  <div className="mt-6">
                    <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                      <div className="text-4xl mb-3">
                        🚚
                      </div>
                      <h3 className="text-lg font-bold text-green-700">Cash on Delivery</h3>
                      <p className="text-gray-600 mt-2">
                        You don't need to make a payment now.
                        Please prepare the payment when your
                        order arrives.
                      </p>
                      <div className="flex justify-between mt-5 pt-4 border-t border-green-200">
                        <span className="text-gray-600">Amount to Pay</span>
                        <span className="font-bold text-green-700">
                          Rp {total.toLocaleString('id-ID')}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                <button
                  onClick={handleConfirmOrder}
                  className="w-full mt-6 bg-blue-900 text-white py-3 rounded-lg font-semibold hover:bg-blue-800 transition"
                >
                  Confirm Order
                </button>
              </div>
            )}
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6 h-fit">
            <h2 className="text-xl font-bold text-blue-950 mb-6">Order Summary</h2>
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3">
                  <div className="w-14 h-14 bg-blue-50 rounded-lg flex items-center justify-center text-2xl">
                    <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-blue-950">
                      {item.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {item.quantity} × Rp{' '}
                      {item.price.toLocaleString('id-ID')}
                    </p>
                  </div>
                  <p className="font-semibold text-blue-950">
                    Rp{' '}
                    {(item.price * item.quantity).toLocaleString(
                      'id-ID'
                    )}
                  </p>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-200 mt-6 pt-5 space-y-3">
              <div className="flex justify-between text-gray-600">
                <span>
                  Subtotal
                </span>
                <span>
                  Rp {subtotal.toLocaleString('id-ID')}
                </span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>
                  Shipping
                </span>
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

            {error && (
              <div className="mt-5 bg-red-50 border border-red-200 text-red-600 rounded-lg px-4 py-3 text-sm">
                ⚠️ {error}
              </div>
            )}

            {!paymentInfo && (
              <button
                onClick={handlePlaceOrder}
                className="w-full mt-6 bg-blue-900 text-white py-3 rounded-lg font-semibold hover:bg-blue-800 transition"
              >
                Place Order
              </button>
            )}
            {paymentInfo && (
              <div className="mt-6 bg-blue-50 rounded-lg p-4">
                <p className="text-sm text-gray-500">
                  Payment Method
                </p>
                <p className="font-semibold text-blue-950 mt-1">
                  {formData.payment}
                </p>
                <p className="text-sm text-gray-500 mt-3">
                  Please complete the payment information
                  shown on the left.
                </p>
              </div>
            )}
            <Link
              to="/cart"
              className="block text-center mt-3 text-blue-700 font-semibold hover:text-blue-900">
              Back to Cart
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
export default Checkout