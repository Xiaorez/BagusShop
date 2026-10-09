
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import AppHome from './AppHome'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'

import AdminLayout from './admin/AdminLayout'
import AdminDashboard from './admin/pages/AdminDashboard'
import AdminProducts from './admin/pages/AdminProducts'
import AdminOrders from './admin/pages/AdminOrders'
import AdminUsers from './admin/pages/AdminUsers'
import AdminSettings from './admin/pages/AdminSettings'

import { CartProvider } from './context/CartContext'
import { OrderProvider } from './context/OrderContext'

function App() {
  return (
    <CartProvider>
      <OrderProvider>
        <BrowserRouter>
          <Routes>

            <Route
              path="/"
              element={<AppHome />}
            />
            <Route
              path="/products"
              element={<Products />}
            />
            <Route
              path="/product/:id"
              element={<ProductDetail />}
            />
            <Route
              path="/cart"
              element={<Cart />}
            />
            <Route
              path="/checkout"
              element={<Checkout />}
            />

            <Route
              path="/admin"
              element={<AdminLayout />}
            >
              <Route
                index
                element={<AdminDashboard />}
              />
              <Route
                path="products"
                element={<AdminProducts />}
              />
              <Route
                path="orders"
                element={<AdminOrders />}
              />
              <Route
                path="users"
                element={<AdminUsers />}
              />
              <Route
                path="settings"
                element={<AdminSettings />}
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </OrderProvider>
    </CartProvider>
  )
}
export default App