import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Profile from "./components/Profile";
import GoogleCallback from "./components/GoogleCallback";

function App() {
  const [user, setUser] = useState(null);
  console.log("user at app.jsx: ",user)

  return (
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
  );
}

export default App;