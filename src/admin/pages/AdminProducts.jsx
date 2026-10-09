import { useState } from 'react'
import productsData from '../../data/products'

function AdminProducts() {
  const [products, setProducts] = useState(productsData)

  const [showForm, setShowForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)

  const [productToDelete, setProductToDelete] = useState(null)

  const [formData, setFormData] = useState({
    name: '',
    category: 'Electronics',
    price: '',
    image: '',
  })

  function formatPrice(price) {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(price)
  }

  function handleAddProduct() {
    setEditingProduct(null)
    setFormData({
      name: '',
      category: 'Electronics',
      price: '',
      image: '',
    })
    setShowForm(true)
  }

  function handleEditProduct(product) {
    setEditingProduct(product)
    setFormData({
      name: product.name,
      category: product.category,
      price: product.price,
      image: product.image,
    })
    setShowForm(true)
  }

  function handleChange(event) {
    const { name, value } = event.target
    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    const productData = {
      ...formData,
      price: Number(formData.price),
    }
    if (
      !productData.name.trim() ||
      !productData.category ||
      !productData.price ||
      productData.price < 0 ||
      !productData.image.trim()
    ) {
      alert('Mohon isi semua data produk dengan benar.')
      return
    }
    if (editingProduct) {
      setProducts((previous) =>
        previous.map((product) =>
          product.id === editingProduct.id
            ? { ...product, ...productData }
            : product
        )
      )
    } else {
      const newProduct = {
        id:
          products.length > 0
            ? Math.max(...products.map((product) => product.id)) + 1
            : 1,
        ...productData,
      }
      setProducts((previous) => [...previous, newProduct])
    }
    setShowForm(false)
    setEditingProduct(null)
  }

  function handleCloseForm() {
    setShowForm(false)
    setEditingProduct(null)
  }

  function handleDeleteProduct(product) {
    setProductToDelete(product)
  }

  function confirmDeleteProduct() {
    if (!productToDelete) return
    setProducts((previous) =>
      previous.filter(
        (product) => product.id !== productToDelete.id
      )
    )
    setProductToDelete(null)
  }
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Products</h1>
          <p className="mt-2 text-sm text-slate-500">
            Kelola seluruh produk yang tersedia di toko SHOP.
          </p>
        </div>
        <button
          type="button"
          onClick={handleAddProduct}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          <span className="text-xl">+</span>Tambah Produk</button>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Total Produk</p>
          <h2 className="mt-3 text-3xl font-bold text-slate-800">{products.length}</h2>
          <p className="mt-2 text-sm text-blue-600">Produk terdaftar</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Total Kategori</p>
          <h2 className="mt-3 text-3xl font-bold text-slate-800">
            {new Set(products.map((product) => product.category)).size}
          </h2>
          <p className="mt-2 text-sm text-blue-600">Kategori produk</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Nilai Seluruh Produk</p>
          <h2 className="mt-3 break-words text-2xl font-bold text-slate-800">
            {formatPrice(
              products.reduce(
                (total, product) => total + Number(product.price || 0),
                0
              )
            )}
          </h2>
          <p className="mt-2 text-sm text-blue-600">Total harga produk</p>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 p-6">
          <h2 className="text-lg font-semibold text-slate-800">Daftar Produk</h2>
          <p className="mt-1 text-sm text-slate-500">
            Tambah, edit, atau hapus produk dari daftar ini.
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[750px] text-left">
            <thead className="bg-slate-50">
              <tr className="text-sm text-slate-500">
                <th className="px-6 py-4 font-medium">Produk</th>
                <th className="px-6 py-4 font-medium">Kategori</th>
                <th className="px-6 py-4 font-medium">Harga</th>
                <th className="px-6 py-4 text-center font-medium">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {products.map((product) => (
                <tr
                  key={product.id}
                  className="transition hover:bg-slate-50"
                >

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-blue-50">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-full w-full object-contain p-1"
                          onError={(event) => {
                            event.currentTarget.style.display = 'none'
                          }}
                        />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-800">{product.name}</p>
                        <p className="mt-1 text-xs text-slate-400">ID: {product.id}</p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                      {product.category}
                    </span>
                  </td>

                  <td className="px-6 py-4 font-medium text-slate-700">
                    {formatPrice(product.price)}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleEditProduct(product)}
                        className="rounded-lg bg-blue-50 px-3 py-2 text-sm font-medium text-blue-600 transition hover:bg-blue-100">
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteProduct(product)}
                        className="rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-100">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {products.length === 0 && (
                <tr>
                  <td colSpan="4" className="px-6 py-16 text-center">
                    <div className="text-4xl">📦</div>
                    <p className="mt-3 font-semibold text-slate-700">Belum ada produk</p>
                    <p className="mt-1 text-sm text-slate-500">
                      Klik tombol Tambah Produk untuk menambahkan produk baru.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-40 flex items-center justify-center overflow-y-auto bg-black/50 p-4">
          <div className="my-auto w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-800">
                  {editingProduct ? 'Edit Produk' : 'Tambah Produk'}
                </h2>
                <p className="mt-1 text-sm text-slate-500">Lengkapi informasi produk di bawah ini.</p>
              </div>
              <button
                type="button"
                onClick={handleCloseForm}
                aria-label="Tutup form"
                className="rounded-lg px-3 py-1 text-2xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              >
                ×
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="productName"
                  className="mb-2 block text-sm font-medium text-slate-700">Nama Produk
                </label>
                <input
                  id="productName"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Masukkan nama produk"
                  required
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label
                  htmlFor="productCategory"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Kategori
                </label>
                <select
                  id="productCategory"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="Electronics">Electronics</option>
                  <option value="Accessories">Accessories</option>
                  <option value="Fashion">Fashion</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="productPrice"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Harga (Rp)
                </label>
                <input
                  id="productPrice"
                  name="price"
                  type="number"
                  min="0"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="Contoh: 410000"
                  required
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label
                  htmlFor="productImage"
                  className="mb-2 block text-sm font-medium text-slate-700">Path Gambar
                </label>
                <input
                  id="productImage"
                  name="image"
                  type="text"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="/products/headphone.jpg"
                  required
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
                <p className="mt-2 text-xs text-slate-400">
                  Contoh: /products/headphone.jpg
                </p>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleCloseForm}
                  className="flex-1 rounded-xl border border-slate-200 px-4 py-3 font-semibold text-slate-600 transition hover:bg-slate-100"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700"
                >
                  {editingProduct ? 'Simpan Perubahan' : 'Tambah Produk'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {productToDelete && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setProductToDelete(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-modal-title"
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >

            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.8}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 7h12M9 7V4h6v3m-7 0 1 13h6l1-13M10 11v5m4-5v5"
                />
              </svg>
            </div>

            <h2
              id="delete-modal-title"
              className="text-center text-xl font-bold text-slate-800"
            >
              Hapus Produk?
            </h2>
            <p className="mt-3 text-center text-sm leading-6 text-slate-500">
              Apakah kamu yakin ingin menghapus produk{' '}
              <span className="font-semibold text-slate-800">
                "{productToDelete.name}"
              </span>
              ? Tindakan ini tidak dapat dibatalkan.
            </p>

            <div className="mt-5 flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-white">
                <img
                  src={productToDelete.image}
                  alt={productToDelete.name}
                  className="h-full w-full object-contain p-1"
                  onError={(event) => {
                    event.currentTarget.style.display = 'none'
                  }}
                />
              </div>
              <div className="min-w-0">
                <p className="truncate font-semibold text-slate-800">
                  {productToDelete.name}
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  {formatPrice(productToDelete.price)}
                </p>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => setProductToDelete(null)}
                className="flex-1 rounded-xl border border-slate-200 px-4 py-3 font-semibold text-slate-600 transition hover:bg-slate-100"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={confirmDeleteProduct}
                className="flex-1 rounded-xl bg-red-600 px-4 py-3 font-semibold text-white transition hover:bg-red-700"
              >
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
export default AdminProducts
