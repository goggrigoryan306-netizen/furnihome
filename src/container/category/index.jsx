import {
  Link,
  useParams,
} from "react-router";

import {
  useEffect,
  useState,
} from "react";

import "./style.css";


const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000";


const categoryNames = {
  sofas: "Բազմոցներ",
  bedroom: "Ննջասենյակ",
  tables: "Սեղաններ",
  chairs: "Աթոռներ",
};


export const MyCategoryPage = () => {

  const { category } = useParams();

  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");


  const categoryTitle =
    categoryNames[category] || "Ապրանքներ";


  // GET PRODUCTS FROM SERVER

  useEffect(() => {

    const getProducts = async () => {

      try {

        setLoading(true);

        const response = await fetch(
          `${API_URL}/api/products`
        );

        const data = await response.json();


        if (!response.ok) {
          throw new Error(
            data.message ||
            "Չհաջողվեց ստանալ ապրանքները"
          );
        }


        setProducts(data);

      } catch (error) {

        console.log(error);

        setError(error.message);

      } finally {

        setLoading(false);

      }

    };


    getProducts();

  }, []);


  // FILTER BY CATEGORY

  const filteredProducts = products.filter(
  (product) =>
    product.categorySlug === category
);


  if (loading) {
    return (
      <div className="category-page">

        <div
          style={{
            padding: "100px 20px",
            textAlign: "center",
          }}
        >
          <h2>
            Բեռնվում է...
          </h2>
        </div>

      </div>
    );
  }


  if (error) {
    return (
      <div className="category-page">

        <div
          style={{
            padding: "100px 20px",
            textAlign: "center",
          }}
        >
          <h2>
            Սխալ
          </h2>

          <p>
            {error}
          </p>
        </div>

      </div>
    );
  }


  return (
    <div className="category-page">

      <section className="category-hero">

        <p>
          FURNIHOME
        </p>

        <h1>
          {categoryTitle}
        </h1>

        <span>
          Գտնվել է {filteredProducts.length} ապրանք
        </span>

      </section>


      <div className="category-container">

        <div className="category-top">

          <div>

            <p className="category-small">
              ՄԵՐ ՏԵՍԱԿԱՆԻՆ
            </p>

            <h2>
              {categoryTitle}
            </h2>

          </div>


          <Link
            to="/"
            className="back-home"
          >
            ← Գլխավոր էջ
          </Link>

        </div>


        {filteredProducts.length > 0 ? (

          <div className="category-products-grid">

            {filteredProducts.map((product) => (

              <article
                className="category-product-card"
                key={product._id}
              >

                <Link
                  to={`/product/${product._id}`}
                >

                  <div className="category-product-image">

                    <img
                      src={product.image}
                      alt={product.title}
                    />


                    {product.badge && (

                      <span className="category-product-badge">
                        {product.badge}
                      </span>

                    )}

                  </div>


                  <div className="category-product-info">

                    <p className="product-category-name">
                      {product.category}
                    </p>


                    <h3>
                      {product.title}
                    </h3>


                    <p className="product-description">
                      {product.description}
                    </p>


                    <div className="category-product-bottom">

                      <div className="category-price">

                        <strong>
                          {Number(
                            product.price
                          ).toLocaleString()} ֏
                        </strong>


                        {product.oldPrice && (

                          <del>
                            {Number(
                              product.oldPrice
                            ).toLocaleString()} ֏
                          </del>

                        )}

                      </div>


                      <span className="product-arrow">
                        →
                      </span>

                    </div>

                  </div>

                </Link>

              </article>

            ))}

          </div>

        ) : (

          <div className="no-products">

            <h2>
              Ապրանքներ չեն գտնվել
            </h2>

            <Link to="/">
              Վերադառնալ գլխավոր էջ
            </Link>

          </div>

        )}

      </div>

    </div>
  );
};