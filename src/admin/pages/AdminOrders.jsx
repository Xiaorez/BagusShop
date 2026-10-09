
import { useOrders } from '../../context/OrderContext'
function AdminOrders() {
  const { orders, updateOrderStatus } = useOrders()

  function formatPrice(price) {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(price)
  }

  function getStatusStyle(status) {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-700'
      case 'Paid':
        return 'bg-blue-100 text-blue-700'
      case 'Processing':
        return 'bg-purple-100 text-purple-700'
      case 'Completed':
        return 'bg-green-100 text-green-700'
      case 'Cancelled':
        return 'bg-red-100 text-red-700'
      default:
        return 'bg-slate-100 text-slate-700'
    }
  }

  const pendingOrders = orders.filter(
    (order) => order.status === 'Pending'
  ).length
  const completedOrders = orders.filter(
    (order) => order.status === 'Completed'
  ).length
  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-3xl font-bold text-slate-800">Orders</h1>
        <p className="mt-2 text-sm text-slate-500">Kelola pesanan pelanggan dan perbarui status pesanan.</p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Total Orders</p>
          <h2 className="mt-3 text-3xl font-bold text-slate-800">{orders.length}</h2>
          <p className="mt-2 text-sm text-blue-600">Seluruh pesanan</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Pending Orders</p>
          <h2 className="mt-3 text-3xl font-bold text-slate-800">{pendingOrders}</h2>
          <p className="mt-2 text-sm text-yellow-600">Menunggu proses</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Completed Orders</p>
          <h2 className="mt-3 text-3xl font-bold text-slate-800">{completedOrders}</h2>
          <p className="mt-2 text-sm text-green-600">Pesanan selesai</p>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 p-6">
          <h2 className="text-lg font-semibold text-slate-800">Daftar Pesanan</h2>
          <p className="mt-1 text-sm text-slate-500">
            Perubahan status akan langsung memperbarui data pesanan bersama.
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px] text-left">
            <thead className="bg-slate-50">
              <tr className="text-sm text-slate-500">
                <th className="px-6 py-4 font-medium">Order ID</th>
                <th className="px-6 py-4 font-medium">Customer</th>
                <th className="px-6 py-4 font-medium">Product</th>
                <th className="px-6 py-4 font-medium">Total</th>
                <th className="px-6 py-4 font-medium">Payment</th>
                <th className="px-6 py-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {orders.map((order) => (
                <tr
                  key={order.id}
                  className="transition hover:bg-slate-50">
                  <td className="px-6 py-4 font-semibold text-blue-600">#{order.id}</td>
                  <td className="px-6 py-4 font-medium text-slate-800">{order.customer}</td>
                  <td className="px-6 py-4 text-slate-600">{order.product}</td>
                  <td className="px-6 py-4 font-medium text-slate-700">{formatPrice(order.total)}</td>
                  <td className="px-6 py-4 text-slate-600">{order.payment}</td>
                  <td className="px-6 py-4">
                    <select
                      value={order.status}
                      onChange={(event) =>
                        updateOrderStatus(
                          order.id,
                          event.target.value
                        )
                      }
                      aria-label={`Status pesanan ${order.id}`}
                      className={`cursor-pointer rounded-lg border-0 px-3 py-2 text-sm font-semibold outline-none focus:ring-2 focus:ring-blue-300 ${getStatusStyle(order.status)}`}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Paid">Paid</option>
                      <option value="Processing">Processing</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-12 text-center text-slate-500">Belum ada pesanan.
                    </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
export default AdminOrders