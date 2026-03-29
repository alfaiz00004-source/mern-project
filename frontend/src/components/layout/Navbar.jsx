import { useState, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";


function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const getNavLinkClass = ({ isActive }) =>
    `text-gray-700 hover:text-indigo-600 font-medium transition duration-200 ${
      isActive ? "text-indigo-600" : ""
    }`;
  const getMobileNavLinkClass = ({ isActive }) =>
    `block text-gray-700 hover:text-indigo-600 font-medium transition duration-200 ${
      isActive ? "text-indigo-600" : ""
    }`;

  return (
    <nav className="bg-white shadow-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Logo / Brand */}
          <div className="shrink-0">
            <Link to="/home" className="text-xl font-bold text-indigo-600">
              Product Hub
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 items-center">
            <NavLink to="/home" className={getNavLinkClass}>
              Home
            </NavLink>
            <NavLink to="/products" className={getNavLinkClass}>
              Products
            </NavLink>
            

            {user ? (
              <div className="flex items-center space-x-4">
                <NavLink to="/profile" className={getNavLinkClass}>
                  Profile
                </NavLink>
                <button
                  onClick={logout}
                  className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-lg transition duration-200"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <NavLink to="/login" className={getNavLinkClass}>
                  Login
                </NavLink>
                <NavLink to="/register" className={getNavLinkClass}>
                  Register
                </NavLink>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-700 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 rounded-md"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pt-2 pb-4 space-y-2 bg-white border-t border-gray-200">
          <NavLink to="/home" className={getMobileNavLinkClass}>
            Home
          </NavLink>
          <NavLink to="/products" className={getMobileNavLinkClass}>
            Products
          </NavLink>
          

          {user ? (
            <>
              <NavLink to="/profile" className={getMobileNavLinkClass}>
                Profile
              </NavLink>
              <button
                onClick={logout}
                className="w-full px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-lg transition duration-200"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={getMobileNavLinkClass}>
                Login
              </NavLink>
              <NavLink to="/register" className={getMobileNavLinkClass}>
                Register
              </NavLink>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
