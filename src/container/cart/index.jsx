import { useCart } from "../../context/CartContext";

import {
  Link,
  useNavigate,
} from "react-router";

import "./style.css";


export const MyCartPage = () => {
  const navigate = useNavigate();

  const {
    cart,
    cartTotal,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  } = useCart();


  const handleCheckout = () => {
    const token =
      localStorage.getItem("token");

    // եթե user-ը login չէ
    if (!token) {
      navigate("/login", {
        state: {
          from: "/cart",
          message:
            "Պատվեր կատարելու համար մուտք գործեք",
        },
      });

      return;
    }

    // եթե login է
    navigate("/checkout");
  };


  if (cart.length === 0) {
    return (
      <div className="empty-cart">

        <div className="empty-cart-icon">
          🛒
        </div>

        <h1>
          Ձեր զամբյուղը դատարկ է
        </h1>

        <p>
          Դուք դեռ որևէ ապրանք չեք ավելացրել։
        </p>

        <Link to="/">
          ← Շարունակել գնումները
        </Link>

      </div>
    );
  }


  return (
    <div className="cart-page">

      <div className="cart-title">

        <p>
          SHOPPING CART
        </p>

        <h1>
          Ձեր զամբյուղը
        </h1>

        <span>
          {cart.length} տեսակի ապրանք
        </span>

      </div>


      <div className="cart-layout">

        {/* LEFT */}

        <div className="cart-products">

          <div className="cart-products-header">

            <h2>
              Ապրանքներ
            </h2>

            <button
              type="button"
              onClick={clearCart}
            >
              Մաքրել զամբյուղը
            </button>

          </div>


          {cart.map((item) => (

            <div
              className="cart-item"
              key={`${item.id}-${item.selectedColor || ""}`}
            >

              <Link
                to={`/product/${item.id}`}
                className="cart-item-image"
              >

                <img
                  src={item.image}
                  alt={item.title}
                />

              </Link>


              <div className="cart-item-info">

                <p>
                  {item.category}
                </p>

                <Link
                  to={`/product/${item.id}`}
                >
                  <h3>
                    {item.title}
                  </h3>
                </Link>


                {item.selectedColor && (

                  <small>
                    Գույն՝{" "}
                    <strong>
                      {item.selectedColor}
                    </strong>
                  </small>

                )}


                <strong>
                  {Number(
                    item.price
                  ).toLocaleString(
                    "hy-AM"
                  )}{" "}
                  ֏
                </strong>

              </div>


              <div className="cart-quantity">

                <button
                  type="button"
                  onClick={() =>
                    decreaseQuantity(
                      item.id
                    )
                  }
                >
                  −
                </button>

                <span>
                  {item.quantity}
                </span>

                <button
                  type="button"
                  onClick={() =>
                    increaseQuantity(
                      item.id
                    )
                  }
                >
                  +
                </button>

              </div>


              <div className="cart-item-total">

                <span>
                  Ընդհանուր
                </span>

                <strong>

                  {(
                    Number(
                      item.price
                    ) *
                    item.quantity
                  ).toLocaleString(
                    "hy-AM"
                  )}{" "}
                  ֏

                </strong>

              </div>


              <button
                type="button"
                className="remove-cart-item"
                onClick={() =>
                  removeFromCart(
                    item.id
                  )
                }
              >
                ×
              </button>

            </div>

          ))}


          <Link
            to="/"
            className="continue-shopping"
          >
            ← Շարունակել գնումները
          </Link>

        </div>


        {/* RIGHT */}

        <aside className="cart-summary">

          <p className="summary-small">
            ORDER SUMMARY
          </p>

          <h2>
            Պատվերի ամփոփում
          </h2>


          <div className="summary-row">

            <span>
              Ապրանքներ
            </span>

            <strong>
              {cartTotal.toLocaleString(
                "hy-AM"
              )}{" "}
              ֏
            </strong>

          </div>


          <div className="summary-row">

            <span>
              Առաքում
            </span>

            <strong>
              Անվճար
            </strong>

          </div>


          <div className="summary-divider" />


          <div className="summary-total">

            <span>
              Ընդհանուր
            </span>

            <strong>
              {cartTotal.toLocaleString(
                "hy-AM"
              )}{" "}
              ֏
            </strong>

          </div>


          <button
            type="button"
            className="checkout-btn"
            onClick={handleCheckout}
          >
            Շարունակել պատվերը
            <span>→</span>
          </button>


          <div className="cart-secure">
            🔒 Անվտանգ գնում
          </div>

        </aside>

      </div>

    </div>
  );
};