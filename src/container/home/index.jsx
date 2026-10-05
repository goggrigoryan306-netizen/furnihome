import { useEffect, useState } from "react";
import "./style.css";
import { products } from "../../data/products";
import { Link } from "react-router";
import { useWishlist } from "../../context/WishlistContext";

const slides = [
  {
    id: 1,
    smallTitle: "NEW COLLECTION 2026",
    title: "Կահույք, որը փոխում է քո տան մթնոլորտը",
    description:
      "Բացահայտիր ժամանակակից բազմոցներ, սեղաններ, աթոռներ և ինտերիերի բացառիկ լուծումներ։",
    image:
      "https://enzahome.hu/cdn/shop/files/Paloma_3_szemelyes_kanapeagy_1.webp?v=1745564699",
  },
  {
    id: 2,
    smallTitle: "BEDROOM COLLECTION",
    title: "Ստեղծիր քո իդեալական ննջասենյակը",
    description:
      "Հարմարավետ մահճակալներ, պահարաններ և նուրբ դիզայն՝ հանգիստ մթնոլորտի համար։",
    image:
      "https://shaten.am/wp-content/uploads/2026/03/izobrazhenie_viber_2026-03-14_13-21-29-100.jpg",
  },
  {
    id: 3,
    smallTitle: "MODERN INTERIOR",
    title: "Մինիմալիզմ և ժամանակակից դիզայն",
    description:
      "Կահույքի ընտրանի, որը համադրում է ոճը, որակը և հարմարավետությունը։",
    image:
      "https://grgroup.am/uploads/products/2023/03/9721c20.jpg",
  },
];

const categories = [
  {
    id: 1,
    title: "Բազմոցներ",
    slug: "sofas",
    count: "8 ապրանք",
    image:
      "https://melisa.am/image/cache/catalog/9847-750x1000.jpg",
  },

  {
    id: 2,
    title: "Ննջասենյակ",
    slug: "bedroom",
    count: "8 ապրանք",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFXFKGFTkoXG_ZH0etv7YzPmesKPX8YeTRY9oPv4rHms06Jo4G4vE-v74V&s=10",
  },

  {
    id: 3,
    title: "Սեղաններ",
    slug: "tables",
    count: "8 ապրանք",
    image:
      "https://niko.am/wp-content/uploads/2022/10/Poesia-Tables-04.jpg",
  },

  {
    id: 4,
    title: "Աթոռներ",
    slug: "chairs",
    count: "8 ապրանք",
    image:
      "https://furny.am/image/cache/catalog/products/Gold-Base-Velvet-Chair-Furny-1-430x491.png",
  },
];

