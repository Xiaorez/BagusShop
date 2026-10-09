import { createContext, useContext, useState } from 'react'
const OrderContext = createContext()
const initialOrders = [
  {
    id: 'ORD001',
    customer: 'Andi',
    product: 'Headphone Gaming',
    total: 410000,
    payment: 'Bank Transfer',
    status: 'Paid',
  },
  {
    id: 'ORD002',
    customer: 'Budi',
    product: 'Smart Watch',
    total: 819999,
    payment: 'E-Wallet',
    status: 'Pending',
  },
  {
    id: 'ORD003',
    customer: 'Citra',
    product: 'Puma Shoes',
    total: 800000,
    payment: 'COD',
    status: 'Processing',
  },
  {
    id: 'ORD004',
    customer: 'Dimas',
    product: 'Mechanical Keyboard',
    total: 389999,
    payment: 'Bank Transfer',
    status: 'Completed',
  },
]

export function OrderProvider({ children }) {
  const [orders, setOrders] = useState(initialOrders)
  function updateOrderStatus(orderId, newStatus) {
    setOrders((previousOrders) =>
      previousOrders.map((order) =>
        order.id === orderId
          ? { ...order, status: newStatus }
          : order
      )
    )
  }

  return (
    <OrderContext.Provider
      value={{ orders, setOrders, updateOrderStatus }}
    >
      {children}
    </OrderContext.Provider>
  )
}

export function useOrders() {
  const context = useContext(OrderContext)
  if (!context) {
    throw new Error(
      'useOrders harus digunakan di dalam OrderProvider'
    )
  }
  return context
}