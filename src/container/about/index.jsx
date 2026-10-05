import "./style.css";
export const MyAboutPage = () => {
  return (
    <main className="about-page">
      <section className="about-hero">
        <h1>Մեր մասին</h1>
        <p>
          Բացահայտիր մեր պատմությունը, արժեքները և այն մոտեցումը,
          որով ընտրում ենք յուրաքանչյուր կահույք։
        </p>
      </section>

      <section className="about-content">
        <div className="about-text">
          <p>ՄԵՐ ՊԱՏՄՈՒԹՅՈՒՆԸ</p>

          <h2>Կահույք՝ ստեղծված հարմարավետ կյանքի համար</h2>

          <p>
            Մենք առաջարկում ենք ժամանակակից, որակյալ և հարմարավետ
            կահույք տան յուրաքանչյուր հատվածի համար։
          </p>

          <p>
            Մեզ համար կարևոր է ոչ միայն գեղեցիկ դիզայնը, այլ նաև
            ամրությունը, հարմարավետությունը և երկար տարիների ծառայությունը։
          </p>
        </div>

        <div className="about-stats">
          <div>
            <strong>10+</strong>
            <span>Տարի փորձ</span>
          </div>

          <div>
            <strong>500+</strong>
            <span>Ապրանք</span>
          </div>

          <div>
            <strong>2500+</strong>
            <span>Հաճախորդ</span>
          </div>
        </div>
      </section>
    </main>
  );
};