export const MyHomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showAllProducts, setShowAllProducts] = useState(false);
  const {
    toggleWishlist,
    isInWishlist,
  } = useWishlist();
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + slides.length) % slides.length
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home-page">


      {/* HERO SLIDER */}
      <section className="hero">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`hero-slide ${currentSlide === index ? "active" : ""
              }`}
          >
            <img src={slide.image} alt={slide.title} />

            <div className="hero-overlay"></div>

            <div className="hero-content">
              <p className="hero-small">{slide.smallTitle}</p>

              <h1>{slide.title}</h1>

              <p className="hero-description">
                {slide.description}
              </p>

              <div className="hero-buttons">
                <Link to="/products" className="primary-btn">
                  Դիտել տեսականին
                  <span>→</span>
                </Link>

                <a href="#about" className="secondary-btn">
                  Մեր մասին
                </a>
              </div>
            </div>
          </div>
        ))}

        <button
          className="slider-arrow slider-prev"
          onClick={prevSlide}
        >
          ←
        </button>

        <button
          className="slider-arrow slider-next"
          onClick={nextSlide}
        >
          →
        </button>

        <div className="slider-dots">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={
                currentSlide === index ? "dot active" : "dot"
              }
            ></button>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className="features">
        <div className="feature-card">
          <span>🚚</span>
          <div>
            <h3>Արագ առաքում</h3>
            <p>Առաքում ամբողջ ՀՀ տարածքում</p>
          </div>
        </div>

        <div className="feature-card">
          <span>✓</span>
          <div>
            <h3>Բարձր որակ</h3>
            <p>Ընտրված և ստուգված կահույք</p>
          </div>
        </div>

        <div className="feature-card">
          <span>↻</span>
          <div>
            <h3>Երաշխիք</h3>
            <p>Պաշտոնական երաշխիք ապրանքների համար</p>
          </div>
        </div>

        <div className="feature-card">
          <span>☎</span>
          <div>
            <h3>Աջակցություն</h3>
            <p>Մենք միշտ պատրաստ ենք օգնել</p>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section id="categories" className="section categories-section">
        <div className="section-header">
          <div>
            <p className="section-small">ՄԵՐ ՏԵՍԱԿԱՆԻՆ</p>
            <h2>Ընտրիր ըստ կատեգորիայի</h2>
          </div>

        </div>

        <div className="categories-grid">
          {categories.map((category) => (
            <Link
              to={`/category/${category.slug}`}
              className="category-card"
              key={category.id}
            >
              <img
                src={category.image}
                alt={category.title}
              />

              <div className="category-overlay"></div>

              <div className="category-info">
                <h3>{category.title}</h3>

                <p>{category.count}</p>

                <span className="category-view">
                  Դիտել →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* PRODUCTS */}
      <section id="products" className="section products-section">
        <div className="section-header center">
          <div>
            <p className="section-small">BEST SELLERS</p>

            <h2>Հաճախորդների սիրելի կահույքը</h2>

            <p className="section-description">
              Բացահայտիր մեր ամենապահանջված և ամենաբարձր գնահատված
              մոդելները։
            </p>
          </div>
        </div>

        <div className="products-grid">
          {(showAllProducts ? products : products.slice(0, 4)).map(
            (product) => (
              <article className="product-card" key={product.id}>
                <Link
                  to={`/product/${product.id}`}
                  className="product-link"
                >
                  <div className="product-image">

                    <img
                      src={product.image}
                      alt={product.title}
                    />

                    {product.badge && (
                      <span className="product-badge">
                        {product.badge}
                      </span>
                    )}

                    <button
                      className={`favorite-btn ${isInWishlist(product.id) ? "saved" : ""
                        }`}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();

                        toggleWishlist(product);
                      }}
                    >
                      {isInWishlist(product.id) ? "♥" : "♡"}
                    </button>

                  </div>

                  <div className="product-content">
                    <p>{product.category}</p>

                    <h3>{product.title}</h3>

                    <div className="product-price">
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
            )
          )}
        </div>

        {products.length > 4 && (
          <div className="products-more">
            <button
              className="dark-btn"
              onClick={() => setShowAllProducts((prev) => !prev)}
            >
              {showAllProducts ? "Փակել տեսականին" : "Դիտել բոլորը"}

              <span>
                {showAllProducts ? "↑" : "→"}
              </span>
            </button>
          </div>
        )}


      </section>




      {/* PROMO */}
      <section className="promo-section">
        <div className="promo-image">
          <img
            src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1500&q=90"
            alt="Furniture collection"
          />
        </div>

        <div className="promo-content">
          <p className="section-small">SPECIAL OFFER</p>

          <h2>
            Մինչև <span>30% զեղչ</span> նոր հավաքածուի համար
          </h2>

          <p>
            Թարմացրու քո տան ինտերիերը նոր և ժամանակակից
            կահույքով։ Սահմանափակ առաջարկ ընտրված ապրանքների
            համար։
          </p>

          <Link
  to="/products?discount=true"
  className="dark-btn"
>
  Դիտել առաջարկները →
</Link>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="section about-section">
        <div className="about-images">
          <div className="about-image about-image-main">
            <img
              src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1000&q=90"
              alt="Modern interior"
            />
          </div>

          <div className="about-image about-image-small">
            <img
              src="https://divanidesign.com/assets/products/uploaded/furniture-sets-sofa-groups/soprano.webp"
              alt="Furniture"
            />
          </div>

          <div className="experience-badge">
            <strong>10+</strong>
            <span>տարի փորձ</span>
          </div>
        </div>

        <div className="about-content">
          <p className="section-small">
            ՄԵՐ ՄԱՍԻՆ
          </p>

          <h2>
            Կահույք, որը ստեղծված է երկար տարիներ ծառայելու համար
          </h2>

          <p>
            FURNIHOME-ը ժամանակակից կահույքի օնլայն խանութ է, որտեղ
            կարող ես գտնել կահույք տան յուրաքանչյուր հատվածի համար։
          </p>

          <p>
            Մենք կարևորում ենք ոչ միայն գեղեցիկ արտաքին տեսքը,
            այլ նաև հարմարավետությունը, ամրությունը և նյութերի
            բարձր որակը։
          </p>

          <div className="about-stats">
            <div>
              <strong>2500+</strong>
              <span>Հաճախորդ</span>
            </div>

            <div>
              <strong>500+</strong>
              <span>Ապրանք</span>
            </div>

            <div>
              <strong>98%</strong>
              <span>Գոհունակություն</span>
            </div>
          </div>

          <Link to="/contact" className="dark-btn">
            Կապ մեզ հետ →
          </Link>
        </div>
      </section>

      {/* INSPIRATION */}
      <section className="inspiration">
        <div className="inspiration-content">
          <p>INTERIOR INSPIRATION</p>
          <h2>Քո տունը։ Քո ոճը։ Քո պատմությունը։</h2>

          <a href="#products">
            Ստեղծիր քո ինտերիերը →
          </a>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="newsletter">
        <div>
          <p className="section-small">NEWSLETTER</p>
          <h2>
            Ստացիր նորություններ և հատուկ առաջարկներ
          </h2>
        </div>

        <form
          className="newsletter-form"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="email"
            placeholder="Քո էլ․ հասցեն"
          />

          <button type="submit">
            Բաժանորդագրվել →
          </button>
        </form>
      </section>


    </div>
  );
};