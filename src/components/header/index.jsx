import {
  Link,
  NavLink,
  useNavigate,
} from "react-router";

import { useState } from "react";

import { useCart } from "../../context/CartContext";

import {
  HiOutlineUserAdd,
} from "react-icons/hi";

import {
  FiUser,
  FiLogOut,
  FiHeart,
  FiShoppingCart,
} from "react-icons/fi";

import { IoIosSearch } from "react-icons/io";

import "./style.css";

export const MyHeader = () => {
  const { cartCount } = useCart();

  const navigate = useNavigate();

  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const token = localStorage.getItem("token");

  const handleSearch = (e) => {
    e.preventDefault();

    const value = search.trim();

    if (value) {
      navigate(
        `/products?search=${encodeURIComponent(value)}`
      );

      setSearchOpen(false);
      setMenuOpen(false);
      setSearch("");
    }
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");

    setMenuOpen(false);

    navigate("/login");

    window.location.reload();
  };

  return (
    <header className="main-header">
      <div className="header-container">

        {/* LOGO */}

        <Link
          to="/"
          className="main-logo"
          onClick={closeMenu}
        >
          Furni<span>Home</span>
        </Link>


        {/* DESKTOP NAVIGATION */}

        <nav className="main-navigation">

          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "nav-link active"
                : "nav-link"
            }
          >
            Գլխավոր
          </NavLink>


          <NavLink
            to="/products"
            className={({ isActive }) =>
              isActive
                ? "nav-link active"
                : "nav-link"
            }
          >
            Տեսականի
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive
                ? "nav-link active"
                : "nav-link"
            }
          >
            Մեր մասին
          </NavLink>

          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive
                ? "nav-link active"
                : "nav-link"
            }
          >
            Կապ
          </NavLink>

          <NavLink
            to="/reviews"
            className={({ isActive }) =>
              isActive
                ? "nav-link active"
                : "nav-link"
            }
          >
            Կարծիքներ
          </NavLink>

        </nav>


        {/* HEADER ACTIONS */}

        <div className="header-actions">

          {/* SEARCH INPUT */}

          {searchOpen && (
            <form
              className="search-form"
              onSubmit={handleSearch}
            >
              <input
                type="text"
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Փնտրել ապրանք..."
                autoFocus
              />
            </form>
          )}


          {/* SEARCH */}

          <button
            type="button"
            className="header-icon"
            onClick={() =>
              setSearchOpen(!searchOpen)
            }
            title="Որոնել"
          >
            <IoIosSearch />
          </button>


          {/* REGISTER OR PROFILE */}

          {!token ? (
            <Link
              to="/register"
              className="header-icon"
              title="Գրանցվել"
            >
              <HiOutlineUserAdd />
            </Link>
          ) : (
            <>
              <Link
                to="/settings"
                className="header-icon"
                title="Իմ հաշիվը"
              >
                <FiUser />
              </Link>

              <button
                type="button"
                className="header-icon"
                onClick={handleLogout}
                title="Դուրս գալ"
              >
                <FiLogOut />
              </button>
            </>
          )}


          {/* WISHLIST */}

          <Link
            className="header-icon"
            to="/wishlist"
            title="Նախընտրածներ"
          >
            <FiHeart />
          </Link>


          {/* CART */}

          <Link
            to="/cart"
            className="header-icon header-cart"
            title="Զամբյուղ"
          >
            <FiShoppingCart />

            {cartCount > 0 && (
              <span className="cart-count">
                {cartCount}
              </span>
            )}
          </Link>


          {/* MOBILE MENU BUTTON */}

          <button
            type="button"
            className="menu-button"
            onClick={() =>
              setMenuOpen(!menuOpen)
            }
          >
            {menuOpen ? "✕" : "☰"}
          </button>

        </div>

      </div>


      {/* MOBILE NAVIGATION */}

      {menuOpen && (
        <nav className="mobile-navigation">

          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "mobile-nav-link active"
                : "mobile-nav-link"
            }
            onClick={closeMenu}
          >
            Գլխավոր
          </NavLink>

          <NavLink
            to="/shop"
            className={({ isActive }) =>
              isActive
                ? "mobile-nav-link active"
                : "mobile-nav-link"
            }
            onClick={closeMenu}
          >
            Խանութ
          </NavLink>

          <NavLink
            to="/products"
            className={({ isActive }) =>
              isActive
                ? "mobile-nav-link active"
                : "mobile-nav-link"
            }
            onClick={closeMenu}
          >
            Տեսականի
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive
                ? "mobile-nav-link active"
                : "mobile-nav-link"
            }
            onClick={closeMenu}
          >
            Մեր մասին
          </NavLink>

          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive
                ? "mobile-nav-link active"
                : "mobile-nav-link"
            }
            onClick={closeMenu}
          >
            Կապ
          </NavLink>

          <NavLink
            to="/reviews"
            className={({ isActive }) =>
              isActive
                ? "mobile-nav-link active"
                : "mobile-nav-link"
            }
            onClick={closeMenu}
          >
            Կարծիքներ
          </NavLink>


          {/* MOBILE AUTH */}

          {!token ? (
            <Link
              to="/register"
              className="mobile-nav-link"
              onClick={closeMenu}
            >
              Գրանցվել
            </Link>
          ) : (
            <>
              <Link
                to="/settings"
                className="mobile-nav-link"
                onClick={closeMenu}
              >
                Իմ հաշիվը
              </Link>

              <button
                type="button"
                className="mobile-nav-link logout-mobile"
                onClick={handleLogout}
              >
                Դուրս գալ
              </button>
            </>
          )}

        </nav>
      )}

    </header>
  );
};