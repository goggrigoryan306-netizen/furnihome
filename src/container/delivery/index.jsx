import { Link } from "react-router";
import "./style.css";

export const MyDeliveryPage = () => {
  return (
    <main className="service-page">

      <section className="service-hero">
        <p>DELIVERY</p>
        <h1>Առաքում</h1>

        <span>
          Ձեր պատվերը կառաքենք արագ, անվտանգ և հարմար ժամանակահատվածում։
        </span>
      </section>

      <section className="service-container">

        <div className="service-title">
          <p>ՄԵՐ ԾԱՌԱՅՈՒԹՅՈՒՆԸ</p>
          <h2>Առաքման պայմաններ</h2>
        </div>

        <div className="service-grid">

          <article className="service-card">
            <div className="service-icon">🚚</div>

            <h3>Առաքում Երևանում</h3>

            <p>
              Երևանում պատվերները սովորաբար առաքվում են
              1-3 աշխատանքային օրվա ընթացքում։
            </p>
          </article>

          <article className="service-card">
            <div className="service-icon">📍</div>

            <h3>Առաքում մարզեր</h3>

            <p>
              Առաքում ենք Հայաստանի բոլոր մարզեր։
              Առաքման ժամկետը սովորաբար 2-5 աշխատանքային օր է։
            </p>
          </article>

          <article className="service-card">
            <div className="service-icon">📦</div>

            <h3>Անվտանգ տեղափոխում</h3>

            <p>
              Կահույքը փաթեթավորվում և տեղափոխվում է այնպես,
              որպեսզի նվազագույնի հասցվի վնասվելու հավանականությունը։
            </p>
          </article>

          <article className="service-card">
            <div className="service-icon">📞</div>

            <h3>Նախնական զանգ</h3>

            <p>
              Առաքումից առաջ մեր աշխատակիցը կապ կհաստատի Ձեզ հետ
              և կհաստատի առաքման ժամը։
            </p>
          </article>

        </div>

        <div className="service-note">
          <div>
            <h2>Հարցեր ունե՞ք առաքման մասին</h2>

            <p>
              Կապվեք մեզ հետ և մենք կտրամադրենք Ձեր պատվերի վերաբերյալ
              ամբողջ անհրաժեշտ տեղեկատվությունը։
            </p>
          </div>

          <Link to="/contact">
            Կապ մեզ հետ →
          </Link>
        </div>

      </section>

    </main>
  );
};