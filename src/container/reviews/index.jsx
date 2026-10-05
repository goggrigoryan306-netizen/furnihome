import { useEffect, useState } from "react";

import "./style.css";

const initialReviews = [
  {
    id: 1,
    name: "Անի Մարտիրոսյան",
    date: "10 Սեպտեմբեր, 2026",
    rating: 5,
    text: "Շատ գոհ եմ սպասարկումից։ Բազմոցը շատ որակյալ էր և ամբողջությամբ համապատասխանում էր նկարներին։",
  },
  {
    id: 2,
    name: "Դավիթ Գրիգորյան",
    date: "5 Սեպտեմբեր, 2026",
    rating: 5,
    text: "Պատվերը ստացա ժամանակին։ Կահույքը շատ գեղեցիկ է և որակյալ։ Անպայման նորից կպատվիրեմ։",
  },
  {
    id: 3,
    name: "Մարիամ Սարգսյան",
    date: "29 Օգոստոս, 2026",
    rating: 4,
    text: "Շատ լավ ընտրանի կա։ Գները նույնպես նորմալ են։ Առաքումը մի փոքր ուշացավ, բայց ընդհանուր առմամբ գոհ եմ։",
  },
  {
    id: 4,
    name: "Գոռ Հովհաննիսյան",
    date: "21 Օգոստոս, 2026",
    rating: 5,
    text: "Գերազանց սպասարկում։ Օգնեցին ընտրել ճիշտ չափի սեղանը և շատ արագ կազմակերպեցին առաքումը։",
  },
];

export const MyReviewsPage = () => {
  const [reviews, setReviews] = useState(() => {
  const savedReviews = localStorage.getItem("reviews");

  return savedReviews
    ? JSON.parse(savedReviews)
    : initialReviews;
});

  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [rating, setRating] = useState(5);

  useEffect(() => {
  localStorage.setItem(
    "reviews",
    JSON.stringify(reviews)
  );
}, [reviews]);
  

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim() || !text.trim()) {
      return;
    }

    const newReview = {
      id: Date.now(),
      name: name.trim(),
      text: text.trim(),
      rating,
      date: new Date().toLocaleDateString("hy-AM"),
    };

    setReviews((prev) => [
      newReview,
      ...prev,
    ]);

    setName("");
    setText("");
    setRating(5);
  };

  return (
    <div className="reviews-page">

      {/* HEADER */}

      <section className="reviews-hero">
        <p className="reviews-small-title">
          CUSTOMER REVIEWS
        </p>

        <h1>
          Մեր հաճախորդների կարծիքները
        </h1>

        <p className="reviews-description">
          Մեզ համար կարևոր է յուրաքանչյուր հաճախորդի
          փորձն ու կարծիքը։
        </p>
      </section>


      {/* SUMMARY */}

      <section className="reviews-summary">

        <div className="reviews-rating-box">
          <strong>4.9</strong>

          <div className="summary-stars">
            ★★★★★
          </div>

          <p>
            {reviews.length} կարծիք
          </p>
        </div>

        <div className="reviews-summary-text">
          <h2>
            Ձեր վստահությունը մեր ամենամեծ գնահատականն է
          </h2>

          <p>
            Մենք մշտապես աշխատում ենք բարելավել
            սպասարկման որակը և առաջարկել հարմարավետ,
            գեղեցիկ ու որակյալ կահույք։
          </p>
        </div>

      </section>


      {/* REVIEWS */}

      <section className="reviews-section">

        <div className="reviews-section-title">
          <p>REVIEWS</p>

          <h2>
            Վերջին կարծիքները
          </h2>
        </div>

        <div className="reviews-grid">

          {reviews.map((review) => (
            <article
              className="review-card"
              key={review.id}
            >
              <div className="review-card-top">

                <div className="review-avatar">
                  {review.name.charAt(0)}
                </div>

                <div>
                  <h3>
                    {review.name}
                  </h3>

                  <span>
                    {review.date}
                  </span>
                </div>

              </div>

              <div className="review-stars">
                {"★".repeat(review.rating)}
                <span>
                  {"★".repeat(5 - review.rating)}
                </span>
              </div>

              <p className="review-text">
                {review.text}
              </p>

            </article>
          ))}

        </div>

      </section>


      {/* ADD REVIEW */}

      <section className="add-review-section">

        <div className="add-review-info">
          <p className="reviews-small-title">
            YOUR REVIEW
          </p>

          <h2>
            Կիսվեք Ձեր կարծիքով
          </h2>

          <p>
            Եթե արդեն օգտվել եք մեր ծառայություններից,
            պատմեք Ձեր փորձի մասին։
          </p>
        </div>


        <form
          className="review-form"
          onSubmit={handleSubmit}
        >

          <div className="form-group">
            <label>
              Անուն
            </label>

            <input
              type="text"
              placeholder="Ձեր անունը"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
            />
          </div>


          <div className="form-group">
            <label>
              Գնահատական
            </label>

            <div className="rating-select">

              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  className={
                    star <= rating
                      ? "rating-star active"
                      : "rating-star"
                  }
                  onClick={() =>
                    setRating(star)
                  }
                >
                  ★
                </button>
              ))}

            </div>
          </div>


          <div className="form-group">
            <label>
              Ձեր կարծիքը
            </label>

            <textarea
              rows="6"
              placeholder="Գրեք Ձեր կարծիքը..."
              value={text}
              onChange={(e) =>
                setText(e.target.value)
              }
            />
          </div>


          <button
            type="submit"
            className="submit-review-btn"
          >
            Ուղարկել կարծիքը
            <span>→</span>
          </button>

        </form>

      </section>

    </div>
  );
};