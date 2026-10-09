import { useState } from 'react'

function AdminSettings() {
  const [settings, setSettings] = useState({
    storeName: 'BAGUS SHOP',
    email: 'bagus@shop.com',
    phone: '081234567890',
    address: 'Singaraja, Bali, Indonesia',
    currency: 'IDR',
    shippingFee: 15000,
    notifications: true,
  })
  const [saved, setSaved] = useState(false)
  function handleChange(event) {
    const { name, value, type, checked } = event.target
    setSettings((previous) => ({
      ...previous,
      [name]: type === 'checkbox' ? checked : value,
    }))
    setSaved(false)
  }
  function handleSubmit(event) {
    event.preventDefault()
    setSaved(true)
  }
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">Settings</h1>
        <p className="mt-2 text-sm text-slate-500">Kelola informasi dan pengaturan toko SHOP.</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6 border-b border-slate-100 pb-4">
            <h2 className="text-lg font-semibold text-slate-800">Informasi Toko</h2>
            <p className="mt-1 text-sm text-slate-500">Atur identitas dan informasi kontak toko.</p>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div>
              <label
                htmlFor="storeName"
                className="mb-2 block text-sm font-medium text-slate-700">Nama Toko
              </label>
              <input
                id="storeName"
                name="storeName"
                type="text"
                value={settings.storeName}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-slate-700">Email Toko
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={settings.email}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>
            <div>
              <label
                htmlFor="phone"
                className="mb-2 block text-sm font-medium text-slate-700">Nomor Telepon
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={settings.phone}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>
            <div>
              <label
                htmlFor="currency"
                className="mb-2 block text-sm font-medium text-slate-700">Mata Uang
              </label>
              <select
                id="currency"
                name="currency"
                value={settings.currency}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option value="IDR">IDR - Rupiah</option>
                <option value="USD">USD - US Dollar</option>
                <option value="MYR">MYR - Malaysian Ringgit</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label
                htmlFor="address"
                className="mb-2 block text-sm font-medium text-slate-700">Alamat Toko
              </label>
              <textarea
                id="address"
                name="address"
                rows="3"
                value={settings.address}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6 border-b border-slate-100 pb-4">
            <h2 className="text-lg font-semibold text-slate-800">Pengaturan Pesanan</h2>
            <p className="mt-1 text-sm text-slate-500">Atur ongkos kirim dan notifikasi pesanan.</p>
          </div>
          <div className="space-y-6">
            <div className="max-w-md">
              <label
                htmlFor="shippingFee"
                className="mb-2 block text-sm font-medium text-slate-700">Ongkos Kirim (Rp)
              </label>
              <input
                id="shippingFee"
                name="shippingFee"
                type="number"
                min="0"
                value={settings.shippingFee}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>
            <div className="flex items-start justify-between gap-4 rounded-xl bg-blue-50 p-4">
              <div>
                <p className="font-medium text-slate-800">Notifikasi Pesanan</p>
                <p className="mt-1 text-sm text-slate-500">Aktifkan notifikasi untuk pesanan baru.</p>
              </div>
              <label className="relative inline-flex cursor-pointer items-center">
                <input
                  type="checkbox"
                  name="notifications"
                  checked={settings.notifications}
                  onChange={handleChange}
                  className="peer sr-only"
                />
                <div className="h-6 w-11 rounded-full bg-slate-300 transition peer-checked:bg-blue-600 after:absolute after:left-1 after:top-1 after:h-4 after:w-4 after:rounded-full after:bg-white after:transition-transform peer-checked:after:translate-x-5" />
              </label>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            {saved && (
              <p className="text-sm font-medium text-green-600">✓ Pengaturan berhasil disimpan (simulasi).
              </p>
            )}
          </div>
          <button
            type="submit"
            className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            Simpan Pengaturan
          </button>
        </div>
      </form>
    </div>
  )
}
export default AdminSettings