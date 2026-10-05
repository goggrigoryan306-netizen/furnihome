import { Link } from "react-router";
import { useWishlist } from "../../context/WishlistContext";
import "./style.css";

export const MyWishlistPage = () => {
  const {
    wishlist,
    removeFromWishlist,
  } = useWishlist();

  return (
    <main className="wishlist-page">

      <section className="wishlist-hero">
        <p>MY FAVORITES</p>
        <h1>Պահպանած ապրանքներ</h1>

        <span>
          Այստեղ կարող եք գտնել Ձեր նախընտրած կահույքը։
        </span>
      </section>

      <section className="wishlist-container">

        <div className="wishlist-header">
          <h2>Իմ պահպանածները</h2>

          <span>
            {wishlist.length} ապրանք
          </span>
        </div>

        {wishlist.length === 0 ? (

          <div className="wishlist-empty">

            <h2>Դեռ պահպանած ապրանքներ չկան</h2>

            <p>
              Ընտրեք Ձեզ դուր եկած ապրանքները և
              սեղմեք սրտիկի նշանի վրա։
            </p>

            <Link
              to="/shop"
              className="wishlist-shop-btn"
            >
              Գնալ խանութ →
            </Link>

          </div>

        ) : (

          <div className="wishlist-grid">

            {wishlist.map((product) => (

              <article
                className="wishlist-card"
                key={product.id}
              >

                <Link to={`/product/${product.id}`}>

                  <div className="wishlist-image">

                    <img
                      src={product.image}
                      alt={product.title}
                    />

                    <button
                      className="wishlist-remove"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();

                        removeFromWishlist(product.id);
                      }}
                    >
                      ♥
                    </button>

                  </div>

                  <div className="wishlist-content">

                    <p>
                      {product.category}
                    </p>

                    <h3>
                      {product.title}
                    </h3>

                    <div className="wishlist-price">

                      <strong>
                        {product.price.toLocaleString()} ֏
                      </strong>

                      {product.oldPrice && (
                        <del>
                          {product.oldPrice.toLocaleString()} ֏
                        </del>
                      )}

                    </div>

                  </div>

                </Link>

              </article>

            ))}

          </div>

        )}

      </section>

    </main>
  );
};