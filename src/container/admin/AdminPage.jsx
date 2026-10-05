import { useEffect, useState } from "react";
import "./style.css";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000";


const categoryOptions = [
  {
    title: "Բազմոցներ",
    slug: "sofas",
  },
  {
    title: "Ննջասենյակ",
    slug: "bedroom",
  },
  {
    title: "Սեղաններ",
    slug: "tables",
  },
  {
    title: "Աթոռներ",
    slug: "chairs",
  },
];


const colorOptions = [
  {
    name: "Սպիտակ",
    value: "Սպիտակ",
    hex: "#ffffff",
  },
  {
    name: "Սև",
    value: "Սև",
    hex: "#111111",
  },
  {
    name: "Բեժ",
    value: "Բեժ",
    hex: "#d8c3a5",
  },
  {
    name: "Մոխրագույն",
    value: "Մոխրագույն",
    hex: "#888888",
  },
  {
    name: "Բաց մոխրագույն",
    value: "Բաց մոխրագույն",
    hex: "#cccccc",
  },
  {
    name: "Շագանակագույն",
    value: "Շագանակագույն",
    hex: "#795548",
  },
  {
    name: "Կանաչ",
    value: "Կանաչ",
    hex: "#557c55",
  },
  {
    name: "Կապույտ",
    value: "Կապույտ",
    hex: "#496a8f",
  },
  {
    name: "Դեղին",
    value: "Դեղին",
    hex: "#e3c64b",
  },
  {
    name: "Կարմիր",
    value: "Կարմիր",
    hex: "#a63d40",
  },
  {
    name: "Բնական",
    value: "Բնական",
    hex: "#b88a5a",
  },
];


const initialForm = {
  title: "",
  category: "",
  categorySlug: "",
  description: "",
  price: "",
  oldPrice: "",
  image: "",
  badge: "",
  colors: [],
  material: "",
  width: "",
  height: "",
  depth: "",
  warranty: "",
  inStock: true,
};


