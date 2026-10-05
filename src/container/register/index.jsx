import { useState } from "react";
import { Link, useNavigate } from "react-router";

import "./style.css";

export const MyRegisterPage = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  setError("");
  setSuccess("");

  if (
    !form.name ||
    !form.surname ||
    !form.email ||
    !form.password ||
    !form.confirmPassword
  ) {
    setError("Խնդրում ենք լրացնել բոլոր դաշտերը։");
    return;
  }

  if (form.password.length < 6) {
    setError(
      "Գաղտնաբառը պետք է լինի առնվազն 6 նիշ։"
    );

    return;
  }

  if (form.password !== form.confirmPassword) {
    setError("Գաղտնաբառերը չեն համընկնում։");

    return;
  }


  try {

    const response = await fetch(
      "http://localhost:5000/api/auth/register",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          name: form.name,
          surname: form.surname,
          email: form.email,
          password: form.password,
        }),
      }
    );


    const data = await response.json();


    if (!response.ok) {
      setError(data.message);
      return;
    }


    setSuccess(data.message);

  } catch (error) {

    setError("Server-ի հետ կապի խնդիր կա");

  }
};

  return (
    <main className="register-page">

      <section className="register-container">

        <div className="register-info">

          <p className="register-small-title">
            FURNIHOME
          </p>

          <h1>
            Բարի գալուստ
          </h1>

          <p>
            Գրանցվիր և բացահայտիր մեր կահույքի
            ամբողջ տեսականին։
          </p>

        </div>


        <div className="register-card">

          <div className="register-header">

            <p>
              CREATE ACCOUNT
            </p>

            <h2>
              Ստեղծել հաշիվ
            </h2>

            <span>
              Լրացրու տվյալները՝ հաշիվ ստեղծելու համար։
            </span>

          </div>


          <form onSubmit={handleSubmit}>

            <div className="register-row">

              <div className="register-field">

                <label htmlFor="name">
                  Անուն
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Քո անունը"
                  value={form.name}
                  onChange={handleChange}
                />

              </div>


              <div className="register-field">

                <label htmlFor="surname">
                  Ազգանուն
                </label>

                <input
                  id="surname"
                  name="surname"
                  type="text"
                  placeholder="Քո ազգանունը"
                  value={form.surname}
                  onChange={handleChange}
                />

              </div>

            </div>


            <div className="register-field">

              <label htmlFor="email">
                Email
              </label>

              <input
                id="email"
                name="email"
                type="email"
                placeholder="example@gmail.com"
                value={form.email}
                onChange={handleChange}
              />

            </div>


            <div className="register-field">

              <label htmlFor="password">
                Գաղտնաբառ
              </label>

              <input
                id="password"
                name="password"
                type="password"
                placeholder="Առնվազն 6 նիշ"
                value={form.password}
                onChange={handleChange}
              />

            </div>


            <div className="register-field">

              <label htmlFor="confirmPassword">
                Կրկնել գաղտնաբառը
              </label>

              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Կրկին գրիր գաղտնաբառը"
                value={form.confirmPassword}
                onChange={handleChange}
              />

            </div>


            {error && (
              <p className="register-error">
                {error}
              </p>
            )}


            {success && (
              <p className="register-success">
                {success}
              </p>
            )}


            <button
              type="submit"
              className="register-button"
            >
              Գրանցվել
            </button>

          </form>


          <div className="register-login">

            <span>
              Արդեն ունե՞ս հաշիվ։
            </span>

           <Link to="/login">
  Մուտք գործել
</Link>

          </div>

        </div>

      </section>

    </main>
  );
};