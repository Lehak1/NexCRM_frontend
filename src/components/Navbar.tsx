import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { useAuth0 } from "@auth0/auth0-react"
import {
  Menu,
  X,
  LayoutDashboard,
  Send,
  Users,
  Database,
  LogOut
} from "lucide-react"

const Navbar = () => {
  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0()
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  const navLinks = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Customers", href: "/customers", icon: LayoutDashboard },
    { name: "Campaigns", href: "/campaign/history", icon: Send },
    { name: "Segments", href: "/segments/new", icon: Users },
    { name: "Orders", href: "/orders", icon: Database },
  ]

  const toggleMobile = () => setMobileOpen((prev) => !prev)

  const isActive = (path: string) => location.pathname === path

  return (
    <header className="sticky top-0 z-50 border-b bg-white shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-blue-600 font-bold text-xl">
          <Database className="h-6 w-6" />
          NexCRM
        </Link>

        {/* Desktop Navigation (only if authenticated) */}
        {isAuthenticated && (
          <nav className="hidden md:flex gap-6">
            {navLinks.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                  isActive(item.href) ? "text-blue-600" : "text-gray-600 hover:text-blue-500"
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </Link>
            ))}
          </nav>
        )}

        {/* User Actions */}
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <Link to="/profile" className="flex items-center gap-2 text-sm font-medium text-gray-700">
                {/* Check if user is defined before accessing its properties */}
                {user?.picture ? (
                  <img src={user.picture} alt="user" className="h-8 w-8 rounded-full" />
                ) : (
                  <div className="h-8 w-8 rounded-full bg-blue-600 text-white flex items-center justify-center">
                    {user?.name?.charAt(0) || "U"}
                  </div>
                )}
                <span className="hidden md:inline">{user?.name}</span>
              </Link>
              <button
                onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
                className="text-sm bg-gray-100 px-3 py-1 rounded hover:bg-gray-200"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => loginWithRedirect()}
              className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
            >
              Login
            </button>
          )}
          <button className="md:hidden" onClick={toggleMobile}>
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileOpen && isAuthenticated && (
        <div className="md:hidden px-4 py-3 space-y-2 border-t">
          {navLinks.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-2 text-base font-medium ${
                isActive(item.href) ? "text-blue-600" : "text-gray-700"
              }`}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          ))}
          <button
            onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
            className="flex items-center gap-2 text-base font-medium text-gray-700"
          >
            <LogOut className="h-5 w-5" />
            Log out
          </button>
        </div>
      )}
    </header>
  )
}

export default Navbar
