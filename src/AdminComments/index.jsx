import {
  useEffect,
  useState,
} from "react";

import "./style.css";

import { AdminComments } from "../../components/AdminComments";


const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000";


export const AdminComments = () => {
  const [comments, setComments] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [
    actionLoading,
    setActionLoading,
  ] = useState(null);

  const [message, setMessage] =
    useState("");


  // GET PENDING COMMENTS

  const getComments = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `${API_URL}/api/comments/admin/pending`
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Չհաջողվեց ստանալ կարծիքները"
        );
      }

      setComments(data);
    } catch (error) {
      console.log(
        "Comments error:",
        error
      );

      setMessage(
        error.message
      );
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    getComments();
  }, []);


  // APPROVE

  const approveComment = async (
    id
  ) => {
    try {
      setActionLoading(id);
      setMessage("");

      const response = await fetch(
        `${API_URL}/api/comments/admin/${id}/approve`,
        {
          method: "PATCH",
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Չհաջողվեց հաստատել"
        );
      }

      setComments((prev) =>
        prev.filter(
          (comment) =>
            comment._id !== id
        )
      );

      setMessage(
        "Կարծիքը հաջողությամբ հաստատվեց"
      );
    } catch (error) {
      setMessage(
        error.message
      );
    } finally {
      setActionLoading(null);
    }
  };


  // DELETE

  const deleteComment = async (
    id
  ) => {
    const confirmed =
      window.confirm(
        "Վստա՞հ եք, որ ցանկանում եք ջնջել այս կարծիքը"
      );

    if (!confirmed) {
      return;
    }

    try {
      setActionLoading(id);
      setMessage("");

      const response = await fetch(
        `${API_URL}/api/comments/admin/${id}`,
        {
          method: "DELETE",
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Չհաջողվեց ջնջել"
        );
      }

      setComments((prev) =>
        prev.filter(
          (comment) =>
            comment._id !== id
        )
      );

      setMessage(
        "Կարծիքը ջնջվեց"
      );
    } catch (error) {
      setMessage(
        error.message
      );
    } finally {
      setActionLoading(null);
    }
  };


  return (
    <section className="admin-comments">

      <div className="admin-comments-header">

        <div>

          <p className="admin-comments-label">
            REVIEWS
          </p>

          <h2>
            Հաճախորդների
            կարծիքներ
          </h2>

          <span>
            Հաստատեք կամ ջնջեք
            հաճախորդների ուղարկած
            կարծիքները։
          </span>

        </div>


        <div className="admin-comments-count">

          <strong>
            {comments.length}
          </strong>

          <span>
            սպասող
          </span>

        </div>

      </div>


      {message && (
        <div className="admin-comments-message">
          {message}
        </div>
      )}


      {loading ? (

        <div className="admin-comments-empty">
          Բեռնվում է...
        </div>

      ) : comments.length ===
        0 ? (

        <div className="admin-comments-empty">

          <div className="admin-comments-empty-icon">
            ✓
          </div>

          <h3>
            Չհաստատված
            կարծիքներ չկան
          </h3>

          <p>
            Նոր կարծիքները
            կհայտնվեն այստեղ։
          </p>

        </div>

      ) : (

        <div className="admin-comments-list">

          {comments.map(
            (comment) => (

              <article
                className="admin-comment-card"
                key={comment._id}
              >

                {/* PRODUCT */}

                <div className="admin-comment-product">

                  {comment.product
                    ?.image && (

                    <img
                      src={
                        comment
                          .product
                          .image
                      }
                      alt={
                        comment
                          .product
                          .title ||
                        "product"
                      }
                    />

                  )}


                  <div>

                    <span>
                      {
                        comment
                          .product
                          ?.category
                      }
                    </span>

                    <strong>
                      {
                        comment
                          .product
                          ?.title
                      }
                    </strong>

                  </div>

                </div>


                {/* USER */}

                <div className="admin-comment-user">

                  <div className="admin-comment-avatar">
                    {comment.name
                      ?.charAt(0)
                      ?.toUpperCase()}
                  </div>


                  <div>

                    <strong>
                      {comment.name}
                    </strong>

                    <span>
                      {new Date(
                        comment.createdAt
                      ).toLocaleString(
                        "hy-AM"
                      )}
                    </span>

                  </div>

                </div>


                {/* STARS */}

                <div className="admin-comment-stars">

                  {[
                    1,
                    2,
                    3,
                    4,
                    5,
                  ].map(
                    (star) => (

                      <span
                        key={
                          star
                        }
                        className={
                          star <=
                          Number(
                            comment.rating
                          )
                            ? "active"
                            : ""
                        }
                      >
                        ★
                      </span>

                    )
                  )}

                </div>


                {/* TEXT */}

                <p className="admin-comment-text">
                  {comment.text}
                </p>


                {/* ACTIONS */}

                <div className="admin-comment-actions">

                  <button
                    type="button"
                    className="admin-comment-approve"
                    disabled={
                      actionLoading ===
                      comment._id
                    }
                    onClick={() =>
                      approveComment(
                        comment._id
                      )
                    }
                  >
                    ✓ Հաստատել
                  </button>


                  <button
                    type="button"
                    className="admin-comment-delete"
                    disabled={
                      actionLoading ===
                      comment._id
                    }
                    onClick={() =>
                      deleteComment(
                        comment._id
                      )
                    }
                  >
                    Ջնջել
                  </button>

                </div>

              </article>

            )
          )}

        </div>

      )}

    </section>
  );
};