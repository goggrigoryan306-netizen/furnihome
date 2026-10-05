import "./style.css";

export const MyPaymentPage = () => {
  return (
    <main className="payment-page">

      <section className="payment-hero">
        <p>PAYMENT</p>
        <h1>Վճարում</h1>

        <span>
          Ընտրեք Ձեզ հարմար վճարման տարբերակը և կատարեք գնումը անվտանգ։
        </span>
      </section>

      <section className="payment-container">

        <div className="payment-title">
          <p>PAYMENT METHODS</p>
          <h2>Վճարման եղանակներ</h2>
        </div>

        <div className="payment-grid">

          <article className="payment-card">
            <span>💵</span>
            <h3>Կանխիկ վճարում</h3>

            <p>
              Կարող եք վճարել կանխիկ՝ ապրանքը ստանալու պահին։
            </p>
          </article>

          <article className="payment-card">
            <span>💳</span>
            <h3>Քարտով վճարում</h3>

            <p>
              Կարող եք վճարել Visa կամ Mastercard բանկային քարտով։
            </p>
          </article>

          <article className="payment-card">
            <span>🏦</span>
            <h3>Բանկային փոխանցում</h3>

            <p>
              Պատվերի համար հնարավոր է կատարել նաև բանկային փոխանցում։
            </p>
          </article>

          <article className="payment-card">
            <span>🔒</span>
            <h3>Անվտանգություն</h3>

            <p>
              Ձեր վճարային տվյալները պաշտպանված են և չեն պահպանվում
              FurniHome-ի կողմից։
            </p>
          </article>

        </div>

        <div className="payment-info">
          <h2>Կարևոր տեղեկատվություն</h2>

          <p>
            Վճարման եղանակը կարող եք ընտրել պատվերի ձևակերպման ժամանակ։
            Որոշ հատուկ կամ անհատական պատվերների դեպքում կարող է պահանջվել
            կանխավճար։
          </p>
        </div>

      </section>

    </main>
  );
};