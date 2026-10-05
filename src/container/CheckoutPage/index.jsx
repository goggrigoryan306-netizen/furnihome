import {
  useEffect,
  useState,
} from "react";

import {
  Link,
  useNavigate,
} from "react-router";

import { useCart } from "../../context/CartContext";

import "./style.css";


const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000";


export const CheckoutPage = () => {
  const navigate =
    useNavigate();

  const {
    cart,
    cartTotal,
    clearCart,
  } = useCart();


  const [form, setForm] =
    useState({
      name: "",
      surname: "",
      phone: "",
      city: "",
      address: "",
      comment: "",
      paymentMethod:
        "cash",
    });


  const [loading, setLoading] =
    useState(false);

  const [message, setMessage] =
    useState("");


  // =========================
  // PROTECT PAGE
  // =========================

  useEffect(() => {
    const token =
      localStorage.getItem(
        "token"
      );

    if (!token) {
      navigate("/login");
      return;
    }

    if (cart.length === 0) {
      navigate("/cart");
    }
  }, [
    cart.length,
    navigate,
  ]);


  // =========================
  // INPUT CHANGE
  // =========================

  const handleChange = (e) => {
    const {
      name,
      value,
    } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  // =========================
  // CREATE ORDER
  // =========================

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      setMessage("");


      if (
        !form.name.trim() ||
        !form.surname.trim() ||
        !form.phone.trim() ||
        !form.city.trim() ||
        !form.address.trim()
      ) {
        setMessage(
          "Լրացրեք պարտադիր դաշտերը"
        );

        return;
      }


      try {
        setLoading(true);

        const token =
          localStorage.getItem(
            "token"
          );


        const response =
          await fetch(
            `${API_URL}/api/orders`,
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",

                Authorization:
                  `Bearer ${token}`,
              },

              body:
                JSON.stringify({
                  customer: {
                    name:
                      form.name.trim(),

                    surname:
                      form.surname.trim(),

                    phone:
                      form.phone.trim(),

                    city:
                      form.city.trim(),

                    address:
                      form.address.trim(),
                  },

                  comment:
                    form.comment.trim(),

                  paymentMethod:
                    form.paymentMethod,

                  items:
                    cart.map(
                      (item) => ({
                        product:
                          item._id,

                        title:
                          item.title,

                        image:
                          item.image,

                        price:
                          Number(
                            item.price
                          ),

                        quantity:
                          item.quantity,

                        selectedColor:
                          item.selectedColor ||
                          "",
                      })
                    ),
                }),
            }
          );


        const data =
          await response.json();


        if (!response.ok) {
          throw new Error(
            data.message ||
              "Չհաջողվեց կատարել պատվերը"
          );
        }


        clearCart();


        navigate(
          "/order-success",
          {
            state: {
              orderId:
                data.order?._id,
            },
          }
        );

      } catch (error) {
        console.log(
          "Order error:",
          error
        );

        setMessage(
          error.message ||
            "Տեղի ունեցավ սխալ"
        );

      } finally {
        setLoading(false);
      }
    };


  if (cart.length === 0) {
    return null;
  }


  return (
    <div className="checkout-page">

      <div className="checkout-header">

        <p>
          CHECKOUT
        </p>

        <h1>
          Պատվերի ձևակերպում
        </h1>

        <span>
          Լրացրեք առաքման տվյալները
        </span>

      </div>


      <div className="checkout-layout">


        {/* LEFT */}

        <form
          className="checkout-form"
          onSubmit={
            handleSubmit
          }
        >

          <div className="checkout-section">

            <p className="checkout-label">
              CUSTOMER INFORMATION
            </p>

            <h2>
              Անձնական տվյալներ
            </h2>


            <div className="checkout-row">

              <div className="checkout-input">

                <label>
                  Անուն *
                </label>

                <input
                  type="text"
                  name="name"
                  value={
                    form.name
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Անուն"
                />

              </div>


              <div className="checkout-input">

                <label>
                  Ազգանուն *
                </label>

                <input
                  type="text"
                  name="surname"
                  value={
                    form.surname
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Ազգանուն"
                />

              </div>

            </div>


            <div className="checkout-input">

              <label>
                Հեռախոսահամար *
              </label>

              <input
                type="tel"
                name="phone"
                value={
                  form.phone
                }
                onChange={
                  handleChange
                }
                placeholder="+374 00 000 000"
              />

            </div>

          </div>


          <div className="checkout-section">

            <p className="checkout-label">
              DELIVERY
            </p>

            <h2>
              Առաքման տվյալներ
            </h2>


            <div className="checkout-input">

              <label>
                Քաղաք *
              </label>

              <input
                type="text"
                name="city"
                value={
                  form.city
                }
                onChange={
                  handleChange
                }
                placeholder="Երևան"
              />

            </div>


            <div className="checkout-input">

              <label>
                Հասցե *
              </label>

              <input
                type="text"
                name="address"
                value={
                  form.address
                }
                onChange={
                  handleChange
                }
                placeholder="Փողոց, շենք, բնակարան"
              />

            </div>


            <div className="checkout-input">

              <label>
                Մեկնաբանություն
              </label>

              <textarea
                name="comment"
                value={
                  form.comment
                }
                onChange={
                  handleChange
                }
                placeholder="Լրացուցիչ տեղեկություն..."
                rows="4"
              />

            </div>

          </div>


          <div className="checkout-section">

            <p className="checkout-label">
              PAYMENT
            </p>

            <h2>
              Վճարման եղանակ
            </h2>


            <label className="payment-option">

              <input
                type="radio"
                name="paymentMethod"
                value="cash"
                checked={
                  form.paymentMethod ===
                  "cash"
                }
                onChange={
                  handleChange
                }
              />

              <div>

                <strong>
                  Վճարում առաքման ժամանակ
                </strong>

                <span>
                  Կանխիկ կամ POS տերմինալ
                </span>

              </div>

            </label>

          </div>


          {message && (

            <div className="checkout-error">
              {message}
            </div>

          )}


          <button
            type="submit"
            className="checkout-submit"
            disabled={loading}
          >

            {loading
              ? "Պատվերը կատարվում է..."
              : "Հաստատել պատվերը"}

          </button>

        </form>


        {/* RIGHT */}

        <aside className="checkout-summary">

          <p className="checkout-label">
            YOUR ORDER
          </p>

          <h2>
            Ձեր պատվերը
          </h2>


          <div className="checkout-products">

            {cart.map(
              (item) => (

                <div
                  className="checkout-product"
                  key={`${item.id}-${item.selectedColor || ""}`}
                >

                  <img
                    src={
                      item.image
                    }
                    alt={
                      item.title
                    }
                  />


                  <div>

                    <strong>
                      {item.title}
                    </strong>

                    {item.selectedColor && (

                      <span>
                        Գույն՝{" "}
                        {item.selectedColor}
                      </span>

                    )}

                    <span>
                      {item.quantity} հատ
                    </span>

                  </div>


                  <b>

                    {(
                      Number(
                        item.price
                      ) *
                      item.quantity
                    ).toLocaleString(
                      "hy-AM"
                    )}{" "}
                    ֏

                  </b>

                </div>

              )
            )}

          </div>


          <div className="checkout-summary-row">

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


          <div className="checkout-summary-row">

            <span>
              Առաքում
            </span>

            <strong>
              Անվճար
            </strong>

          </div>


          <div className="checkout-total">

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


          <Link
            to="/cart"
            className="back-to-cart"
          >
            ← Վերադառնալ զամբյուղ
          </Link>

        </aside>

      </div>

    </div>
  );
};