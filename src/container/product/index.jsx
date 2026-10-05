import {
  useEffect,
  useState,
} from "react";

import {
  Link,
  useParams,
} from "react-router";

import "./style.css";

import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";


const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000";


export const MyProductPage = () => {

  const { id } = useParams();

  // =========================
  // PRODUCT
  // =========================

  const [product, setProduct] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [quantity, setQuantity] =
    useState(1);

  const [
    selectedImage,
    setSelectedImage,
  ] = useState("");

  const [
    selectedColor,
    setSelectedColor,
  ] = useState("");


  // =========================
  // COMMENTS
  // =========================

  const [
    comments,
    setComments,
  ] = useState([]);

  const [
    commentsLoading,
    setCommentsLoading,
  ] = useState(true);

  const [
    commentName,
    setCommentName,
  ] = useState("");

  const [
    commentText,
    setCommentText,
  ] = useState("");

  const [
    commentRating,
    setCommentRating,
  ] = useState(5);

  const [
    commentSubmitLoading,
    setCommentSubmitLoading,
  ] = useState(false);

  const [
    commentMessage,
    setCommentMessage,
  ] = useState("");

  const [
    commentSuccess,
    setCommentSuccess,
  ] = useState(false);


  // =========================
  // CONTEXT
  // =========================

  const { addToCart } =
    useCart();

  const {
    toggleWishlist,
    isInWishlist,
  } = useWishlist();


  // =========================
  // GET PRODUCT
  // =========================

  useEffect(() => {

    const getProduct =
      async () => {

        try {

          setLoading(true);

          setError("");

          const response =
            await fetch(
              `${API_URL}/api/products/${id}`
            );

          const data =
            await response.json();

          if (!response.ok) {

            throw new Error(
              data.message ||
              "Ապրանքը չի գտնվել"
            );

          }

          setProduct(data);

          setSelectedImage(
            data.image ||
            data.images?.[0] ||
            ""
          );

          const colors =
            Array.isArray(data.colors)
              ? data.colors
              : [];

          if (colors.length > 0) {

            setSelectedColor(
              colors[0]
            );

          } else if (data.color) {

            setSelectedColor(
              data.color
            );

          }

        } catch (error) {

          console.log(
            "Product error:",
            error
          );

          setError(
            error.message ||
            "Չհաջողվեց ստանալ ապրանքը"
          );

        } finally {

          setLoading(false);

        }

      };


    getProduct();

  }, [id]);


  // =========================
  // GET COMMENTS
  // =========================

useEffect(() => {
  const getComments = async () => {
    try {
      setCommentsLoading(true);

      const response =
        await fetch(
          `${API_URL}/api/comments/product/${id}`
        );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Չհաջողվեց ստանալ կարծիքները"
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

  if (id) {
    getComments();
  }
}, [id]);


  // =========================
  // ADD COMMENT
  // =========================

const handleCommentSubmit =
  async (event) => {
    event.preventDefault();

    setCommentMessage("");
    setCommentSuccess(false);

    if (
      !commentName.trim() ||
      !commentText.trim()
    ) {
      setCommentMessage(
        "Խնդրում ենք լրացնել անունը և կարծիքը"
      );

      return;
    }

    if (
      commentName.trim().length <
      2
    ) {
      setCommentMessage(
        "Անունը պետք է պարունակի առնվազն 2 նիշ"
      );

      return;
    }

    if (
      commentText.trim().length <
      3
    ) {
      setCommentMessage(
        "Կարծիքը չափազանց կարճ է"
      );

      return;
    }

    const token =
      localStorage.getItem(
        "token"
      );

    if (!token) {
      setCommentMessage(
        "Մեկնաբանություն գրելու համար մուտք գործեք համակարգ"
      );

      return;
    }

    try {
      setCommentSubmitLoading(
        true
      );

      const response =
        await fetch(
          `${API_URL}/api/comments/product/${id}`,
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",

              Authorization:
                `Bearer ${token}`,
            },

            body: JSON.stringify({
              name:
                commentName.trim(),

              text:
                commentText.trim(),

              rating:
                commentRating,
            }),
          }
        );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Չհաջողվեց ավելացնել կարծիքը"
        );
      }

      setComments(
        (prev) => [
          data,
          ...prev,
        ]
      );

      setCommentName("");
      setCommentText("");
      setCommentRating(5);

      setCommentSuccess(true);

      setCommentMessage(
        "Ձեր կարծիքը հաջողությամբ ավելացվեց"
      );
    } catch (error) {
      console.log(
        "Submit comment error:",
        error
      );

      setCommentSuccess(false);

      setCommentMessage(
        error.message ||
          "Տեղի ունեցավ սխալ"
      );
    } finally {
      setCommentSubmitLoading(
        false
      );
    }
  };

  // =========================
  // QUANTITY
  // =========================

  const increaseQuantity =
    () => {

      setQuantity(
        (prev) => prev + 1
      );

    };


  const decreaseQuantity =
    () => {

      setQuantity(
        (prev) =>
          prev > 1
            ? prev - 1
            : 1
      );

    };


  // =========================
  // DATE
  // =========================

  const formatCommentDate =
    (date) => {

      if (!date) {
        return "";
      }

      return new Date(
        date
      ).toLocaleDateString(
        "hy-AM",
        {
          year: "numeric",
          month: "long",
          day: "numeric",
        }
      );

    };


  // =========================
  // LOADING
  // =========================

  if (loading) {

    return (

      <div className="product-not-found">

        <h1>
          Բեռնվում է...
        </h1>

      </div>

    );

  }


  // =========================
  // ERROR
  // =========================

  if (error || !product) {

    return (

      <div className="product-not-found">

        <h1>
          Ապրանքը չի գտնվել
        </h1>

        {error && (
          <p>
            {error}
          </p>
        )}

        <Link to="/">
          ← Վերադառնալ գլխավոր էջ
        </Link>

      </div>

    );

  }


  // =========================
  // PRODUCT IMAGES
  // =========================

  const galleryImages = [

    product.image,

    ...(Array.isArray(
      product.images
    )
      ? product.images
      : []),

  ].filter(

    (
      image,
      index,
      array
    ) =>

      image &&
      array.indexOf(image) ===
        index

  );


  // =========================
  // COLORS
  // =========================

  const availableColors =

    Array.isArray(
      product.colors
    ) &&
    product.colors.length > 0

      ? product.colors

      : product.color

      ? [product.color]

      : [];


  const colorHex = {

    Սպիտակ: "#ffffff",

    Սև: "#111111",

    Բեժ: "#d8c3a5",

    Մոխրագույն:
      "#888888",

    "Բաց մոխրագույն":
      "#cccccc",

    Շագանակագույն:
      "#795548",

    Կանաչ:
      "#557c55",

    Կապույտ:
      "#496a8f",

    Դեղին:
      "#e3c64b",

    Կարմիր:
      "#a63d40",

    Բնական:
      "#b88a5a",

  };


  // =========================
  // AVERAGE RATING
  // =========================

  const averageRating =
    comments.length > 0

      ? comments.reduce(
          (sum, comment) =>
            sum +
            Number(
              comment.rating || 0
            ),
          0
        ) /
        comments.length

      : 0;


  const roundedAverage =
    averageRating.toFixed(1);


  return (

    <div className="product-page">


      {/* =====================
          BREADCRUMB
      ====================== */}

      <div className="product-breadcrumb">

        <Link to="/">
          Գլխավոր
        </Link>

        <span>/</span>

        <span>
          {product.category}
        </span>

        <span>/</span>

        <strong>
          {product.title}
        </strong>

      </div>


      {/* =====================
          PRODUCT
      ====================== */}

      <section className="product-details">


        {/* IMAGES */}

        <div className="product-gallery">

          <div className="product-thumbnails">

            {galleryImages.map(
              (
                image,
                index
              ) => (

                <button
                  key={index}

                  type="button"

                  className={
                    selectedImage ===
                    image

                      ? "thumbnail active"

                      : "thumbnail"
                  }

                  onClick={() =>
                    setSelectedImage(
                      image
                    )
                  }
                >

                  <img
                    src={image}

                    alt={`${product.title} ${
                      index + 1
                    }`}
                  />

                </button>

              )
            )}

          </div>


          <div className="product-main-image">

            {product.badge && (

              <span className="details-badge">

                {product.badge}

              </span>

            )}


            <img
              src={
                selectedImage ||
                product.image
              }

              alt={product.title}
            />

          </div>

        </div>


        {/* =====================
            INFORMATION
        ====================== */}

        <div className="product-information">


          <p className="details-category">
            {product.category}
          </p>


          <h1>
            {product.title}
          </h1>


          {/* RATING */}

          <div className="details-rating">

            <span>

              {[1, 2, 3, 4, 5].map(
                (star) => (

                  <span
                    key={star}
                    style={{
                      color:
                        star <=
                        Math.round(
                          averageRating
                        )
                          ? "#dba854"
                          : "#ddd",
                    }}
                  >
                    ★
                  </span>

                )
              )}

            </span>


            <p>

              {comments.length > 0
                ? `${roundedAverage} (${comments.length} կարծիք)`
                : "Դեռ կարծիք չկա"}

            </p>

          </div>


          {/* PRICE */}

          <div className="details-price">

            <strong>

              {Number(
                product.price
              ).toLocaleString(
                "hy-AM"
              )}{" "}
              ֏

            </strong>


            {product.oldPrice && (

              <del>

                {Number(
                  product.oldPrice
                ).toLocaleString(
                  "hy-AM"
                )}{" "}
                ֏

              </del>

            )}

          </div>


          {/* DESCRIPTION */}

          {product.description && (

            <p className="product-description">

              {product.description}

            </p>

          )}


          {/* STOCK */}

          <div className="stock-status">

            {product.inStock ? (

              <span className="in-stock">
                ● Առկա է պահեստում
              </span>

            ) : (

              <span className="out-stock">
                ● Առկա չէ
              </span>

            )}

          </div>


          {/* COLORS */}

          {availableColors.length >
            0 && (

            <div className="details-option">

              <p>
                Գույն
              </p>


              <div className="product-color-options">

                {availableColors.map(
                  (color) => (

                    <button
                      key={color}

                      type="button"

                      className={
                        selectedColor ===
                        color

                          ? "product-color-option active"

                          : "product-color-option"
                      }

                      onClick={() =>
                        setSelectedColor(
                          color
                        )
                      }

                      title={color}
                    >

                      <span
                        className="product-color-circle"

                        style={{
                          backgroundColor:
                            colorHex[
                              color
                            ] ||
                            "#dddddd",
                        }}
                      />

                      <span className="product-color-name">
                        {color}
                      </span>


                      {selectedColor ===
                        color && (

                        <span className="product-color-check">
                          ✓
                        </span>

                      )}

                    </button>

                  )
                )}

              </div>


              {selectedColor && (

                <p className="selected-color-text">

                  Ընտրված գույն՝{" "}

                  <strong>
                    {selectedColor}
                  </strong>

                </p>

              )}

            </div>

          )}


          {/* QUANTITY */}

          <div className="quantity-wrapper">

            <p>
              Քանակ
            </p>

            <div className="quantity">

              <button
                type="button"
                onClick={
                  decreaseQuantity
                }
              >
                −
              </button>

              <span>
                {quantity}
              </span>

              <button
                type="button"
                onClick={
                  increaseQuantity
                }
              >
                +
              </button>

            </div>

          </div>


          {/* BUTTONS */}

          <div className="product-buttons">

            <button

              className="add-cart-btn"

              disabled={
                !product.inStock
              }

              onClick={() =>

                addToCart(
                  {
                    ...product,
                    selectedColor,
                  },
                  quantity
                )

              }
            >

              🛒 Ավելացնել զամբյուղ

            </button>


            <button

              type="button"

              className={
                isInWishlist(
                  product._id
                )

                  ? "wishlist-btn active"

                  : "wishlist-btn"
              }

              onClick={() =>
                toggleWishlist(
                  product
                )
              }
            >

              {isInWishlist(
                product._id
              )
                ? "♥"
                : "♡"}

            </button>

          </div>


          {/* BENEFITS */}

          <div className="product-benefits">

            <div>

              <span>
                🚚
              </span>

              <div>

                <strong>
                  Արագ առաքում
                </strong>

                <p>
                  Առաքում ամբողջ Հայաստանում
                </p>

              </div>

            </div>


            <div>

              <span>
                ✓
              </span>

              <div>

                <strong>
                  Երաշխիք
                </strong>

                <p>
                  {product.warranty ||
                    "—"}
                </p>

              </div>

            </div>


            <div>

              <span>
                ↻
              </span>

              <div>

                <strong>
                  Վերադարձ
                </strong>

                <p>
                  14 օրվա ընթացքում
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =========================
          REVIEWS
      ========================= */}

      <section className="product-reviews">


        <div className="reviews-title">

          <p>
            CUSTOMER REVIEWS
          </p>

          <h2>
            Հաճախորդների կարծիքները
          </h2>

        </div>


        <div className="reviews-container">


          {/* =====================
              LEFT
          ====================== */}

          <div className="reviews-list">


            {/* SUMMARY */}

            <div className="reviews-summary">

              <div className="reviews-score">

                <strong>
                  {comments.length > 0
                    ? roundedAverage
                    : "0.0"}
                </strong>


                <div className="reviews-summary-info">

                  <div className="reviews-stars">

                    {[1, 2, 3, 4, 5].map(
                      (star) => (

                        <span
                          key={star}
                          className={
                            star <=
                            Math.round(
                              averageRating
                            )
                              ? "review-star active"
                              : "review-star"
                          }
                        >
                          ★
                        </span>

                      )
                    )}

                  </div>


                  <p>

                    {comments.length ===
                    0
                      ? "Դեռ կարծիք չկա"

                      : `${comments.length} կարծիք`}

                  </p>

                </div>

              </div>

            </div>


            {/* COMMENTS LOADING */}

            {commentsLoading ? (

              <div className="no-reviews">

                <p>
                  Կարծիքները բեռնվում են...
                </p>

              </div>

            ) : comments.length ===
              0 ? (

              <div className="no-reviews">

                <div className="no-reviews-icon">
                  ☆
                </div>

                <h3>
                  Դեռ կարծիք չկա
                </h3>

                <p>
                  Եղեք առաջինը, ով կարծիք
                  կթողնի այս ապրանքի մասին։
                </p>

              </div>

            ) : (

              <div className="reviews-items">

                {comments.map(
                  (comment) => (

                    <div
                      className="review-item"

                      key={
                        comment._id
                      }
                    >

                      <div className="review-top">


                        <div className="review-user">

                          <div className="review-avatar">

                            {comment.name
                              ?.charAt(0)
                              ?.toUpperCase() ||
                              "?"}

                          </div>


                          <div className="review-user-info">

                            <strong>
                              {comment.name}
                            </strong>

                            <p>
                              {formatCommentDate(
                                comment.createdAt
                              )}
                            </p>

                          </div>

                        </div>


                        <div className="review-stars">

                          {[1, 2, 3, 4, 5].map(
                            (star) => (

                              <span

                                key={star}

                                className={
                                  star <=
                                  Number(
                                    comment.rating
                                  )

                                    ? "review-star active"

                                    : "review-star"
                                }
                              >

                                ★

                              </span>

                            )
                          )}

                        </div>

                      </div>


                      <p className="review-text">
                        {comment.text}
                      </p>

                    </div>

                  )
                )}

              </div>

            )}

          </div>


          {/* =====================
              ADD COMMENT
          ====================== */}

          <div className="add-review">

            <p className="add-review-label">
              YOUR REVIEW
            </p>

            <h3>
              Թողնել կարծիք
            </h3>

            <p className="add-review-description">

              Կիսվեք ձեր կարծիքով այս
              ապրանքի մասին։

            </p>


            <form
              onSubmit={
                handleCommentSubmit
              }
            >


              {/* NAME */}

              <div className="review-form-group">

                <label>
                  Ձեր անունը
                </label>

                <input
                  type="text"

                  value={
                    commentName
                  }

                  onChange={(e) =>
                    setCommentName(
                      e.target.value
                    )
                  }

                  placeholder="Օր․ Անի"

                  maxLength={50}
                />

              </div>


              {/* RATING */}

              <div className="review-form-group">

                <label>
                  Գնահատական
                </label>


                <div className="rating-selector">

                  {[1, 2, 3, 4, 5].map(
                    (star) => (

                      <button

                        key={star}

                        type="button"

                        className={
                          star <=
                          commentRating

                            ? "rating-star active"

                            : "rating-star"
                        }

                        onClick={() =>
                          setCommentRating(
                            star
                          )
                        }
                      >

                        ★

                      </button>

                    )
                  )}

                </div>

              </div>


              {/* TEXT */}

              <div className="review-form-group">

                <label>
                  Ձեր կարծիքը
                </label>

                <textarea

                  value={
                    commentText
                  }

                  onChange={(e) =>
                    setCommentText(
                      e.target.value
                    )
                  }

                  placeholder="Գրեք ձեր կարծիքը..."

                  rows={5}

                  maxLength={500}

                />


                <small>

                  {commentText.length}
                  /500

                </small>

              </div>


              {/* MESSAGE */}

              {commentMessage && (

                <div

                  className={
                    commentSuccess

                      ? "review-message success"

                      : "review-message error"
                  }
                >

                  {commentMessage}

                </div>

              )}


              {/* SUBMIT */}

              <button

                type="submit"

                className="submit-review-btn"

                disabled={
                  commentSubmitLoading
                }
              >

                {commentSubmitLoading
                  ? "Ուղարկվում է..."
                  : "Ուղարկել կարծիքը"}

              </button>

            </form>

          </div>

        </div>

      </section>

    </div>

  );

};