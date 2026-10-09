function AdminNavbar() {
  return (
    <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-8">
      <div>
        <h1 className="text-xl font-bold text-blue-950">Admin Panel</h1>
        <p className="text-sm text-gray-500">Manage your SHOP</p>
      </div>

      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-blue-900 text-white flex items-center justify-center font-bold">
          A
        </div>
        <div className="hidden sm:block">
          <p className="font-semibold text-blue-950">Bagus</p>
          <p className="text-xs text-gray-500">Administrator</p>
        </div>
      </div>
    </header>
  )
}
export default AdminNavbar