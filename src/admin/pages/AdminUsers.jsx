
import { useState } from 'react'

function AdminUsers() {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'Andi Saputra',
      email: 'andi@email.com',
      role: 'Customer',
      status: 'Active',
    },
    {
      id: 2,
      name: 'Budi Santoso',
      email: 'budi@email.com',
      role: 'Customer',
      status: 'Active',
    },
    {
      id: 3,
      name: 'Citra Dewi',
      email: 'citra@email.com',
      role: 'Customer',
      status: 'Inactive',
    },
    {
      id: 4,
      name: 'Dimas Pratama',
      email: 'dimas@email.com',
      role: 'Admin',
      status: 'Active',
    },
  ])

  const [showForm, setShowForm] = useState(false)
  const [editingUser, setEditingUser] = useState(null)
  const [error, setError] = useState('')

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'Customer',
    status: 'Active',
  })

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData((current) => ({
      ...current,
      [name]: value,
    }))

    setError('')
  }

  const handleAddUser = () => {
    setEditingUser(null)

    setFormData({
      name: '',
      email: '',
      role: 'Customer',
      status: 'Active',
    })

    setError('')
    setShowForm(true)
  }

  const handleEditUser = (user) => {
    setEditingUser(user)

    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
    })

    setError('')
    setShowForm(true)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!formData.name.trim() || !formData.email.trim()) {
      setError('Name and email are required.')
      return
    }

    const emailExists = users.some(
      (user) =>
        user.email.toLowerCase() ===
          formData.email.trim().toLowerCase() &&
        user.id !== editingUser?.id
    )

    if (emailExists) {
      setError('This email is already registered.')
      return
    }

    if (editingUser) {
      setUsers((currentUsers) =>
        currentUsers.map((user) =>
          user.id === editingUser.id
            ? {
                ...user,
                name: formData.name.trim(),
                email: formData.email.trim(),
                role: formData.role,
                status: formData.status,
              }
            : user
        )
      )
    } else {
      const newUser = {
        id:
          users.length > 0
            ? Math.max(...users.map((user) => user.id)) + 1
            : 1,
        name: formData.name.trim(),
        email: formData.email.trim(),
        role: formData.role,
        status: formData.status,
      }

      setUsers((currentUsers) => [...currentUsers, newUser])
    }

    setShowForm(false)
    setEditingUser(null)
    setError('')
  }

  const handleDeleteUser = (id) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this user?'
    )

    if (!confirmed) return

    setUsers((currentUsers) =>
      currentUsers.filter((user) => user.id !== id)
    )
  }

  return (
    <div>
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-bold text-blue-950">
            Users
          </h2>

          <p className="text-gray-500 mt-1">
            Manage users registered at SHOP
          </p>
        </div>

        <button
          onClick={handleAddUser}
          className="bg-blue-900 text-white px-5 py-3 rounded-lg font-semibold hover:bg-blue-800 transition"
        >
          + Add User
        </button>
      </div>

      {/* SUMMARY */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <p className="text-sm text-gray-500">Total Users</p>
          <p className="text-3xl font-bold text-blue-950 mt-2">
            {users.length}
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <p className="text-sm text-gray-500">Active Users</p>
          <p className="text-3xl font-bold text-green-600 mt-2">
            {users.filter((user) => user.status === 'Active').length}
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <p className="text-sm text-gray-500">Administrators</p>
          <p className="text-3xl font-bold text-blue-900 mt-2">
            {users.filter((user) => user.role === 'Admin').length}
          </p>
        </div>
      </div>

      {/* ADD / EDIT FORM */}
      {showForm && (
        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8">
          <h3 className="text-xl font-bold text-blue-950 mb-6">
            {editingUser ? 'Edit User' : 'Add New User'}
          </h3>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter full name"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter email address"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Role
                </label>

                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Customer">Customer</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Status
                </label>

                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>

            {error && (
              <p className="mt-4 text-sm text-red-600">
                {error}
              </p>
            )}

            <div className="flex gap-3 mt-6">
              <button
                type="submit"
                className="bg-blue-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition"
              >
                {editingUser ? 'Save Changes' : 'Add User'}
              </button>

              <button
                type="button"
                onClick={() => {
                  setShowForm(false)
                  setEditingUser(null)
                  setError('')
                }}
                className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* USER TABLE */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-xl font-bold text-blue-950">
            User List
          </h3>

          <p className="text-sm text-gray-500 mt-1">
            {users.length} users registered
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                  User
                </th>

                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                  Role
                </th>

                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                  Status
                </th>

                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="border-t border-gray-100"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-900 flex items-center justify-center font-bold shrink-0">
                        {user.name.charAt(0).toUpperCase()}
                      </div>

                      <div>
                        <p className="font-semibold text-blue-950">
                          {user.name}
                        </p>

                        <p className="text-sm text-gray-500">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        user.role === 'Admin'
                          ? 'bg-purple-100 text-purple-700'
                          : 'bg-blue-100 text-blue-700'
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        user.status === 'Active'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditUser(user)}
                        className="px-3 py-2 border border-blue-900 text-blue-900 rounded-lg text-sm font-semibold hover:bg-blue-50 transition"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="px-3 py-2 bg-red-500 text-white rounded-lg text-sm font-semibold hover:bg-red-600 transition"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td
                    colSpan="4"
                    className="px-6 py-12 text-center text-gray-500">No users found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AdminUsers
