import "./style.css";

export const MyReturnsPage = () => {
  return (
    <main className="returns-page">

      <section className="returns-hero">
        <p>RETURNS</p>

        <h1>Վերադարձ և փոխանակում</h1>

        <span>
          Ծանոթացեք ապրանքի վերադարձի և փոխանակման հիմնական պայմաններին։
        </span>
      </section>

      <section className="returns-container">

        <div className="returns-title">
          <p>RETURN PROCESS</p>

          <h2>
            Ինչպե՞ս վերադարձնել ապրանքը
          </h2>
        </div>

        <div className="return-steps">

          <article>
            <span>01</span>

            <h3>Կապվեք մեզ հետ</h3>

            <p>
              Տեղեկացրեք վերադարձի պատճառի մասին և նշեք պատվերի տվյալները։
            </p>
          </article>

          <article>
            <span>02</span>

            <h3>Ապրանքի ստուգում</h3>

            <p>
              Ապրանքը պետք է լինի չօգտագործված և պահպանված սկզբնական վիճակում։
            </p>
          </article>

          <article>
            <span>03</span>

            <h3>Վերադարձ կամ փոխանակում</h3>

            <p>
              Պայմաններին համապատասխանելու դեպքում կիրականացվի
              վերադարձ կամ փոխանակում։
            </p>
          </article>

        </div>


        <div className="returns-conditions">

          <h2>
            Վերադարձի պայմաններ
          </h2>

          <div>
            <p>✓ Ապրանքը չի օգտագործվել</p>
            <p>✓ Պահպանված է ապրանքի ամբողջական տեսքը</p>
            <p>✓ Առկա է գնումը հաստատող փաստաթուղթը</p>
            <p>✓ Ապրանքը չունի հաճախորդի կողմից առաջացած վնասվածք</p>
          </div>

        </div>

      </section>

    </main>
  );
};