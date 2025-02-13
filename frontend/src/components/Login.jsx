import React, { useState } from "react";
import API from "../api";

const Login = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      padding: "20px",
      backgroundColor: "#f3f4f6",
    },
    form: {
      backgroundColor: "white",
      padding: "2rem",
      borderRadius: "8px",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      width: "100%",
      maxWidth: "400px",
    },
    title: {
      fontSize: "1.5rem",
      fontWeight: "bold",
      marginBottom: "1.5rem",
      textAlign: "center",
      color: "#1f2937",
    },
    input: {
      width: "100%",
      padding: "0.75rem",
      marginBottom: "1rem",
      border: "1px solid #e5e7eb",
      borderRadius: "4px",
      fontSize: "1rem",
    },
    button: {
      width: "100%",
      padding: "0.75rem",
      backgroundColor: "#4f46e5",
      color: "white",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      marginBottom: "1rem",
      fontSize: "1rem",
      fontWeight: "500",
    },
    buttonDisabled: {
      backgroundColor: "#9ca3af",
      cursor: "not-allowed",
    },
    divider: {
      margin: "1rem 0",
      textAlign: "center",
      color: "#6b7280",
      position: "relative",
    },
    dividerLine: {
      borderTop: "1px solid #e5e7eb",
      position: "absolute",
      top: "50%",
      width: "100%",
      zIndex: "1",
    },
    dividerText: {
      backgroundColor: "white",
      padding: "0 10px",
      display: "inline-block",
      position: "relative",
      zIndex: "2",
    },
    error: {
      color: "#ef4444",
      marginBottom: "1rem",
      textAlign: "center",
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      console.log("Attempting login with:", { email, password });
      const response = await API.post("/login", { 
        email: email,
        password: password 
      });
      console.log("Login response:", response);
      
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        setUser(response.data.user);
      } else {
        throw new Error("No token received");
      }
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      alert(err.response?.data?.error || "Invalid credentials");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    // Include the redirect_uri as a query parameter
    const redirectUri = encodeURIComponent(
        `${window.location.origin}/google/callback`
      );
    window.location.href = `http://localhost:8080/auth/google?redirect_uri=${redirectUri}`;
  };

  return (
    <div style={styles.container}>
      <div style={styles.form}>
        <h2 style={styles.title}>Welcome Back</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
          />
          <button 
            type="submit" 
            style={{
              ...styles.button,
              ...(isLoading ? styles.buttonDisabled : {})
            }}
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Sign In"}
          </button>
        </form>

        <div style={styles.divider}>
          <div style={styles.dividerLine}></div>
          <span style={styles.dividerText}>or</span>
        </div>

        <button 
          onClick={handleGoogleLogin}
          style={{
            ...styles.button,
            backgroundColor: "#fff",
            color: "#374151",
            border: "1px solid #d1d5db",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
          }}
        >
          <img 
            src="https://www.google.com/favicon.ico" 
            alt="Google"
            style={{ width: "20px", height: "20px" }}
          />
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default Login;