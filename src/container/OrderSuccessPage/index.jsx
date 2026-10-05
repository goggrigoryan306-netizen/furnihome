import {
  Link,
  useLocation,
} from "react-router";

import "./style.css";


export const OrderSuccessPage =
  () => {
    const location =
      useLocation();

    const orderId =
      location.state
        ?.orderId;


    return (
      <div className="order-success">

        <div className="order-success-icon">
          ✓
        </div>

        <p>
          ORDER CONFIRMED
        </p>

        <h1>
          Շնորհակալություն պատվերի համար
        </h1>

        <span>
          Ձեր պատվերը հաջողությամբ
          գրանցվել է։
        </span>


        {orderId && (

          <small>
            Պատվերի համար՝{" "}
            {orderId}
          </small>

        )}


        <Link to="/">
          Շարունակել գնումները
        </Link>

      </div>
    );
  };