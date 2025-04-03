import React from "react";
import {Link} from "react-router-dom"
import { FaCheckCircle } from "react-icons/fa"; // Green check icon from react-icons

const ThankYouPage: React.FC = () => {
  return (
    <div style={styles.container}>
      <div style={styles.content}>
        {/* Green check icon */}
        <FaCheckCircle style={styles.icon} />

        {/* Header */}
        <h1 style={styles.header}>Thank You for Your Vote!</h1>

        {/* Paragraph */}
        <p style={styles.paragraph}>
          Please <a>click here</a> to confirm your vote.
        </p>
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
  },
};

export default ThankYouPage;