import { useState } from "react";

import "./style.css";

const questions = [
  {
    id: 1,
    question: "Ինչպե՞ս կարող եմ պատվեր կատարել։",
    answer:
      "Ընտրեք ցանկալի ապրանքը, ավելացրեք այն զամբյուղ և շարունակեք պատվերի ձևակերպման գործընթացը։",
  },
  {
    id: 2,
    question: "Առաքում իրականացնու՞մ եք մարզեր։",
    answer:
      "Այո, FurniHome-ը իրականացնում է առաքում Հայաստանի տարբեր մարզեր։ Առաքման ժամկետը կախված է հասցեից։",
  },
  {
    id: 3,
    question: "Կարո՞ղ եմ վճարել առաքման պահին։",
    answer:
      "Այո, համապատասխան պատվերների դեպքում հնարավոր է կանխիկ վճարում ապրանքը ստանալու պահին։",
  },
  {
    id: 4,
    question: "Կահույքն ունի՞ երաշխիք։",
    answer:
      "Այո։ Երաշխիքի ժամկետը կախված է ապրանքի տեսակից և նշված է ապրանքի էջում։",
  },
  {
    id: 5,
    question: "Ինչպե՞ս կարող եմ վերադարձնել ապրանքը։",
    answer:
      "Կապվեք մեզ հետ՝ նշելով պատվերի տվյալները։ Ապրանքը պետք է համապատասխանի վերադարձի պայմաններին։",
  },
  {
    id: 6,
    question: "Կարո՞ղ եմ չեղարկել պատվերը։",
    answer:
      "Եթե պատվերը դեռ չի հանձնվել առաքման ծառայությանը, կարող եք կապվել մեզ հետ և պահանջել չեղարկում։",
  },
  {
    id: 7,
    question: "Կարո՞ղ եմ պատվիրել անհատական չափսերով կահույք։",
    answer:
      "Որոշ ապրանքների դեպքում հնարավոր է անհատական պատվեր։ Մանրամասների համար անհրաժեշտ է կապվել մեզ հետ։",
  },
];

export const MyFAQPage = () => {
  const [openQuestion, setOpenQuestion] = useState(null);

  const toggleQuestion = (id) => {
    setOpenQuestion(
      openQuestion === id
        ? null
        : id
    );
  };

  return (
    <main className="faq-page">

      <section className="faq-hero">

        <p>FAQ</p>

        <h1>
          Հաճախ տրվող հարցեր
        </h1>

        <span>
          Այստեղ կարող եք գտնել ամենատարածված հարցերի պատասխանները։
        </span>

      </section>


      <section className="faq-section">

        <div className="faq-heading">
          <p>QUESTIONS & ANSWERS</p>

          <h2>
            Ինչո՞վ կարող ենք օգնել
          </h2>
        </div>


        <div className="faq-list">

          {questions.map((item) => (

            <article
              key={item.id}
              className={
                openQuestion === item.id
                  ? "faq-box active"
                  : "faq-box"
              }
            >

              <button
                type="button"
                onClick={() =>
                  toggleQuestion(item.id)
                }
              >

                <span>
                  {item.question}
                </span>

                <strong>
                  {openQuestion === item.id
                    ? "−"
                    : "+"}
                </strong>

              </button>


              {openQuestion === item.id && (

                <div className="faq-box-answer">
                  <p>
                    {item.answer}
                  </p>
                </div>

              )}

            </article>

          ))}

        </div>

      </section>

    </main>
  );
};