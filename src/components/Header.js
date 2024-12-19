import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css";
    link.rel = "stylesheet";
    link.type = "text/css";
    document.head.appendChild(link);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header style={styles.header}>
      <h1 style={styles.title} onClick={() => navigate("/")}>
        <i className="fas fa-store" style={{ marginRight: "10px" }}></i>
        BUKAPEDIA
      </h1>
      <nav style={styles.nav}>
        <button
          style={{ ...styles.button, ...styles.homeButton }}
          onClick={() => navigate("/")}
        >
          <i className="fas fa-home" style={{ marginRight: "5px" }}></i>Home
        </button>
        {token && (
          <button
            style={{ ...styles.button, ...styles.cartButton }}
            onClick={() => navigate("/cart")}
          >
            <i
              className="fas fa-shopping-cart"
              style={{ marginRight: "5px" }}
            ></i>
            Cart
          </button>
        )}
        {token ? (
          <button
            style={{ ...styles.button, ...styles.logoutButton }}
            onClick={handleLogout}
          >
            <i
              className="fas fa-sign-out-alt"
              style={{ marginRight: "5px" }}
            ></i>
            Logout
          </button>
        ) : (
          <button
            style={{ ...styles.button, ...styles.loginButton }}
            onClick={() => navigate("/login")}
          >
            <i
              className="fas fa-sign-in-alt"
              style={{ marginRight: "5px" }}
            ></i>
            Login
          </button>
        )}
      </nav>
    </header>
  );
};

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 10%",
    backgroundColor: "#997950",
    color: "white",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    position: "sticky",
    top: 0,
    zIndex: 1000,
  },
  title: {
    margin: 0,
    fontSize: "28px",
    fontWeight: "bold",
    letterSpacing: "1px",
    cursor: "pointer",
  },
  nav: {
    display: "flex",
    gap: "15px",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    fontWeight: "500",
    border: "none",
    borderRadius: "25px",
    cursor: "pointer",
    transition: "background-color 0.3s, transform 0.2s",
    display: "flex",
    alignItems: "center",
  },
  homeButton: {
    backgroundColor: "#17a2b8",
    color: "white",
  },
  cartButton: {
    backgroundColor: "#ffc107",
    color: "black",
  },
  loginButton: {
    backgroundColor: "#28a745",
    color: "white",
  },
  logoutButton: {
    backgroundColor: "#dc3545",
    color: "white",
  },
};

export default Header;
