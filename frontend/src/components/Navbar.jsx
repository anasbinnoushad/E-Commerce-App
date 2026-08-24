import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  return (
    <div className="bg-black text-white p-4 flex justify-between items-center">
      <Link to="/">
        <h1 className="font-bold text-2xl">E-Commerce</h1>
      </Link>
      <div className="space-x-5 flex items-center">
        {!user && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
        {user && (
          <>
            <span>{user.username}</span>
            {user.role === "customer" && (
              <Link to="/customer-dashboard">Dashboard</Link>
            )}
            {user.role === "merchant" && (
              <>
                <Link to="/merchant-dashboard">Dashboard</Link>
                <Link to="/merchant-products">Manage Products</Link>
              </>
            )}
            {user.role === "admin" && (
              <Link to="/admin-dashboard">Dashboard</Link>
            )}
            <Link to="/cart">Cart</Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 px-3 py-1 rounded text-white"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
}
export default Navbar;