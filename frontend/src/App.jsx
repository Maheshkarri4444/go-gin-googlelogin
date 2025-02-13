import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Login from "./components/Login";
import Profile from "./components/Profile";
import GoogleCallback from "./components/GoogleCallback";

function App() {
  const [user, setUser] = useState(null);

  return (
    <GoogleOAuthProvider clientId="1099222649049-ck2huj48b9o3mgmouqfnkl5912m4f4n7.apps.googleusercontent.com">
      <Router>
        <div style={{ minHeight: "100vh", backgroundColor: "#f3f4f6" }}>
          <Routes>
            <Route
              path="/login"
              element={user ? <Navigate to="/profile" /> : <Login setUser={setUser} />}
            />
            <Route
              path="/profile"
              element={user ? <Profile user={user} setUser={setUser} /> : <Navigate to="/login" />}
            />
            <Route
              path="/google/callback"
              element={<GoogleCallback setUser={setUser} />}
            />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </div>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App