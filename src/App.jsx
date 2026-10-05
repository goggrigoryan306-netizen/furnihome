import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router";

import { useEffect } from "react";
import "./style.css";

import { MyHomePage } from "./container/home";
import { MyContactPage } from "./container/contact";
import { MyProductPage } from "./container/product";
import { MyCartPage } from "./container/cart";

import { MyHeader } from "./components/header";
import { MyFooter } from "./components/footer";

import { CartProvider } from "./context/CartContext";
import { MyCategoryPage } from "./container/category";
import { MyProductsPage } from "./container/products";
import { MyAboutPage } from "./container/about";
import { WishlistProvider } from "./context/WishlistContext";
import { MyWishlistPage } from "./container/wishList";
import { MyRegisterPage } from "./container/register";
import { MyReviewsPage } from "./container/reviews";
import { MyDeliveryPage } from "./container/delivery";
import { MyPaymentPage } from "./container/payment";
import { MyWarrantyPage } from "./container/warranty";
import { MyReturnsPage } from "./container/returns";
import { MyFAQPage } from "./container/faq";
import { MyLoginPage } from "./container/register/MyLoginPage";
import { MySettingsPage } from "./container/settings";
import { AdminPage } from "./container/admin/AdminPage";
import { CheckoutPage } from "./container/CheckoutPage";
import { OrderSuccessPage } from "./container/OrderSuccessPage";

// =================================
// FORGOT PASSWORD
// =================================

import ForgotPassword from "./ForgotPassword";

// =================================
// RESET PASSWORD
// =================================

import ResetPassword from "./ResetPassword";


function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [pathname]);

  return null;
}


function App() {
  return (
    <WishlistProvider>
      <CartProvider>
        <Router>
          <ScrollToTop />

          <MyHeader />

          <main className="app-content">
            <Routes>

              {/* HOME */}
              <Route
                path="/"
                element={<MyHomePage />}
              />

              {/* CONTACT */}
              <Route
                path="/contact"
                element={<MyContactPage />}
              />

              {/* PRODUCT */}
              <Route
                path="/product/:id"
                element={<MyProductPage />}
              />

              {/* CART */}
              <Route
                path="/cart"
                element={<MyCartPage />}
              />

              {/* PRODUCTS */}
              <Route
                path="/products"
                element={<MyProductsPage />}
              />

              {/* ABOUT */}
              <Route
                path="/about"
                element={<MyAboutPage />}
              />

              {/* REVIEWS */}
              <Route
                path="/reviews"
                element={<MyReviewsPage />}
              />

              {/* DELIVERY */}
              <Route
                path="/delivery"
                element={<MyDeliveryPage />}
              />

              {/* PAYMENT */}
              <Route
                path="/payment"
                element={<MyPaymentPage />}
              />

              {/* WARRANTY */}
              <Route
                path="/warranty"
                element={<MyWarrantyPage />}
              />

              {/* RETURNS */}
              <Route
                path="/returns"
                element={<MyReturnsPage />}
              />

              {/* FAQ */}
              <Route
                path="/faq"
                element={<MyFAQPage />}
              />

              {/* REGISTER */}
              <Route
                path="/register"
                element={<MyRegisterPage />}
              />

              {/* CATEGORY */}
              <Route
                path="/category/:category"
                element={<MyCategoryPage />}
              />

              {/* WISHLIST */}
              <Route
                path="/wishlist"
                element={<MyWishlistPage />}
              />

              {/* LOGIN */}
              <Route
                path="/login"
                element={<MyLoginPage />}
              />

              {/* SETTINGS */}
              <Route
                path="/settings"
                element={<MySettingsPage />}
              />

              {/* ADMIN */}
              <Route
                path="/admin"
                element={<AdminPage />}
              />

              {/* CHECKOUT */}
              <Route
                path="/checkout"
                element={<CheckoutPage />}
              />

              {/* ORDER SUCCESS */}
              <Route
                path="/order-success"
                element={<OrderSuccessPage />}
              />

              {/* FORGOT PASSWORD */}
              <Route
                path="/forgot-password"
                element={<ForgotPassword />}
              />

              {/* RESET PASSWORD */}
              <Route
                path="/reset-password/:token"
                element={<ResetPassword />}
              />

            </Routes>
          </main>

          <MyFooter />

        </Router>
      </CartProvider>
    </WishlistProvider>
  );
}

export default App;