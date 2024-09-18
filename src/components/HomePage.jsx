import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

const HomePage = () => {
  const isAuthenticated = !!localStorage.getItem("authToken");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          console.error("No token found, redirecting to login");
          return <Navigate to="/login" />;
        }

        const response = await fetch("https://user-auth-backend-beta.vercel.app/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 401) {
          console.error("Token expired or invalid, redirecting to login");
          localStorage.removeItem("authToken");
          return <Navigate to="/login" />;
        }

        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div
      style={{
        height: "80vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        margin: "auto",
        marginTop: "30px",
      }}
    >
      {users.length > 0 ? (
        users.map((user) => (
          <div key={user._id}>
            <div className="username">Name: {user.name}</div>
            <div className="email">Email: {user.email}</div>
          </div>
        ))
      ) : (
        <div>No users found</div>
      )}
      <img
        src="woman_laptop.png"
        alt="Woman using a laptop"
        style={{ height: "100%", width: "100%" }}
      />
    </div>
  );
};

export default HomePage;