export const AdminPage = () => {
  // =========================
  // ADMIN PAGE
  // =========================

  const [activePage, setActivePage] =
    useState("products");


  // =========================
  // PRODUCTS
  // =========================

  const [products, setProducts] =
    useState([]);

  const [form, setForm] =
    useState(initialForm);

  const [editingId, setEditingId] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const [message, setMessage] =
    useState("");


  // =========================
  // CLIENTS
  // =========================

  const [clients, setClients] =
    useState([]);

  const [
    clientsLoading,
    setClientsLoading,
  ] = useState(false);

  const [
    selectedClient,
    setSelectedClient,
  ] = useState(null);

  const [
    clientDetails,
    setClientDetails,
  ] = useState(null);

  const [
    clientDetailsLoading,
    setClientDetailsLoading,
  ] = useState(false);

  const [
    clientDetailsError,
    setClientDetailsError,
  ] = useState("");

  const openClientDetails =
    async (client) => {
      try {
        setSelectedClient(
          client
        );

        setClientDetails(
          null
        );

        setClientDetailsError(
          ""
        );

        setClientDetailsLoading(
          true
        );

        const response =
          await fetch(
            `${API_URL}/api/auth/users/${client._id}/details`
          );

        const data =
          await response.json();

        if (!response.ok) {
          throw new Error(
            data.message ||
            "Չհաջողվեց ստանալ տվյալները"
          );
        }

        setClientDetails(
          data
        );
      } catch (error) {
        setClientDetailsError(
          error.message
        );
      } finally {
        setClientDetailsLoading(
          false
        );
      }
    };


  const closeClientDetails =
    () => {
      setSelectedClient(
        null
      );

      setClientDetails(
        null
      );

      setClientDetailsError(
        ""
      );
    };
  // =========================
  // COMMENTS
  // =========================

  const [comments, setComments] =
    useState([]);

  const [
    commentsLoading,
    setCommentsLoading,
  ] = useState(false);


  // =========================
  // GET PRODUCTS
  // =========================

  const getProducts = async () => {
    try {
      const response = await fetch(
        `${API_URL}/api/products`
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Սխալ"
        );
      }

      setProducts(
        Array.isArray(data)
          ? data
          : []
      );
    } catch (error) {
      console.log(
        "Products error:",
        error
      );

      setProducts([]);
    }
  };


  // =========================
  // GET CLIENTS
  // =========================

  const getClients = async () => {
    try {
      setClientsLoading(true);

      const response = await fetch(
        `${API_URL}/api/auth`
      );

      const data =
        await response.json();
      console.log(data);

      if (!response.ok) {
        throw new Error(
          data.message ||
          "Չհաջողվեց ստանալ կլիենտներին"
        );
      }

      setClients(
        Array.isArray(data)
          ? data
          : []
      );
    } catch (error) {
      console.log(
        "Clients error:",
        error
      );

      setClients([]);
    } finally {
      setClientsLoading(false);
    }
  };


  // =========================
  // GET COMMENTS
  // =========================

  const getComments = async () => {
    try {
      setCommentsLoading(true);

      const response = await fetch(
        `${API_URL}/api/comments`
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
          "Չհաջողվեց ստանալ մեկնաբանությունները"
        );
      }

      setComments(
        Array.isArray(data)
          ? data
          : []
      );
    } catch (error) {
      console.log(
        "Comments error:",
        error
      );

      setComments([]);
    } finally {
      setCommentsLoading(false);
    }
  };


  // =========================
  // FIRST LOAD
  // =========================

  useEffect(() => {
    getProducts();
    getClients();
    getComments();
  }, []);


  // =========================
  // INPUT CHANGE
  // =========================

  const handleChange = (e) => {
    const {
      name,
      value,
      type,
      checked,
    } = e.target;

    setForm((prev) => ({
      ...prev,

      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };


  // =========================
  // CATEGORY
  // =========================

  const handleCategoryChange = (e) => {
    const selectedCategory =
      categoryOptions.find(
        (item) =>
          item.title ===
          e.target.value
      );

    setForm((prev) => ({
      ...prev,

      category:
        selectedCategory?.title ||
        "",

      categorySlug:
        selectedCategory?.slug ||
        "",
    }));
  };


  // =========================
  // COLORS
  // =========================

  const handleColorChange = (
    color
  ) => {
    setForm((prev) => {
      const selected =
        prev.colors.includes(color);

      return {
        ...prev,

        colors: selected
          ? prev.colors.filter(
            (item) =>
              item !== color
          )
          : [
            ...prev.colors,
            color,
          ],
      };
    });
  };


  // =========================
  // CREATE / UPDATE PRODUCT
  // =========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      const method =
        editingId
          ? "PUT"
          : "POST";

      const url =
        editingId
          ? `${API_URL}/api/products/${editingId}`
          : `${API_URL}/api/products`;

      const response = await fetch(
        url,
        {
          method,

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            ...form,

            price:
              Number(form.price),

            oldPrice:
              form.oldPrice === ""
                ? null
                : Number(
                  form.oldPrice
                ),

            color:
              form.colors[0] ||
              "",
          }),
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Սխալ"
        );
      }

      setMessage(
        editingId
          ? "Ապրանքը հաջողությամբ փոփոխվեց"
          : "Ապրանքը հաջողությամբ ավելացվեց"
      );

      setForm(initialForm);

      setEditingId(null);

      await getProducts();
    } catch (error) {
      setMessage(
        error.message
      );
    } finally {
      setLoading(false);
    }
  };


  // =========================
  // EDIT PRODUCT
  // =========================

  const handleEdit = (
    product
  ) => {
    setEditingId(
      product._id
    );

    setForm({
      title:
        product.title || "",

      category:
        product.category || "",

      categorySlug:
        product.categorySlug ||
        "",

      description:
        product.description ||
        "",

      price:
        product.price || "",

      oldPrice:
        product.oldPrice || "",

      image:
        product.image || "",

      badge:
        product.badge || "",

      colors:
        Array.isArray(
          product.colors
        ) &&
          product.colors.length > 0
          ? product.colors
          : product.color
            ? [product.color]
            : [],

      material:
        product.material || "",

      width:
        product.width || "",

      height:
        product.height || "",

      depth:
        product.depth || "",

      warranty:
        product.warranty || "",

      inStock:
        product.inStock ?? true,
    });

    setActivePage(
      "products"
    );

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };


  // =========================
  // DELETE PRODUCT
  // =========================

  const handleDelete = async (
    id
  ) => {
    const confirmDelete =
      window.confirm(
        "Վստա՞հ եք, որ ցանկանում եք ջնջել ապրանքը"
      );

    if (!confirmDelete) {
      return;
    }

    try {
      const response =
        await fetch(
          `${API_URL}/api/products/${id}`,
          {
            method:
              "DELETE",
          }
        );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
          "Չհաջողվեց ջնջել ապրանքը"
        );
      }

      await getProducts();
    } catch (error) {
      alert(
        error.message
      );
    }
  };


  // =========================
  // CANCEL EDIT
  // =========================

  const cancelEdit = () => {
    setEditingId(null);

    setForm(
      initialForm
    );

    setMessage("");
  };


  // =========================
  // DELETE COMMENT
  // =========================

  const handleDeleteComment =
    async (commentId) => {
      const confirmDelete =
        window.confirm(
          "Վստա՞հ եք, որ ցանկանում եք ջնջել այս մեկնաբանությունը"
        );

      if (!confirmDelete) {
        return;
      }

      try {
        const response =
          await fetch(
            `${API_URL}/api/comments/${commentId}`,
            {
              method:
                "DELETE",
            }
          );

        const data =
          await response.json();

        if (!response.ok) {
          throw new Error(
            data.message ||
            "Չհաջողվեց ջնջել մեկնաբանությունը"
          );
        }

        setComments(
          (prev) =>
            prev.filter(
              (comment) =>
                comment._id !==
                commentId
            )
        );
      } catch (error) {
        alert(
          error.message
        );
      }
    };


  // =========================
  // PAGE INFO
  // =========================

  const getPageInfo = () => {
    if (
      activePage === "clients"
    ) {
      return {
        label:
          "FURNIHOME CUSTOMERS",

        title:
          "Կլիենտներ",

        description:
          "Կայքում գրանցված օգտատերերի ցանկը։",

        count:
          clients.length,

        countText:
          "կլիենտ",
      };
    }

    if (
      activePage === "comments"
    ) {
      return {
        label:
          "FURNIHOME REVIEWS",

        title:
          "Մեկնաբանություններ",

        description:
          "Հաճախորդների թողած կարծիքների կառավարում։",

        count:
          comments.length,

        countText:
          "կարծիք",
      };
    }

    return {
      label:
        "FURNIHOME ADMIN",

      title:
        "Ապրանքների կառավարում",

      description:
        "Ավելացրեք, փոփոխեք կամ ջնջեք կայքի ապրանքները։",

      count:
        products.length,

      countText:
        "ապրանք",
    };
  };


  const pageInfo =
    getPageInfo();


  return (
    <main className="admin-page">

      <div className="admin-container">


        {/* =========================
            HEADER
        ========================= */}

        <div className="admin-header">

          <div>

            <p className="admin-label">
              {pageInfo.label}
            </p>

            <h1>
              {pageInfo.title}
            </h1>

            <span>
              {pageInfo.description}
            </span>

          </div>


          <div className="admin-stat">

            <strong>
              {pageInfo.count}
            </strong>

            <span>
              {pageInfo.countText}
            </span>

          </div>

        </div>


        {/* =========================
            NAVIGATION
        ========================= */}

        <div className="admin-navigation">

          <button
            type="button"
            className={
              activePage ===
                "products"
                ? "admin-nav-button active"
                : "admin-nav-button"
            }
            onClick={() =>
              setActivePage(
                "products"
              )
            }
          >
            <span>▦</span>

            Ապրանքներ

            <small>
              {products.length}
            </small>
          </button>


          <button
            type="button"
            className={
              activePage ===
                "clients"
                ? "admin-nav-button active"
                : "admin-nav-button"
            }
            onClick={() =>
              setActivePage(
                "clients"
              )
            }
          >
            <span>♙</span>

            Կլիենտներ

            <small>
              {clients.length}
            </small>
          </button>


          <button
            type="button"
            className={
              activePage ===
                "comments"
                ? "admin-nav-button active"
                : "admin-nav-button"
            }
            onClick={() =>
              setActivePage(
                "comments"
              )
            }
          >
            <span>◌</span>

            Մեկնաբանություններ

            <small>
              {comments.length}
            </small>
          </button>

        </div>


        {/* =====================================
            PRODUCTS PAGE
        ===================================== */}

        {activePage ===
          "products" && (

            <section className="admin-content">


              {/* =========================
                PRODUCT FORM
            ========================= */}

              <div className="admin-form-wrapper">

                <div className="admin-section-title">

                  <p>
                    {editingId
                      ? "EDIT PRODUCT"
                      : "NEW PRODUCT"}
                  </p>

                  <h2>
                    {editingId
                      ? "Փոփոխել ապրանքը"
                      : "Ավելացնել ապրանք"}
                  </h2>

                </div>


                <form
                  className="admin-form"
                  onSubmit={
                    handleSubmit
                  }
                >


                  {/* TITLE */}

                  <div className="admin-input-group">

                    <label>
                      Անվանում
                    </label>

                    <input
                      type="text"
                      name="title"
                      value={
                        form.title
                      }
                      onChange={
                        handleChange
                      }
                      placeholder="Օրինակ՝ Luna Soft բազմոց"
                      required
                    />

                  </div>


                  {/* CATEGORY + BADGE */}

                  <div className="admin-form-row">

                    <div className="admin-input-group">

                      <label>
                        Կատեգորիա
                      </label>

                      <select
                        name="category"
                        value={
                          form.category
                        }
                        onChange={
                          handleCategoryChange
                        }
                        required
                      >

                        <option value="">
                          Ընտրել կատեգորիան
                        </option>

                        {categoryOptions.map(
                          (item) => (

                            <option
                              key={
                                item.slug
                              }
                              value={
                                item.title
                              }
                            >
                              {item.title}
                            </option>

                          )
                        )}

                      </select>

                    </div>


                    <div className="admin-input-group">

                      <label>
                        Badge
                      </label>

                      <select
                        type="text"
                        name="badge"
                        value={
                          form.badge
                        }
                        onChange={
                          handleChange
                        }
                        placeholder="NEW / SALE / PREMIUM"
                      >
                        <option value={"SALE"}>SALE</option>
                        <option value={"NEW"}>NEW</option>
                        <option value={"PREMIUM"}>PREMIUM</option>
                        </select>

                    </div>

                  </div>


                  {/* PRICE */}

                  <div className="admin-form-row">

                    <div className="admin-input-group">

                      <label>
                        Գին
                      </label>

                      <input
                        type="number"
                        name="price"
                        value={
                          form.price
                        }
                        onChange={
                          handleChange
                        }
                        placeholder="150000"
                        required
                      />

                    </div>


                    <div className="admin-input-group">

                      <label>
                        Հին գին
                      </label>

                      <input
                        type="number"
                        name="oldPrice"
                        value={
                          form.oldPrice
                        }
                        onChange={
                          handleChange
                        }
                        placeholder="180000"
                      />

                    </div>

                  </div>


                  {/* IMAGE */}

                  <div className="admin-input-group">

                    <label>
                      Նկարի URL
                    </label>

                    <input
                      type="text"
                      name="image"
                      value={
                        form.image
                      }
                      onChange={
                        handleChange
                      }
                      placeholder="https://..."
                      required
                    />

                  </div>


                  {/* IMAGE PREVIEW */}

                  {form.image && (

                    <div className="admin-image-preview">

                      <img
                        src={
                          form.image
                        }
                        alt="preview"
                      />

                    </div>

                  )}


                  {/* DESCRIPTION */}

                  <div className="admin-input-group">

                    <label>
                      Նկարագրություն
                    </label>

                    <textarea
                      name="description"
                      value={
                        form.description
                      }
                      onChange={
                        handleChange
                      }
                      placeholder="Ապրանքի նկարագրություն..."
                      rows="5"
                    />

                  </div>


                  {/* COLORS */}

                  <div className="admin-input-group">

                    <label>
                      Հասանելի գույներ
                    </label>

                    <div className="admin-colors">

                      {colorOptions.map(
                        (color) => {
                          const selected =
                            form.colors.includes(
                              color.value
                            );

                          return (

                            <label
                              key={
                                color.value
                              }
                              className={
                                selected
                                  ? "admin-color selected"
                                  : "admin-color"
                              }
                            >

                              <input
                                type="checkbox"
                                checked={
                                  selected
                                }
                                onChange={() =>
                                  handleColorChange(
                                    color.value
                                  )
                                }
                              />

                              <span
                                className="admin-color-circle"
                                style={{
                                  backgroundColor:
                                    color.hex,
                                }}
                              />

                              <span>
                                {color.name}
                              </span>

                              {selected && (
                                <strong className="color-check">
                                  ✓
                                </strong>
                              )}

                            </label>

                          );
                        }
                      )}

                    </div>

                  </div>


                  {/* MATERIAL + WARRANTY */}

                  <div className="admin-form-row">

                    <div className="admin-input-group">

                      <label>
                        Նյութ
                      </label>

                      <input
                        type="text"
                        name="material"
                        value={
                          form.material
                        }
                        onChange={
                          handleChange
                        }
                        placeholder="Փայտ + գործվածք"
                      />

                    </div>


                    <div className="admin-input-group">

                      <label>
                        Երաշխիք
                      </label>

                      <input
                        type="text"
                        name="warranty"
                        value={
                          form.warranty
                        }
                        onChange={
                          handleChange
                        }
                        placeholder="24 ամիս"
                      />

                    </div>

                  </div>


                  {/* WIDTH + HEIGHT */}

                  <div className="admin-form-row">

                    <div className="admin-input-group">

                      <label>
                        Լայնություն
                      </label>

                      <input
                        type="text"
                        name="width"
                        value={
                          form.width
                        }
                        onChange={
                          handleChange
                        }
                        placeholder="230 սմ"
                      />

                    </div>


                    <div className="admin-input-group">

                      <label>
                        Բարձրություն
                      </label>

                      <input
                        type="text"
                        name="height"
                        value={
                          form.height
                        }
                        onChange={
                          handleChange
                        }
                        placeholder="85 սմ"
                      />

                    </div>

                  </div>


                  {/* DEPTH */}

                  <div className="admin-input-group">

                    <label>
                      Խորություն
                    </label>

                    <input
                      type="text"
                      name="depth"
                      value={
                        form.depth
                      }
                      onChange={
                        handleChange
                      }
                      placeholder="95 սմ"
                    />

                  </div>


                  {/* STOCK */}

                  <label className="admin-checkbox">

                    <input
                      type="checkbox"
                      name="inStock"
                      checked={
                        form.inStock
                      }
                      onChange={
                        handleChange
                      }
                    />

                    <span>
                      Ապրանքը առկա է
                    </span>

                  </label>


                  {/* MESSAGE */}

                  {message && (

                    <div className="admin-message">
                      {message}
                    </div>

                  )}


                  {/* ACTIONS */}

                  <div className="admin-actions">

                    <button
                      type="submit"
                      className="admin-save-button"
                      disabled={
                        loading
                      }
                    >

                      {loading
                        ? "Պահպանվում է..."
                        : editingId
                          ? "Պահպանել փոփոխությունները"
                          : "Ավելացնել ապրանքը"}

                    </button>


                    {editingId && (

                      <button
                        type="button"
                        className="admin-cancel-button"
                        onClick={
                          cancelEdit
                        }
                      >
                        Չեղարկել
                      </button>

                    )}

                  </div>

                </form>

              </div>


              {/* =========================
                PRODUCTS LIST
            ========================= */}

              <div className="admin-products">

                <div className="admin-section-title">

                  <p>
                    PRODUCTS
                  </p>

                  <h2>
                    Ապրանքների ցանկ
                  </h2>

                </div>


                <div className="admin-product-list">

                  {products.length ===
                    0 ? (

                    <div className="admin-empty">
                      Դեռ ապրանքներ չկան։
                    </div>

                  ) : (

                    products.map(
                      (product) => (

                        <div
                          className="admin-product-item"
                          key={
                            product._id
                          }
                        >

                          <div className="admin-product-image">

                            <img
                              src={
                                product.image
                              }
                              alt={
                                product.title
                              }
                            />

                          </div>


                          <div className="admin-product-info">

                            <span>
                              {product.category}
                            </span>

                            <h3>
                              {product.title}
                            </h3>

                            <strong>

                              {Number(
                                product.price
                              ).toLocaleString(
                                "hy-AM"
                              )}{" "}
                              ֏

                            </strong>


                            <div className="admin-product-colors">

                              {(
                                product.colors
                                  ?.length
                                  ? product.colors
                                  : product.color
                                    ? [
                                      product.color,
                                    ]
                                    : []
                              ).map(
                                (color) => (

                                  <small
                                    key={
                                      color
                                    }
                                    className="admin-product-color-name"
                                  >
                                    {color}
                                  </small>

                                )
                              )}

                            </div>


                            <small
                              className={
                                product.inStock
                                  ? "stock-yes"
                                  : "stock-no"
                              }
                            >
                              {product.inStock
                                ? "Առկա է"
                                : "Առկա չէ"}
                            </small>

                          </div>


                          <div className="admin-product-buttons">

                            <button
                              type="button"
                              className="admin-edit"
                              onClick={() =>
                                handleEdit(
                                  product
                                )
                              }
                            >
                              Փոփոխել
                            </button>

                            <button
                              type="button"
                              className="admin-delete"
                              onClick={() =>
                                handleDelete(
                                  product._id
                                )
                              }
                            >
                              Ջնջել
                            </button>

                          </div>

                        </div>

                      )
                    )

                  )}

                </div>

              </div>

            </section>

          )}


        {/* =====================================
            CLIENTS PAGE
        ===================================== */}

        {activePage ===
          "clients" && (

            <section className="admin-simple-page">


              <div className="admin-page-heading">

                <div>

                  <p className="admin-label">
                    CUSTOMERS
                  </p>

                  <h2>
                    Կլիենտների ցանկ
                  </h2>

                  <span>
                    Կայքում գրանցված
                    օգտատերերը
                  </span>

                </div>

              </div>


              {clientsLoading ? (

                <div className="admin-empty">
                  Բեռնվում է...
                </div>

              ) : clients.length ===
                0 ? (

                <div className="admin-empty">
                  Գրանցված կլիենտներ
                  չկան։
                </div>

              ) : (

                <div className="admin-clients-list">

                  {clients.map(
                    (
                      client,
                      index
                    ) => (

                      <div
                        className="admin-client-item"
                        key={client._id}
                        onClick={() =>
                          openClientDetails(
                            client
                          )
                        }
                        role="button"
                        tabIndex={0}
                      >

                        <div className="admin-client-number">
                          {index + 1}
                        </div>


                        <div className="admin-client-avatar">

                          {(
                            client.name ||
                            client.email ||
                            "?"
                          )
                            .charAt(0)
                            .toUpperCase()}

                        </div>


                        <div className="admin-client-info">

                          <strong>

                            {client.name ||
                              ""}{" "}

                            {client.surname ||
                              ""}

                          </strong>

                          <span>
                            {client.email}
                          </span>

                        </div>


                        <div className="admin-client-date">

                          <span>
                            Գրանցվել է
                          </span>

                          <strong>

                            {client.createdAt
                              ? new Date(
                                client.createdAt
                              ).toLocaleDateString(
                                "hy-AM"
                              )
                              : "—"}

                          </strong>

                        </div>
                        <div className="admin-client-open">
                          ›
                        </div>
                      </div>

                    )
                  )}

                </div>

              )}

            </section>

          )}


        {/* =====================================
            COMMENTS PAGE
        ===================================== */}

        {activePage ===
          "comments" && (

            <section className="admin-simple-page">


              <div className="admin-page-heading">

                <div>

                  <p className="admin-label">
                    REVIEWS
                  </p>

                  <h2>
                    Մեկնաբանությունների
                    ցանկ
                  </h2>

                  <span>
                    Կայքում թողած բոլոր
                    կարծիքները
                  </span>

                </div>

              </div>


              {commentsLoading ? (

                <div className="admin-empty">
                  Բեռնվում է...
                </div>

              ) : comments.length ===
                0 ? (

                <div className="admin-empty">
                  Մեկնաբանություններ
                  չկան։
                </div>

              ) : (

                <div className="admin-comments-list">

                  {comments.map(
                    (comment) => (

                      <div
                        className="admin-comment-item"
                        key={
                          comment._id
                        }
                      >

                        <div className="admin-comment-top">

                          <div className="admin-comment-user">

                            <div className="admin-comment-avatar">

                              {comment.name
                                ?.charAt(0)
                                ?.toUpperCase() ||
                                "?"}

                            </div>


                            <div>

                              <strong>
                                {comment.name}
                              </strong>

                              <span>

                                {comment.createdAt
                                  ? new Date(
                                    comment.createdAt
                                  ).toLocaleDateString(
                                    "hy-AM"
                                  )
                                  : "—"}

                              </span>

                            </div>

                          </div>


                          <div className="admin-comment-rating">

                            {[
                              1,
                              2,
                              3,
                              4,
                              5,
                            ].map(
                              (star) => (

                                <span
                                  key={
                                    star
                                  }
                                  className={
                                    star <=
                                      Number(
                                        comment.rating
                                      )
                                      ? "active"
                                      : ""
                                  }
                                >
                                  ★
                                </span>

                              )
                            )}

                          </div>

                        </div>


                        {comment.product && (

                          <div className="admin-comment-product">

                            Ապրանք՝{" "}

                            <strong>

                              {typeof comment.product ===
                                "object"
                                ? comment
                                  .product
                                  ?.title ||
                                "Ջնջված ապրանք"
                                : comment.product}

                            </strong>

                          </div>

                        )}


                        <p className="admin-comment-text">

                          {comment.text}

                        </p>


                        <div className="admin-comment-footer">

                          <button
                            type="button"
                            className="admin-delete-comment"
                            onClick={() =>
                              handleDeleteComment(
                                comment._id
                              )
                            }
                          >
                            Ջնջել
                          </button>

                        </div>

                      </div>

                    )
                  )}

                </div>

              )}

            </section>

          )}

      </div>
      {selectedClient && (

        <div
          className="client-modal-overlay"
          onClick={
            closeClientDetails
          }
        >

          <div
            className="client-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >


            <button
              type="button"
              className="client-modal-close"
              onClick={
                closeClientDetails
              }
            >
              ×
            </button>


            {clientDetailsLoading ? (

              <div className="client-modal-loading">
                Բեռնվում է...
              </div>

            ) : clientDetailsError ? (

              <div className="client-modal-error">
                {clientDetailsError}
              </div>

            ) : clientDetails ? (

              <>

                {/* ===================
              USER
          =================== */}

                <div className="client-profile-header">

                  <div className="client-profile-avatar">

                    {(
                      clientDetails
                        .user
                        .name ||
                      clientDetails
                        .user
                        .email ||
                      "?"
                    )
                      .charAt(0)
                      .toUpperCase()}

                  </div>


                  <div>

                    <p>
                      CUSTOMER PROFILE
                    </p>

                    <h2>

                      {
                        clientDetails
                          .user
                          .name
                      }{" "}

                      {
                        clientDetails
                          .user
                          .surname
                      }

                    </h2>

                    <span>
                      {
                        clientDetails
                          .user
                          .email
                      }
                    </span>

                  </div>

                </div>


                {/* ===================
              STATISTICS
          =================== */}

                <div className="client-profile-stats">


                  <div>

                    <span>
                      Պատվերներ
                    </span>

                    <strong>
                      {
                        clientDetails
                          .stats
                          .ordersCount
                      }
                    </strong>

                  </div>


                  <div>

                    <span>
                      Գնված ապրանք
                    </span>

                    <strong>
                      {
                        clientDetails
                          .stats
                          .totalProducts
                      }
                    </strong>

                  </div>


                  <div>

                    <span>
                      Ծախսել է
                    </span>

                    <strong>

                      {Number(
                        clientDetails
                          .stats
                          .totalSpent
                      ).toLocaleString(
                        "hy-AM"
                      )}{" "}

                      ֏

                    </strong>

                  </div>


                  <div>

                    <span>
                      Կարծիքներ
                    </span>

                    <strong>
                      {
                        clientDetails
                          .stats
                          .commentsCount
                      }
                    </strong>

                  </div>

                </div>


                {/* ===================
              USER INFO
          =================== */}

                <div className="client-profile-section">

                  <h3>
                    Կլիենտի տվյալներ
                  </h3>


                  <div className="client-info-grid">

                    <div>

                      <span>
                        Email
                      </span>

                      <strong>
                        {
                          clientDetails
                            .user
                            .email
                        }
                      </strong>

                    </div>


                    <div>

                      <span>
                        Email status
                      </span>

                      <strong>

                        {clientDetails
                          .user
                          .isVerified
                          ? "Հաստատված ✓"
                          : "Չհաստատված"}

                      </strong>

                    </div>


                    <div>

                      <span>
                        Գրանցվել է
                      </span>

                      <strong>

                        {clientDetails
                          .user
                          .createdAt
                          ? new Date(
                            clientDetails
                              .user
                              .createdAt
                          ).toLocaleDateString(
                            "hy-AM"
                          )
                          : "—"}

                      </strong>

                    </div>


                    <div>

                      <span>
                        Վերջին պատվեր
                      </span>

                      <strong>

                        {clientDetails
                          .stats
                          .lastOrderAt
                          ? new Date(
                            clientDetails
                              .stats
                              .lastOrderAt
                          ).toLocaleDateString(
                            "hy-AM"
                          )
                          : "Չկա"}

                      </strong>

                    </div>

                  </div>

                </div>


                {/* ===================
              ORDERS
          =================== */}

                <div className="client-profile-section">

                  <h3>
                    Պատվերներ
                  </h3>


                  {clientDetails
                    .orders
                    .length === 0 ? (

                    <div className="client-profile-empty">
                      Պատվերներ չկան։
                    </div>

                  ) : (

                    <div className="client-orders">

                      {clientDetails
                        .orders
                        .map(
                          (
                            order,
                            index
                          ) => (

                            <div
                              className="client-order-card"
                              key={
                                order._id
                              }
                            >

                              <div className="client-order-header">

                                <div>

                                  <span>
                                    Պատվեր #
                                    {clientDetails
                                      .orders
                                      .length -
                                      index}
                                  </span>

                                  <strong>

                                    {order.createdAt
                                      ? new Date(
                                        order.createdAt
                                      ).toLocaleDateString(
                                        "hy-AM"
                                      )
                                      : "—"}

                                  </strong>

                                </div>


                                <strong className="client-order-total">

                                  {Number(
                                    order.totalPrice ||
                                    0
                                  ).toLocaleString(
                                    "hy-AM"
                                  )}{" "}

                                  ֏

                                </strong>

                              </div>


                              <div className="client-order-products">

                                {(
                                  order.items ||
                                  []
                                ).map(
                                  (
                                    item,
                                    itemIndex
                                  ) => {

                                    const product =
                                      typeof item.product ===
                                        "object"
                                        ? item.product
                                        : null;

                                    return (

                                      <div
                                        className="client-order-product"
                                        key={
                                          item._id ||
                                          itemIndex
                                        }
                                      >

                                        {(product?.image ||
                                          item.image) && (

                                            <img
                                              src={
                                                product?.image ||
                                                item.image
                                              }
                                              alt=""
                                            />

                                          )}


                                        <div>

                                          <strong>

                                            {product?.title ||
                                              item.title ||
                                              "Ապրանք"}

                                          </strong>

                                          <span>

                                            Քանակ՝{" "}
                                            {item.quantity ||
                                              1}

                                          </span>

                                          {item.color && (

                                            <span>
                                              Գույն՝{" "}
                                              {
                                                item.color
                                              }
                                            </span>

                                          )}

                                        </div>

                                      </div>

                                    );
                                  }
                                )}

                              </div>


                              <div className="client-order-bottom">

                                <span>
                                  Կարգավիճակ
                                </span>

                                <strong>
                                  {order.status ||
                                    "pending"}
                                </strong>

                              </div>

                            </div>

                          )
                        )}

                    </div>

                  )}

                </div>


                {/* ===================
              COMMENTS
          =================== */}

                <div className="client-profile-section">

                  <h3>
                    Մեկնաբանություններ
                  </h3>


                  {clientDetails
                    .comments
                    .length === 0 ? (

                    <div className="client-profile-empty">
                      Մեկնաբանություններ
                      չկան։
                    </div>

                  ) : (

                    <div className="client-profile-comments">

                      {clientDetails
                        .comments
                        .map(
                          (
                            comment
                          ) => (

                            <div
                              className="client-profile-comment"
                              key={
                                comment._id
                              }
                            >

                              <div className="client-profile-comment-top">

                                <strong>

                                  {comment
                                    .product
                                    ?.title ||
                                    "Ապրանք"}

                                </strong>


                                <span>

                                  {[
                                    1,
                                    2,
                                    3,
                                    4,
                                    5,
                                  ].map(
                                    (
                                      star
                                    ) =>
                                      star <=
                                        Number(
                                          comment.rating
                                        )
                                        ? "★"
                                        : "☆"
                                  )}

                                </span>

                              </div>


                              <p>
                                {
                                  comment.text
                                }
                              </p>


                              <small>

                                {comment.createdAt
                                  ? new Date(
                                    comment.createdAt
                                  ).toLocaleDateString(
                                    "hy-AM"
                                  )
                                  : ""}

                              </small>

                            </div>

                          )
                        )}

                    </div>

                  )}

                </div>

              </>

            ) : null}

          </div>

        </div>

      )}
    </main>
  );
};