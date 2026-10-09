import { Link } from 'react-router-dom'
function Navbar() {
  return (
    <nav className="bg-blue-950 text-white">
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        <Link
          to="/"
          className="text-2xl font-bold">BAGUS SHOP
        </Link>

        <div className="flex items-center gap-8">
          <Link
            to="/"
            className="hover:text-blue-200 transition">Home
          </Link>

          <Link
            to="/products"
            className="hover:text-blue-200 transition">Products
          </Link>

          <Link
            to="/cart"
            className="hover:text-blue-200 transition">Cart 🛒
          </Link>
        </div>
      </div>
    </nav>
  )
}
export default Navbar