import React, { useState, useEffect } from "react";
import axios from "axios";

const HomePage = () => {
  const [newUser, setNewUser] = useState({ name: "", email: "", msg: "" });
  const [users, setUsers] = useState([]);

  // Fetch users initially when the component loads
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/users");
        setUsers(response.data.allUser); // Assuming the data comes in 'allUser' field
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUsers(); // Call the function to fetch users on mount
  }, []); // The empty dependency array means this will run only once on mount

  // Handle form input changes
  const handleAddInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  // Handle form submission
  const handleAddSubmit = async (e) => {
    e.preventDefault();
    const { name, email, msg } = newUser;

    try {
      // Send the new user data to the backend
      const response = await axios.post("http://localhost:3000/users/signin", {
        name,
        email,
        msg,
      });

      alert("Successfully added");

      // Option 1: Add the new user directly to the state (optimistic update)
      setUsers([...users, response.data]);

      // Option 2 (optional): Refetch all users from the backend to ensure full sync
      const updatedUsers = await axios.get("http://localhost:3000/users");
      setUsers(updatedUsers.data.allUser); // Update state with fresh data from server

      // Reset the form
      setNewUser({ name: "", email: "", msg: "" });
    } catch (error) {
      console.error(
        "Error adding user:",
        error.response ? error.response.data : error.message
      );
      alert("Failed to add the user");
    }
  };

  return (
    <div className="mainCon">
      <div className="left">
        <div className="formContainer">
          <form onSubmit={handleAddSubmit}>
            <div className="data heading">Send Message</div>
            <div className="data">
              <div className="dataHeading">Name</div>
              <input
                type="text"
                name="name"
                value={newUser.name}
                onChange={handleAddInputChange}
                required
              />
            </div>
            <div className="data">
              <div className="dataHeading">Email</div>
              <input
                type="email"
                name="email"
                value={newUser.email}
                onChange={handleAddInputChange}
                required
              />
            </div>
            <div className="data">
              <div className="dataHeading">Message</div>
              <input
                type="text"
                name="msg"
                value={newUser.msg}
                onChange={handleAddInputChange}
                required
              />
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>

      <div className="right">
        <div className="stories-div">
          {users.map((user) => {
            const { _id, name, email, msg } = user;
            return (
              <div key={_id} className="card">
                <div className="card1">
                  <div className="top">
                    <h2 className="outData">
                      <span className="outHead">Name: </span> {name}
                    </h2>
                    <p className="outData">
                      <span className="outHead">Email: </span> {email}
                    </p>
                  </div>
                  <div className="bottom">
                    <p className="message">
                      <span className="outHead">Message: </span>
                      <div className="msg">{msg}</div>
                    </p>
                  </div>
                </div>
                <div className="hr"></div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
