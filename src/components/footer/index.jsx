import { Link } from "react-router";
import "./style.css";

export const MyFooter = () => {
  const handleSubscribe = (e) => {
    e.preventDefault();

    alert("Հաջողությամբ բաժանորդագրվեցիք");
  };

  return (
    <footer className="main-footer">
      <div className="footer-container">

        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            Furni<span>Home</span>
          </Link>

          <p>
            Ժամանակակից, որակյալ և հարմարավետ կահույք
            ձեր տան յուրաքանչյուր հատվածի համար։
          </p>

          <div className="footer-socials">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
            >
              f
            </a>

            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
            >
              ◎
            </a>

            <a
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
            >
              ▶
            </a>

            <a
              href="https://x.com"
              target="_blank"
              rel="noreferrer"
            >
              𝕏
            </a>
          </div>
        </div>

        <div className="footer-column">
          <h3>Մենյու</h3>

          <Link to="/">
            Գլխավոր
          </Link>

          <a href="/#products">
            Խանութ
          </a>

          <a href="/#categories">
            Տեսականի
          </a>

          <a href="/#about">
            Մեր մասին
          </a>

          <Link to="/contact">
            Կապ
          </Link>
        </div>

     <div className="footer-column">
  <h3>Օգնություն</h3>

  <Link to="/delivery">
    Առաքում
  </Link>

  <Link to="/payment">
    Վճարում
  </Link>

  <Link to="/warranty">
    Երաշխիք
  </Link>

  <Link to="/returns">
    Վերադարձ
  </Link>

  <Link to="/faq">
    FAQ
  </Link>
</div>

        <div className="footer-column">
          <h3>Կապ</h3>

          <p>
            Երևան, Հայաստան
          </p>

          <a href="tel:+37410123456">
            +374 10 123 456
          </a>

          <a href="mailto:info@furnihome.am">
            info@furnihome.am
          </a>

          <p>
            Երկ․ - Կիր․
          </p>

          <p>
            10:00 - 20:00
          </p>
        </div>

        <div className="footer-newsletter">
          <h3>
            Բաժանորդագրվեք
          </h3>

          <p>
            Ստացեք նոր ապրանքների, զեղչերի և հատուկ առաջարկների
            մասին տեղեկությունները առաջինը։
          </p>

          <form onSubmit={handleSubscribe}>
            <input
              type="email"
              placeholder="Ձեր email-ը"
              required
            />

            <button type="submit">
              →
            </button>
          </form>
        </div>

      </div>

      <div className="footer-bottom">
        <p>
          © 2026 FurniHome. Բոլոր իրավունքները պաշտպանված են։
        </p>

        <div>
          <a href="/">
            Գաղտնիության քաղաքականություն
          </a>

          <a href="/">
            Օգտագործման պայմաններ
          </a>
        </div>
      </div>
    </footer>
  );
};