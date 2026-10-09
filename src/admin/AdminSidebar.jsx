import { NavLink, Link } from 'react-router-dom'
function AdminSidebar() {
  const menuClass = ({ isActive }) =>
    `block px-4 py-3 rounded-lg font-medium transition ${
      isActive
        ? 'bg-blue-900 text-white'
        : 'text-gray-700 hover:bg-blue-50 hover:text-blue-900'
    }`
  return (
    <aside className="w-64 min-h-screen bg-white border-r border-gray-200 flex flex-col">
      <div className="px-6 py-6 border-b border-gray-200">
        <Link
          to="/admin"
          className="text-2xl font-bold text-blue-950">BAGUS SHOP
        </Link>
        <p className="text-sm text-gray-500 mt-1">Admin Panel</p>
      </div>
      <nav className="flex-1 px-4 py-6">
        <p className="text-xs font-semibold text-gray-400 uppercase mb-3 px-2">Main Menu</p>
        <div className="space-y-2">
          <NavLink
            to="/admin"
            end
            className={menuClass}>
            Dashboard
          </NavLink>

          <NavLink
            to="/admin/products"
            className={menuClass}>
            Products
          </NavLink>

          <NavLink
            to="/admin/orders"
            className={menuClass}>
            Orders
          </NavLink>

          <NavLink
            to="/admin/users"
            className={menuClass}>
            Users
          </NavLink>

          <NavLink
            to="/admin/settings"
            className={menuClass}>
            Settings
          </NavLink>
        </div>
      </nav>

      <div className="p-4 border-t border-gray-200">
        <Link
          to="/"
          className="block px-4 py-3 rounded-lg text-gray-700 font-medium hover:bg-blue-50 hover:text-blue-900 transition">
          ← Back to SHOP
        </Link>
      </div>
    </aside>
  )
}
export default AdminSidebar