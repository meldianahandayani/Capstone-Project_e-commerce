import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token"); // Cek status login berdasarkan token

  const handleLogout = () => {
    localStorage.removeItem("token"); // Menghapus token dari localStorage saat logout
    navigate("/login"); // Redirect ke halaman login
  };

  return (
    <header style={styles.header}>
      <h1 style={styles.title}>BUKAPEDIA</h1>
      <nav style={styles.nav}>
        <button style={styles.button} onClick={() => navigate("/")}>
          Home
        </button>
        {token && (
          <button style={styles.button} onClick={() => navigate("/cart")}>
            Cart
          </button>
        )}
        {token ? (
          <button style={styles.button} onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <button style={styles.button} onClick={() => navigate("/login")}>
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
    padding: "20px",
    backgroundColor: "#007bff",
    color: "white",
  },
  title: {
    margin: 0,
    fontSize: "24px",
  },
  nav: {
    display: "flex",
    gap: "10px",
  },
  button: {
    padding: "10px 15px",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default Header;
