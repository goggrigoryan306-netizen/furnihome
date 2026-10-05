import { useState } from "react";
import { Link } from "react-router";
import "./style.css";

const API_URL =
  import.meta.env.VITE_API_URL || "http://192.168.1.6:5000";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (!email.trim()) {
      setError("Խնդրում ենք մուտքագրել email-ը");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `${API_URL}/api/auth/forgot-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email.trim(),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Չհաջողվեց ուղարկել վերականգնման հղումը"
        );
      }

      setMessage(
        data.message ||
          "Եթե այս email-ը գրանցված է, վերականգնման հղումը կուղարկվի ձեր email-ին։"
      );

      setEmail("");
    } catch (error) {
      setError(
        error.message ||
          "Ինչ-որ բան սխալ է տեղի ունեցել։ Փորձեք կրկին։"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-password-page">
      <div className="forgot-password-container">
        <div className="forgot-password-card">

          <div className="forgot-password-header">
            <h1>Մոռացե՞լ եք գաղտնաբառը</h1>

            <p>
              Մուտքագրեք ձեր email հասցեն, և մենք ձեզ
              կուղարկենք գաղտնաբառը վերականգնելու հղումը։
            </p>
          </div>

          <form onSubmit={handleSubmit}>

            <div className="forgot-password-form-group">
              <label htmlFor="email">
                Email
              </label>

              <input
                id="email"
                type="email"
                placeholder="example@gmail.com"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                autoComplete="email"
              />
            </div>

            {error && (
              <div className="forgot-password-error">
                {error}
              </div>
            )}

            {message && (
              <div className="forgot-password-success">
                {message}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="forgot-password-button"
            >
              {loading
                ? "Ուղարկվում է..."
                : "Ուղարկել վերականգնման հղումը"}
            </button>

          </form>

          <div className="forgot-password-back">
            <Link to="/login">
              ← Վերադառնալ մուտքի էջ
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;