import { useState } from "react";
import { Link, useNavigate } from "react-router";

import "./style.css";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://192.168.1.6:5000";

export const MyLoginPage = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

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

    if (!form.email || !form.password) {
      setError("Խնդրում ենք լրացնել բոլոր դաշտերը։");
      return;
    }

    if (form.password.length < 6) {
      setError(
        "Գաղտնաբառը պետք է լինի առնվազն 6 նիշ։"
      );
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/api/auth/login`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email: form.email,
            password: form.password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(
          data.message ||
            "Մուտք գործել չհաջողվեց։"
        );
        return;
      }

      localStorage.setItem(
        "token",
        data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      navigate("/");
    } catch (error) {
      console.log(error);

      setError(
        "Server-ի հետ կապի խնդիր կա։"
      );
    }
  };

  return (
    <main className="register-page">
      <section className="register-container">

        <div className="register-info">
          <p className="register-small-title">
            FURNIHOME
          </p>

          <h1>Բարի վերադարձ</h1>

          <p>
            Մուտք գործիր քո հաշիվ և շարունակիր
            բացահայտել մեր կահույքի տեսականին։
          </p>
        </div>

        <div className="register-card">

          <div className="register-header">
            <p>WELCOME BACK</p>

            <h2>Մուտք գործել</h2>

            <span>
              Մուտքագրիր քո տվյալները՝ հաշիվ
              մուտք գործելու համար։
            </span>
          </div>

          <form onSubmit={handleSubmit}>

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
                placeholder="Քո գաղտնաբառը"
                value={form.password}
                onChange={handleChange}
              />

              <div className="forgot-password-link">
                <Link to="/forgot-password">
                  Մոռացե՞լ ես գաղտնաբառը
                </Link>
              </div>
            </div>

            {error && (
              <p className="register-error">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="register-button"
            >
              Մուտք գործել
            </button>

          </form>

          <div className="register-login">
            <span>
              Դեռ չունե՞ս հաշիվ։
            </span>

            <Link to="/register">
              Գրանցվել
            </Link>
          </div>

        </div>
      </section>
    </main>
  );
};