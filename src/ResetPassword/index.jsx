import { useState } from "react";
import { Link, useParams } from "react-router";
import "./style.css";

const API_URL =
  import.meta.env.VITE_API_URL || "http://192.168.1.6:5000";

const ResetPassword = () => {
  const { token } = useParams();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (!password || !confirmPassword) {
      setError("Խնդրում ենք լրացնել երկու դաշտերը");
      return;
    }

    if (password.length < 6) {
      setError(
        "Գաղտնաբառը պետք է պարունակի առնվազն 6 նիշ"
      );
      return;
    }

    if (password !== confirmPassword) {
      setError("Գաղտնաբառերը չեն համընկնում");
      return;
    }

    if (!token) {
      setError(
        "Գաղտնաբառի վերականգնման հղումը սխալ է"
      );
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `${API_URL}/api/auth/reset-password/${token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            password,
            confirmPassword,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Չհաջողվեց փոխել գաղտնաբառը"
        );
      }

      setMessage(
        data.message ||
          "Գաղտնաբառը հաջողությամբ փոխվել է։"
      );

      setPassword("");
      setConfirmPassword("");
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
    <div className="reset-password-page">
      <div className="reset-password-container">
        <div className="reset-password-card">

          <div className="reset-password-header">
            <h1>Նոր գաղտնաբառ</h1>

            <p>
              Մուտքագրեք ձեր նոր գաղտնաբառը։
            </p>
          </div>

          <form onSubmit={handleSubmit}>

            <div className="reset-password-form-group">
              <label htmlFor="password">
                Նոր գաղտնաբառ
              </label>

              <input
                id="password"
                type="password"
                placeholder="Մուտքագրեք նոր գաղտնաբառը"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                autoComplete="new-password"
              />
            </div>

            <div className="reset-password-form-group">
              <label htmlFor="confirmPassword">
                Կրկնել գաղտնաբառը
              </label>

              <input
                id="confirmPassword"
                type="password"
                placeholder="Կրկին մուտքագրեք գաղտնաբառը"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(e.target.value)
                }
                autoComplete="new-password"
              />
            </div>

            {error && (
              <div className="reset-password-error">
                {error}
              </div>
            )}

            {message && (
              <div className="reset-password-success">
                {message}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="reset-password-button"
            >
              {loading
                ? "Պահպանվում է..."
                : "Փոխել գաղտնաբառը"}
            </button>

          </form>

          <div className="reset-password-back">
            <Link to="/login">
              ← Գնալ մուտքի էջ
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ResetPassword;