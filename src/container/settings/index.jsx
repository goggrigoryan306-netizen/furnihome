import {
  useEffect,
  useRef,
  useState,
} from "react";

import "./style.css";

const API_URL =
  "http://localhost:5000";

export const MySettingsPage = () => {
  // =====================================================
  // PASSWORD
  // =====================================================

  const [form, setForm] =
    useState({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  const [loading, setLoading] =
    useState(false);


  // =====================================================
  // PROFILE DATA
  // =====================================================

  const [
    profileData,
    setProfileData,
  ] = useState(null);

  const [
    profileLoading,
    setProfileLoading,
  ] = useState(true);

  const [
    profileError,
    setProfileError,
  ] = useState("");


  // =====================================================
  // PROFILE EDIT
  // =====================================================

  const [
    profileForm,
    setProfileForm,
  ] = useState({
    name: "",
    surname: "",
    phone: "",
    city: "",
    address: "",
    birthDate: "",
    bio: "",
  });

  const [
    profileSaving,
    setProfileSaving,
  ] = useState(false);

  const [
    profileEditError,
    setProfileEditError,
  ] = useState("");

  const [
    profileSuccess,
    setProfileSuccess,
  ] = useState("");


  // =====================================================
  // AVATAR
  // =====================================================

  const [
    avatarLoading,
    setAvatarLoading,
  ] = useState(false);

  const [
    avatarError,
    setAvatarError,
  ] = useState("");

  const fileInputRef =
    useRef(null);


  // =====================================================
  // TOKEN
  // =====================================================

  const getToken = () => {
    return localStorage.getItem(
      "token"
    );
  };


  // =====================================================
  // AVATAR URL
  // =====================================================

  const getAvatarUrl = (
    url
  ) => {
    if (!url) {
      return "";
    }

    if (
      url.startsWith(
        "http://"
      ) ||
      url.startsWith(
        "https://"
      )
    ) {
      return url;
    }

    return `${API_URL}${url}`;
  };


  // =====================================================
  // GET PROFILE DATA
  // =====================================================

  const getProfileData =
    async () => {
      try {
        setProfileLoading(
          true
        );

        setProfileError("");

        const token =
          getToken();

        const response =
          await fetch(
            `${API_URL}/api/auth/me/details`,
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        const data =
          await response.json();

        if (!response.ok) {
          throw new Error(
            data.message ||
              "Չհաջողվեց ստանալ տվյալները"
          );
        }

        setProfileData(
          data
        );


        // FORM DATA

        setProfileForm({
          name:
            data.user?.name ||
            "",

          surname:
            data.user
              ?.surname || "",

          phone:
            data.user?.phone ||
            "",

          city:
            data.user?.city ||
            "",

          address:
            data.user
              ?.address || "",

          birthDate:
            data.user
              ?.birthDate
              ? data.user.birthDate.slice(
                  0,
                  10
                )
              : "",

          bio:
            data.user?.bio ||
            "",
        });
      } catch (error) {
        console.log(
          error
        );

        setProfileError(
          error.message
        );
      } finally {
        setProfileLoading(
          false
        );
      }
    };


  useEffect(() => {
    getProfileData();
  }, []);


  // =====================================================
  // PROFILE CHANGE
  // =====================================================

  const handleProfileChange =
    (e) => {
      const {
        name,
        value,
      } = e.target;

      setProfileForm(
        (prev) => ({
          ...prev,

          [name]:
            value,
        })
      );

      setProfileEditError(
        ""
      );

      setProfileSuccess("");
    };


  // =====================================================
  // UPDATE PROFILE
  // =====================================================

  const handleProfileSubmit =
    async (e) => {
      e.preventDefault();

      try {
        setProfileSaving(
          true
        );

        setProfileEditError(
          ""
        );

        setProfileSuccess(
          ""
        );

        if (
          !profileForm.name.trim()
        ) {
          setProfileEditError(
            "Լրացրեք անունը"
          );

          return;
        }

        if (
          !profileForm.surname.trim()
        ) {
          setProfileEditError(
            "Լրացրեք ազգանունը"
          );

          return;
        }

        if (
          profileForm.bio.length >
          300
        ) {
          setProfileEditError(
            "Իմ մասին դաշտը չի կարող գերազանցել 300 նիշը"
          );

          return;
        }

        const token =
          getToken();

        const response =
          await fetch(
            `${API_URL}/api/auth/me/profile`,
            {
              method:
                "PUT",

              headers: {
                "Content-Type":
                  "application/json",

                Authorization:
                  `Bearer ${token}`,
              },

              body:
                JSON.stringify(
                  profileForm
                ),
            }
          );

        const data =
          await response.json();

        if (!response.ok) {
          throw new Error(
            data.message ||
              "Չհաջողվեց պահպանել փոփոխությունները"
          );
        }

        setProfileData(
          (prev) => ({
            ...prev,

            user:
              data.user,
          })
        );

        setProfileSuccess(
          data.message ||
            "Տվյալները պահպանվեցին"
        );

        // Եթե navbar-ում user-ն էլ պահում ես localStorage-ում
        const storedUser =
          localStorage.getItem(
            "user"
          );

        if (storedUser) {
          try {
            const parsedUser =
              JSON.parse(
                storedUser
              );

            localStorage.setItem(
              "user",
              JSON.stringify({
                ...parsedUser,

                name:
                  data.user
                    .name,

                surname:
                  data.user
                    .surname,

                avatar:
                  data.user
                    .avatar,
              })
            );
          } catch (error) {
            console.log(
              error
            );
          }
        }
      } catch (error) {
        console.log(
          error
        );

        setProfileEditError(
          error.message
        );
      } finally {
        setProfileSaving(
          false
        );
      }
    };


  // =====================================================
  // UPLOAD AVATAR
  // =====================================================

  const handleAvatarChange =
    async (e) => {
      const file =
        e.target.files?.[0];

      if (!file) {
        return;
      }

      setAvatarError("");

      if (
        !file.type.startsWith(
          "image/"
        )
      ) {
        setAvatarError(
          "Ընտրեք նկար"
        );

        return;
      }

      if (
        file.size >
        5 * 1024 * 1024
      ) {
        setAvatarError(
          "Նկարի չափը չպետք է գերազանցի 5MB-ը"
        );

        return;
      }

      try {
        setAvatarLoading(
          true
        );

        const token =
          getToken();

        const formData =
          new FormData();

        formData.append(
          "avatar",
          file
        );

        const response =
          await fetch(
            `${API_URL}/api/auth/me/avatar`,
            {
              method:
                "POST",

              headers: {
                Authorization:
                  `Bearer ${token}`,
              },

              body:
                formData,
            }
          );

        const data =
          await response.json();

        if (!response.ok) {
          throw new Error(
            data.message ||
              "Չհաջողվեց փոխել նկարը"
          );
        }

        setProfileData(
          (prev) => ({
            ...prev,

            user: {
              ...prev.user,

              avatar:
                data.avatar,
            },
          })
        );
      } catch (error) {
        console.log(
          error
        );

        setAvatarError(
          error.message
        );
      } finally {
        setAvatarLoading(
          false
        );

        if (
          fileInputRef.current
        ) {
          fileInputRef.current.value =
            "";
        }
      }
    };


  // =====================================================
  // DELETE AVATAR
  // =====================================================

  const handleDeleteAvatar =
    async () => {
      try {
        setAvatarLoading(
          true
        );

        setAvatarError("");

        const token =
          getToken();

        const response =
          await fetch(
            `${API_URL}/api/auth/me/avatar`,
            {
              method:
                "DELETE",

              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        const data =
          await response.json();

        if (!response.ok) {
          throw new Error(
            data.message ||
              "Չհաջողվեց ջնջել նկարը"
          );
        }

        setProfileData(
          (prev) => ({
            ...prev,

            user: {
              ...prev.user,

              avatar:
                data.avatar,
            },
          })
        );
      } catch (error) {
        console.log(
          error
        );

        setAvatarError(
          error.message
        );
      } finally {
        setAvatarLoading(
          false
        );
      }
    };


  // =====================================================
  // PROFILE COMPLETION
  // =====================================================

  const calculateProfileCompletion =
    () => {
      if (
        !profileData?.user
      ) {
        return 0;
      }

      const user =
        profileData.user;

      const fields = [
        user.name,
        user.surname,
        user.email,
        user.phone,
        user.city,
        user.address,
        user.birthDate,
        user.bio,
        user.avatar?.url,
      ];

      const completed =
        fields.filter(
          Boolean
        ).length;

      return Math.round(
        (completed /
          fields.length) *
          100
      );
    };


  // =====================================================
  // PASSWORD INPUT CHANGE
  // =====================================================

  const handleChange = (
    e
  ) => {
    setForm({
      ...form,

      [e.target.name]:
        e.target.value,
    });
  };


  // =====================================================
  // CHANGE PASSWORD
  // =====================================================

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      setError("");
      setSuccess("");

      if (
        !form.currentPassword ||
        !form.newPassword ||
        !form.confirmPassword
      ) {
        setError(
          "Լրացրեք բոլոր դաշտերը"
        );

        return;
      }

      if (
        form.newPassword.length <
        6
      ) {
        setError(
          "Նոր գաղտնաբառը պետք է լինի առնվազն 6 նիշ"
        );

        return;
      }

      if (
        form.newPassword !==
        form.confirmPassword
      ) {
        setError(
          "Նոր գաղտնաբառերը չեն համընկնում"
        );

        return;
      }

      try {
        setLoading(true);

        const token =
          getToken();

        const response =
          await fetch(
            `${API_URL}/api/auth/change-password`,
            {
              method:
                "PUT",

              headers: {
                "Content-Type":
                  "application/json",

                Authorization:
                  `Bearer ${token}`,
              },

              body:
                JSON.stringify(
                  form
                ),
            }
          );

        const data =
          await response.json();

        if (!response.ok) {
          setError(
            data.message
          );

          return;
        }

        setSuccess(
          data.message
        );

        setForm({
          currentPassword:
            "",

          newPassword:
            "",

          confirmPassword:
            "",
        });
      } catch (error) {
        console.log(
          error
        );

        setError(
          "Server-ի հետ կապի խնդիր"
        );
      } finally {
        setLoading(false);
      }
    };


  // =====================================================
  // RETURN
  // =====================================================

  return (
    <div className="settings-page">

      <div className="settings-container">

        <h1>
          Իմ պրոֆիլը
        </h1>


        {profileLoading ? (

          <div className="profile-loading">
            Բեռնվում է...
          </div>

        ) : profileError ? (

          <div className="profile-error">
            {profileError}
          </div>

        ) : profileData ? (

          <>

            {/* =====================================
                PROFILE CARD
            ====================================== */}

            <div className="profile-card">

              <div className="profile-avatar-section">

                <div className="profile-avatar">

                  {profileData.user
                    ?.avatar?.url ? (

                    <img
                      src={getAvatarUrl(
                        profileData
                          .user
                          .avatar
                          .url
                      )}
                      alt={
                        profileData
                          .user
                          .name ||
                        "Profile"
                      }
                    />

                  ) : (

                    <span>
                      {(
                        profileData
                          .user
                          .name ||
                        profileData
                          .user
                          .email ||
                        "?"
                      )
                        .charAt(
                          0
                        )
                        .toUpperCase()}
                    </span>

                  )}

                </div>


                <div className="profile-avatar-actions">

                  <label className="avatar-upload-button">

                    {avatarLoading
                      ? "Բեռնվում է..."
                      : "Փոխել նկարը"}

                    <input
                      ref={
                        fileInputRef
                      }
                      type="file"
                      accept="image/*"
                      onChange={
                        handleAvatarChange
                      }
                      disabled={
                        avatarLoading
                      }
                      hidden
                    />

                  </label>


                  {profileData.user
                    ?.avatar
                    ?.url && (

                    <button
                      type="button"
                      className="avatar-delete-button"
                      onClick={
                        handleDeleteAvatar
                      }
                      disabled={
                        avatarLoading
                      }
                    >
                      Ջնջել
                    </button>

                  )}

                </div>

              </div>


              <div className="profile-main-info">

                <h2>
                  {
                    profileData
                      .user
                      .name
                  }{" "}

                  {
                    profileData
                      .user
                      .surname
                  }
                </h2>


                <span className="profile-email">
                  {
                    profileData
                      .user
                      .email
                  }
                </span>


                <div className="profile-meta">

                  <span
                    className={
                      profileData
                        .user
                        .isVerified
                        ? "profile-verified"
                        : "profile-not-verified"
                    }
                  >
                    {profileData
                      .user
                      .isVerified
                      ? "✓ Email-ը հաստատված է"
                      : "Email-ը հաստատված չէ"}
                  </span>


                  <span>

                    Գրանցվել է՝{" "}

                    {profileData
                      .user
                      .createdAt
                      ? new Date(
                          profileData
                            .user
                            .createdAt
                        ).toLocaleDateString(
                          "hy-AM"
                        )
                      : "—"}

                  </span>

                </div>

              </div>

            </div>


            {avatarError && (
              <p className="profile-form-error">
                {avatarError}
              </p>
            )}


            {/* =====================================
                PROFILE COMPLETION
            ====================================== */}

            <div className="profile-completion">

              <div className="profile-completion-header">

                <span>
                  Պրոֆիլի լրացվածություն
                </span>

                <strong>
                  {calculateProfileCompletion()}%
                </strong>

              </div>


              <div className="profile-progress">

                <div
                  className="profile-progress-value"
                  style={{
                    width:
                      `${calculateProfileCompletion()}%`,
                  }}
                />

              </div>

            </div>


            {/* =====================================
                STATS
            ====================================== */}

            <div className="profile-stats">

              <div>

                <span>
                  Պատվերներ
                </span>

                <strong>
                  {profileData
                    .stats
                    .ordersCount}
                </strong>

              </div>


              <div>

                <span>
                  Գնված ապրանքներ
                </span>

                <strong>
                  {profileData
                    .stats
                    .totalProducts}
                </strong>

              </div>


              <div>

                <span>
                  Ընդհանուր գնումներ
                </span>

                <strong>

                  {Number(
                    profileData
                      .stats
                      .totalSpent ||
                      0
                  ).toLocaleString(
                    "hy-AM"
                  )}{" "}

                  ֏

                </strong>

              </div>


              <div>

                <span>
                  Մեկնաբանություններ
                </span>

                <strong>
                  {profileData
                    .stats
                    ?.commentsCount ??
                    0}
                </strong>

              </div>

            </div>


            {/* =====================================
                PERSONAL INFORMATION
            ====================================== */}

            <div className="profile-edit-card">

              <div className="profile-edit-header">

                <div>

                  <h2>
                    Անձնական տվյալներ
                  </h2>

                  <p>
                    Թարմացրեք ձեր
                    անձնական տվյալները
                  </p>

                </div>

              </div>


              <form
                onSubmit={
                  handleProfileSubmit
                }
                className="profile-edit-form"
              >

                <div className="profile-edit-grid">


                  <div className="profile-field">

                    <label>
                      Անուն
                    </label>

                    <input
                      type="text"
                      name="name"
                      value={
                        profileForm
                          .name
                      }
                      onChange={
                        handleProfileChange
                      }
                      placeholder="Անուն"
                    />

                  </div>


                  <div className="profile-field">

                    <label>
                      Ազգանուն
                    </label>

                    <input
                      type="text"
                      name="surname"
                      value={
                        profileForm
                          .surname
                      }
                      onChange={
                        handleProfileChange
                      }
                      placeholder="Ազգանուն"
                    />

                  </div>


                  <div className="profile-field">

                    <label>
                      Email
                    </label>

                    <input
                      type="email"
                      value={
                        profileData
                          .user
                          .email
                      }
                      disabled
                    />

                  </div>


                  <div className="profile-field">

                    <label>
                      Հեռախոսահամար
                    </label>

                    <input
                      type="tel"
                      name="phone"
                      value={
                        profileForm
                          .phone
                      }
                      onChange={
                        handleProfileChange
                      }
                      placeholder="+374 XX XX XX XX"
                    />

                  </div>


                  <div className="profile-field">

                    <label>
                      Քաղաք
                    </label>

                    <input
                      type="text"
                      name="city"
                      value={
                        profileForm
                          .city
                      }
                      onChange={
                        handleProfileChange
                      }
                      placeholder="Երևան"
                    />

                  </div>


                  <div className="profile-field">

                    <label>
                      Ծննդյան ամսաթիվ
                    </label>

                    <input
                      type="date"
                      name="birthDate"
                      value={
                        profileForm
                          .birthDate
                      }
                      onChange={
                        handleProfileChange
                      }
                    />

                  </div>


                  <div className="profile-field profile-full-field">

                    <label>
                      Հասցե
                    </label>

                    <input
                      type="text"
                      name="address"
                      value={
                        profileForm
                          .address
                      }
                      onChange={
                        handleProfileChange
                      }
                      placeholder="Փողոց, տուն, բնակարան"
                    />

                  </div>


                  <div className="profile-field profile-full-field">

                    <label>
                      Իմ մասին
                    </label>

                    <textarea
                      name="bio"
                      value={
                        profileForm
                          .bio
                      }
                      onChange={
                        handleProfileChange
                      }
                      maxLength={
                        300
                      }
                      rows={
                        5
                      }
                      placeholder="Մի փոքր ձեր մասին..."
                    />


                    <span className="profile-bio-counter">

                      {
                        profileForm
                          .bio
                          .length
                      }

                      /300

                    </span>

                  </div>

                </div>


                {profileEditError && (

                  <p className="profile-form-error">
                    {
                      profileEditError
                    }
                  </p>

                )}


                {profileSuccess && (

                  <p className="profile-form-success">
                    {
                      profileSuccess
                    }
                  </p>

                )}


                <button
                  type="submit"
                  className="save-profile-button"
                  disabled={
                    profileSaving
                  }
                >

                  {profileSaving
                    ? "Պահպանվում է..."
                    : "Պահպանել փոփոխությունները"}

                </button>

              </form>

            </div>


            {/* =====================================
                ORDERS
            ====================================== */}

            <div className="profile-section">

              <h2>
                Իմ գնումները
              </h2>


              {!profileData.orders ||
              profileData.orders
                .length === 0 ? (

                <div className="profile-empty">
                  Դուք դեռ պատվերներ
                  չունեք։
                </div>

              ) : (

                <div className="profile-orders">

                  {profileData.orders.map(
                    (
                      order,
                      index
                    ) => (

                    <div
                      className="profile-order"
                      key={
                        order._id
                      }
                    >

                      <div className="profile-order-header">

                        <div>

                          <span>
                            Պատվեր #
                            {profileData
                              .orders
                              .length -
                              index}
                          </span>

                          <strong>

                            {order.createdAt
                              ? new Date(
                                  order.createdAt
                                ).toLocaleDateString(
                                  "hy-AM"
                                )
                              : "—"}

                          </strong>

                        </div>


                        <strong className="profile-order-price">

                          {Number(
                            order.totalPrice ||
                              0
                          ).toLocaleString(
                            "hy-AM"
                          )}{" "}

                          ֏

                        </strong>

                      </div>


                      <div className="profile-order-items">

                        {(order.items ||
                          []).map(
                          (
                            item,
                            itemIndex
                          ) => {

                            const product =
                              typeof item.product ===
                              "object"
                                ? item.product
                                : null;

                            return (

                              <div
                                className="profile-order-item"
                                key={
                                  item._id ||
                                  itemIndex
                                }
                              >

                                {(product?.image ||
                                  item.image) && (

                                  <img
                                    src={
                                      product?.image ||
                                      item.image
                                    }
                                    alt={
                                      product?.title ||
                                      item.title ||
                                      "Ապրանք"
                                    }
                                  />

                                )}


                                <div className="profile-order-item-info">

                                  <strong>
                                    {product?.title ||
                                      item.title ||
                                      "Ապրանք"}
                                  </strong>


                                  <span>
                                    Քանակ՝{" "}
                                    {item.quantity ||
                                      1}
                                  </span>


                                  {item.color && (

                                    <span>
                                      Գույն՝{" "}
                                      {
                                        item.color
                                      }
                                    </span>

                                  )}

                                </div>


                                <strong>

                                  {Number(
                                    item.price ||
                                      product?.price ||
                                      0
                                  ).toLocaleString(
                                    "hy-AM"
                                  )}{" "}

                                  ֏

                                </strong>

                              </div>

                            );
                          }
                        )}

                      </div>


                      <div className="profile-order-footer">

                        <span>
                          Կարգավիճակ
                        </span>

                        <strong>
                          {order.status ||
                            "pending"}
                        </strong>

                      </div>

                    </div>

                  ))}

                </div>

              )}

            </div>


            {/* =====================================
                COMMENTS
            ====================================== */}

            <div className="profile-section">

              <h2>
                Իմ մեկնաբանությունները
              </h2>


              {!profileData.comments ||
              profileData.comments
                .length === 0 ? (

                <div className="profile-empty">
                  Դուք դեռ
                  մեկնաբանություններ
                  չեք գրել։
                </div>

              ) : (

                <div className="profile-comments">

                  {profileData.comments.map(
                    (
                      comment
                    ) => {

                      const product =
                        typeof comment.product ===
                        "object"
                          ? comment.product
                          : null;

                      return (

                        <div
                          className="profile-comment"
                          key={
                            comment._id
                          }
                        >

                          <div className="profile-comment-header">

                            <div className="profile-comment-product">

                              {product?.image && (

                                <img
                                  src={
                                    product.image
                                  }
                                  alt={
                                    product.title ||
                                    "Ապրանք"
                                  }
                                />

                              )}


                              <div>

                                <span>
                                  Ապրանք
                                </span>

                                <strong>
                                  {product?.title ||
                                    "Ապրանք"}
                                </strong>

                              </div>

                            </div>


                            <div className="profile-comment-rating">

                              {[1, 2, 3, 4, 5].map(
                                (
                                  star
                                ) => (

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

                              ))}

                            </div>

                          </div>


                          <p className="profile-comment-text">
                            {
                              comment.text
                            }
                          </p>


                          <div className="profile-comment-footer">

                            <span>

                              {comment.createdAt
                                ? new Date(
                                    comment.createdAt
                                  ).toLocaleDateString(
                                    "hy-AM"
                                  )
                                : "—"}

                            </span>


                            <span>

                              Գնահատական՝{" "}

                              <strong>
                                {
                                  comment.rating
                                }
                                /5
                              </strong>

                            </span>

                          </div>

                        </div>

                      );
                    }
                  )}

                </div>

              )}

            </div>

          </>

        ) : null}


        {/* =====================================
            PASSWORD
        ====================================== */}

        <div className="password-card">

          <h2>
            Փոխել գաղտնաբառը
          </h2>


          <form
            onSubmit={
              handleSubmit
            }
          >

            <div className="settings-field">

              <label>
                Հին գաղտնաբառ
              </label>

              <input
                type="password"
                name="currentPassword"
                value={
                  form.currentPassword
                }
                onChange={
                  handleChange
                }
                placeholder="Հին գաղտնաբառ"
              />

            </div>


            <div className="settings-field">

              <label>
                Նոր գաղտնաբառ
              </label>

              <input
                type="password"
                name="newPassword"
                value={
                  form.newPassword
                }
                onChange={
                  handleChange
                }
                placeholder="Նոր գաղտնաբառ"
              />

            </div>


            <div className="settings-field">

              <label>
                Կրկնել նոր գաղտնաբառը
              </label>

              <input
                type="password"
                name="confirmPassword"
                value={
                  form.confirmPassword
                }
                onChange={
                  handleChange
                }
                placeholder="Կրկնել նոր գաղտնաբառը"
              />

            </div>


            {error && (

              <p className="error-message">
                {error}
              </p>

            )}


            {success && (

              <p className="success-message">
                {success}
              </p>

            )}


            <button
              type="submit"
              className="change-password-button"
              disabled={
                loading
              }
            >

              {loading
                ? "Պահպանվում է..."
                : "Փոխել գաղտնաբառը"}

            </button>

          </form>

        </div>

      </div>

    </div>
  );
};