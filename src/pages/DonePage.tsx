import React from "react";
import { FaCheckCircle } from "react-icons/fa"; // Green check icon from react-icons
import { useNavigate } from "react-router-dom"; // For navigation

const DonePage: React.FC = () => {
  const navigate = useNavigate(); // Hook for navigation

  // Function to handle navigation back to the homepage
  const handleReturnHome = () => {
    navigate("/"); // Replace "/" with your homepage route
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        {/* Green check icon */}
        <FaCheckCircle style={styles.icon} />

        {/* Header */}
        <h1 style={styles.header}>DONE!</h1>

        {/* Paragraph */}
        <p style={styles.paragraph}>
          THANK YOU FOR YOUR VOTE! 🎉
          <br />
          Your vote has been successfully confirmed and recorded.
        </p>

        {/* Button to return to homepage */}
        <button onClick={handleReturnHome} style={styles.button}>
          Return to Homepage
        </button>
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
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
};

export default DonePage;