import React from "react";

const Navbar = () => {
  return (
    <header>
      <nav>
        <div className="logo">
          Home
        </div>
        <div className="auth">
          <button>Sign Up</button>
          <button>Login</button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
