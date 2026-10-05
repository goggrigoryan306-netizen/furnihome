import {
  Link,
  useSearchParams,
} from "react-router";

import {
  useEffect,
  useState,
} from "react";

import "./style.css";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000";

export const MyProductsPage = () => {
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") || "";

  const onlyOffers = searchParams.get("offer") === "true";

  // FILTER STATES

  const [category, setCategory] = useState("all");

  const [minPrice, setMinPrice] = useState("");

  const [maxPrice, setMaxPrice] = useState("");

  const [onlyInStock, setOnlyInStock] = useState(false);

  const [onlyDiscount, setOnlyDiscount] = useState(false);

  const [sort, setSort] = useState("default");


  // GET ALL CATEGORIES

  const categories = [
    ...new Set(
      products.map((product) => product.category)
    ),
  ];

useEffect(() => {
  const loadProducts = async () => {
    try {
      const response = await fetch(
        `${API_URL}/api/products`
      );

      const data = await response.json();

      setProducts(data);
    } catch (error) {
      console.log(
        "Products error:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  loadProducts();
}, []);
  // FILTER PRODUCTS

  let filteredProducts = products.filter((product) => {
    const searchText = search.toLowerCase();

    // SEARCH

    const matchesSearch =
      product.title
        .toLowerCase()
        .includes(searchText) ||
      product.category
        .toLowerCase()
        .includes(searchText) ||
      product.description
        .toLowerCase()
        .includes(searchText);


    // CATEGORY

    const matchesCategory =
      category === "all" ||
      product.category === category;


    // MIN PRICE

    const matchesMinPrice =
      minPrice === "" ||
      product.price >= Number(minPrice);


    // MAX PRICE

    const matchesMaxPrice =
      maxPrice === "" ||
      product.price <= Number(maxPrice);


    // STOCK

    const matchesStock =
      !onlyInStock ||
      product.inStock === true;


    // DISCOUNT

    const matchesDiscount =
      !onlyDiscount ||
      Boolean(product.oldPrice);


    return (
      matchesSearch &&
      matchesCategory &&
      matchesMinPrice &&
      matchesMaxPrice &&
      matchesStock &&
      matchesDiscount
    );
  });


  // SORT

  if (sort === "price-low") {
    filteredProducts.sort(
      (a, b) => a.price - b.price
    );
  }

  if (sort === "price-high") {
    filteredProducts.sort(
      (a, b) => b.price - a.price
    );
  }

  if (sort === "name") {
    filteredProducts.sort((a, b) =>
      a.title.localeCompare(b.title, "hy")
    );
  }


  // CLEAR FILTERS

  const clearFilters = () => {
    setCategory("all");
    setMinPrice("");
    setMaxPrice("");
    setOnlyInStock(false);
    setOnlyDiscount(false);
    setSort("default");
  };


  return (
    <main className="all-products-page">

      {/* HERO */}

      <section className="all-products-hero">
        <div>
          <p>FURNIHOME COLLECTION</p>

          <h1>
            Մեր տեսականին
          </h1>

          <span>
            Բացահայտիր մեր կահույքի ամբողջ տեսականին և ընտրիր քո
            ինտերիերին համապատասխան տարբերակը։
          </span>
        </div>
      </section>


      <section className="all-products-container">

        {/* HEADER */}

        <div className="all-products-header">

          <div>
            <p className="all-products-small">
              ՄԵՐ ԱՊՐԱՆՔՆԵՐԸ
            </p>

            <h2>
              {search
                ? `Որոնման արդյունքներ՝ "${search}"`
                : "Ամբողջ տեսականին"
              }
            </h2>
          </div>

          <p className="products-count">
            {filteredProducts.length} ապրանք
          </p>

        </div>


        {/* PRODUCTS + FILTER */}

        <div className="products-layout">

          {/* FILTER SIDEBAR */}

          <aside className="products-filter">

            <div className="filter-title">
              <div>
                <p>FILTER</p>

                <h3>
                  Ֆիլտրել
                </h3>
              </div>

              <button
                type="button"
                onClick={clearFilters}
              >
                Մաքրել
              </button>
            </div>


            {/* CATEGORY */}

            <div className="filter-group">

              <label>
                Կահույքի տեսակ
              </label>

              <select
                value={category}
                onChange={(e) =>
                  setCategory(e.target.value)
                }
              >
                <option value="all">
                  Բոլորը
                </option>

                {categories.map((item) => (
                  <option
                    key={item}
                    value={item}
                  >
                    {item}
                  </option>
                ))}

              </select>

            </div>


            {/* PRICE */}

            <div className="filter-group">

              <label>
                Գին
              </label>

              <div className="price-inputs">

                <input
                  type="number"
                  placeholder="Սկսած"
                  value={minPrice}
                  onChange={(e) =>
                    setMinPrice(e.target.value)
                  }
                />

                <span>
                  —
                </span>

                <input
                  type="number"
                  placeholder="Մինչև"
                  value={maxPrice}
                  onChange={(e) =>
                    setMaxPrice(e.target.value)
                  }
                />

              </div>

            </div>


            {/* STOCK */}

            <div className="filter-checkbox">

              <input
                type="checkbox"
                id="in-stock"
                checked={onlyInStock}
                onChange={(e) =>
                  setOnlyInStock(e.target.checked)
                }
              />

              <label htmlFor="in-stock">
                Միայն առկա ապրանքներ
              </label>

            </div>


            {/* DISCOUNT */}

            <div className="filter-checkbox">

              <input
                type="checkbox"
                id="discount"
                checked={onlyDiscount}
                onChange={(e) =>
                  setOnlyDiscount(e.target.checked)
                }
              />

              <label htmlFor="discount">
                Միայն զեղչված
              </label>

            </div>


            {/* SORT */}

            <div className="filter-group">

              <label>
                Դասավորել
              </label>

              <select
                value={sort}
                onChange={(e) =>
                  setSort(e.target.value)
                }
              >
                <option value="default">
                  Լռելյայն
                </option>

                <option value="price-low">
                  Գին՝ ցածրից բարձր
                </option>

                <option value="price-high">
                  Գին՝ բարձրից ցածր
                </option>

                <option value="name">
                  Անունով
                </option>

              </select>

            </div>

          </aside>


          {/* PRODUCTS */}

          <div className="products-content">

            {filteredProducts.length === 0 ? (

              <div className="no-products">

                <h2>
                  Ապրանք չի գտնվել
                </h2>

                <p>
                  Փորձիր փոխել որոնման կամ ֆիլտրերի պայմանները։
                </p>

                <button
                  type="button"
                  onClick={clearFilters}
                >
                  Մաքրել ֆիլտրերը
                </button>

              </div>

            ) : (

              <div className="all-products-grid">

                {filteredProducts.map((product) => (

                  <article
                    className="all-product-card"
                    key={product._id}
                  >

                    <Link
                      to={`/product/${product._id}`}
                    >

                      <div className="all-product-image">

                        <img
                          src={product.image}
                          alt={product.title}
                        />

                        {product.badge && (
  <span
    className={`all-product-badge all-product-badge--${product.badge.toLowerCase()}`}
  >
    {product.badge}
  </span>
)}
                      </div>


                      <div className="all-product-content">

                        <p>
                          {product.category}
                        </p>

                        <h3>
                          {product.title}
                        </h3>


                        <div className="all-product-price">

                          <strong>
                            {product.price.toLocaleString()} ֏
                          </strong>

                          {product.oldPrice && (
                            <del>
                              {product.oldPrice.toLocaleString()} ֏
                            </del>
                          )}

                        </div>


                        <span className="view-product">
                          Դիտել ապրանքը →
                        </span>

                      </div>

                    </Link>

                  </article>

                ))}

              </div>

            )}

          </div>

        </div>

      </section>

    </main>
  );
};