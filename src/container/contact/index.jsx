import { Link } from "react-router";
import "./style.css";

export const MyContactPage = () => {
  const handleSubmit = (e) => {
    e.preventDefault();

    alert("Հաղորդագրությունը հաջողությամբ ուղարկված է");
  };

  return (
    <div className="contact-page">
      {/* HEADER */}
      <header className="contact-header">
        <Link to="/" className="contact-logo">
          Furni<span>Home</span>
        </Link>

        <nav className="contact-nav">
          <Link to="/">Գլխավոր</Link>

          <Link to="/#products">
            Խանութ
          </Link>

          <Link to="/#about">
            Մեր մասին
          </Link>

          <Link
            to="/contact"
            className="active"
          >
            Կապ
          </Link>
        </nav>

        <div className="header-icons">
          <button type="button">
            ⌕
          </button>

          <button type="button">
            ♙
          </button>

          <button
            type="button"
            className="cart-icon"
          >
            🛒

            <span>3</span>
          </button>
        </div>
      </header>

      {/* HERO */}
      <section className="contact-hero">
        <div className="hero-overlay"></div>

        <div className="contact-hero-content">
          <h1>
            Կապ մեզ հետ
          </h1>

          <p>
            Մենք այստեղ ենք՝ օգնելու։ Կապ հաստատեք մեզ հետ
            ցանկացած հարցով։
          </p>
        </div>
      </section>

      {/* CONTACT CONTENT */}
      <main className="contact-container">
        {/* CONTACT CARDS */}
        <section className="contact-cards">
          <div className="contact-card">
            <div className="contact-icon">
              ⌖
            </div>

            <div>
              <h3>
                Մեր հասցեն
              </h3>

              <p>
                Աբովյան 25
              </p>

              <p>
                Երևան, Հայաստան
              </p>
            </div>
          </div>

          <div className="contact-card">
            <div className="contact-icon">
              ☎
            </div>

            <div>
              <h3>
                Հեռախոս
              </h3>

              <p>
                +374 10 123 456
              </p>

              <p>
                Երկ․ - Կիր․ 10:00 - 20:00
              </p>
            </div>
          </div>

          <div className="contact-card">
            <div className="contact-icon">
              ✉
            </div>

            <div>
              <h3>
                Email
              </h3>

              <p>
                info@furnihome.am
              </p>

              <p>
                support@furnihome.am
              </p>
            </div>
          </div>

          <div className="contact-card">
            <div className="contact-icon">
              ◷
            </div>

            <div>
              <h3>
                Աշխատանքային ժամեր
              </h3>

              <p>
                Երկուշաբթի - Կիրակի
              </p>

              <p>
                10:00 - 20:00
              </p>
            </div>
          </div>
        </section>

        {/* FORM + MAP */}
        <section className="contact-main">
          {/* FORM */}
          <form
            className="contact-form"
            onSubmit={handleSubmit}
          >
            <div className="form-heading">
              <h2>
                Ուղարկեք հաղորդագրություն
              </h2>

              <p>
                Ունե՞ք հարց կամ օգնության կարիք։
                Լրացրեք ձևը և մենք կապ կհաստատենք ձեզ հետ։
              </p>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>
                  Անուն
                </label>

                <input
                  type="text"
                  placeholder="Ձեր անունը"
                  required
                />
              </div>

              <div className="form-group">
                <label>
                  Ազգանուն
                </label>

                <input
                  type="text"
                  placeholder="Ձեր ազգանունը"
                />
              </div>
            </div>

            <div className="form-group">
              <label>
                Email հասցե
              </label>

              <input
                type="email"
                placeholder="your@email.com"
                required
              />
            </div>

            <div className="form-group">
              <label>
                Հեռախոս
              </label>

              <input
                type="tel"
                placeholder="+374"
              />
            </div>

            <div className="form-group">
              <label>
                Թեմա
              </label>

              <select defaultValue="">
                <option
                  value=""
                  disabled
                >
                  Ընտրեք թեման
                </option>

                <option value="product">
                  Ապրանքի մասին
                </option>

                <option value="order">
                  Պատվերի մասին
                </option>

                <option value="delivery">
                  Առաքում
                </option>

                <option value="payment">
                  Վճարում
                </option>

                <option value="cooperation">
                  Համագործակցություն
                </option>

                <option value="other">
                  Այլ
                </option>
              </select>
            </div>

            <div className="form-group">
              <label>
                Հաղորդագրություն
              </label>

              <textarea
                rows="6"
                placeholder="Գրեք ձեր հաղորդագրությունը..."
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="submit-btn"
            >
              Ուղարկել հաղորդագրություն
            </button>
          </form>

          {/* RIGHT SIDE */}
          <div className="contact-right">
            {/* MAP */}
            <div className="map-box">
              <iframe
                title="FurniHome location"
                src="https://www.google.com/maps?q=Yerevan,Armenia&output=embed"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

            {/* SOCIAL */}
            <div className="social-box">
              <h2>
                Հետևեք մեզ
              </h2>

              <p>
                Հետևեք մեր նորություններին, նոր ապրանքներին,
                զեղչերին և հատուկ առաջարկներին։
              </p>

              <div className="social-icons">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="facebook"
                >
                  f
                </a>

                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="instagram"
                >
                  ◎
                </a>

                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  className="youtube"
                >
                  ▶
                </a>

                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noreferrer"
                  className="twitter"
                >
                  𝕏
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>


    </div>
  );
};