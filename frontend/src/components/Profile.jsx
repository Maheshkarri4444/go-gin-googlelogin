import React, { useEffect, useState } from "react";
import API from "../api";

const Profile = ({ user, setUser }) => {
  const [loading, setLoading] = useState(true);

  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      padding: "20px",
      backgroundColor: "#f3f4f6",
    },
    card: {
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
      marginBottom: "1rem",
      color: "#1f2937",
    },
    info: {
      marginBottom: "1rem",
    },
    label: {
      fontWeight: "500",
      color: "#4b5563",
      marginBottom: "0.25rem",
    },
    value: {
      color: "#1f2937",
    },
    button: {
      width: "100%",
      padding: "0.75rem",
      backgroundColor: "#ef4444",
      color: "white",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "1rem",
      fontWeight: "500",
    },
    profileImage: {
      width: "100px",
      height: "100px",
      borderRadius: "50%",
      marginBottom: "1rem",
      objectFit: "cover",
      border: "3px solid #e5e7eb",
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        console.log("Fetching profile data...");
        const { data } = await API.get("/profile");
        console.log("Profile data:", data);
        setUser(data.user);
      } catch (err) {
        console.error("Profile fetch error:", err.response?.data || err.message);
        alert("Failed to load profile. Please login again.");
        localStorage.removeItem("token");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [setUser]);

  const handleLogout = () => {
    console.log("Logging out...");
    localStorage.removeItem("token");
    setUser(null);
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <p style={{ textAlign: "center" }}>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Welcome, {user.name}</h2>
        {user.picture && (
          <img 
            src={user.picture} 
            alt="Profile" 
            style={styles.profileImage}
          />
        )}
        <div style={styles.info}>
          <p style={styles.label}>Email:</p>
          <p style={styles.value}>{user.email}</p>
        </div>
        <button onClick={handleLogout} style={styles.button}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;