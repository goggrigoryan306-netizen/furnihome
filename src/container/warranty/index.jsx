import "./style.css";

export const MyWarrantyPage = () => {
  return (
    <main className="warranty-page">

      <section className="warranty-hero">
        <p>WARRANTY</p>

        <h1>Երաշխիք</h1>

        <span>
          Մենք վստահ ենք մեր կահույքի որակի վրա և տրամադրում ենք
          երաշխիքային սպասարկում։
        </span>
      </section>

      <section className="warranty-container">

        <div className="warranty-grid">

          <div className="warranty-main">
            <p className="warranty-small">
              OUR WARRANTY
            </p>

            <h2>
              Որակի երաշխիք
            </h2>

            <p>
              FurniHome-ում ներկայացված ապրանքների համար տրամադրվում է
              երաշխիք՝ կախված ապրանքի տեսակից և արտադրողից։
            </p>

            <p>
              Երաշխիքային ժամկետը կարող եք տեսնել յուրաքանչյուր ապրանքի
              էջում։
            </p>
          </div>


          <div className="warranty-items">

            <article>
              <span>✓</span>

              <div>
                <h3>Արտադրական թերություններ</h3>

                <p>
                  Երաշխիքը տարածվում է արտադրական թերությունների վրա։
                </p>
              </div>
            </article>

            <article>
              <span>🛠</span>

              <div>
                <h3>Վերանորոգում</h3>

                <p>
                  Անհրաժեշտության դեպքում իրականացվում է վերանորոգում
                  կամ համապատասխան մասի փոխարինում։
                </p>
              </div>
            </article>

            <article>
              <span>📄</span>

              <div>
                <h3>Գնման փաստաթուղթ</h3>

                <p>
                  Երաշխիքից օգտվելու համար անհրաժեշտ է պահպանել
                  գնումը հաստատող փաստաթուղթը։
                </p>
              </div>
            </article>

          </div>

        </div>


        <div className="warranty-warning">

          <h2>
            Երաշխիքը չի տարածվում
          </h2>

          <ul>
            <li>Սխալ կամ ոչ նպատակային օգտագործման դեպքում</li>
            <li>Մեխանիկական վնասվածքների դեպքում</li>
            <li>Ջրի, կրակի կամ այլ արտաքին ազդեցության դեպքում</li>
            <li>Ինքնուրույն փոփոխման կամ վերանորոգման դեպքում</li>
          </ul>

        </div>

      </section>

    </main>
  );
};