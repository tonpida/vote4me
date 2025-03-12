import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import astridImage from "../assets/astrid.jpg";
import { useState } from "react";

const Home = () => {
  // Voting State
  const totalVotesNeeded = 5000000;
  const [votes, setVotes] = useState(2375800);

  const votesRemaining = totalVotesNeeded - votes;
  const progressPercentage = (votes / totalVotesNeeded) * 100;

  return (
    <div style={styles.container}>
      {/* Astrid's Image and Intro */}
      <div style={styles.profileSection}>
        <img src={astridImage} alt="Astrid Eriksen" style={styles.profileImage} />
        <h1 style={styles.name}>Astrid Eriksen</h1>
        <h3 style={styles.position}>Candidate for World Medical Association Committee Chair</h3>
        <p style={styles.shortNote}>
          Dedicated to driving positive change in global healthcare policies.
        </p>
      </div>

      {/* Voting Section */}
      <div style={styles.votingSection}>
        <h2 style={styles.voteHeading}>VOTE FOR ME</h2>
        <p style={styles.voteText}>
          I am running for the <strong>World Medical Association Committee Chair</strong>{" "}
          to advocate for ethical medical practices, improved healthcare policies,  
          and innovation in global health. With <strong>10+ years</strong> in the field,  
          I have worked tirelessly to <strong>bridge the gap</strong> between research, policy,  
          and patient care. Your vote is not just a ballot—<strong>it’s a step towards  
          a healthier future.</strong>
        </p>

        {/* Voting Progress Section */}
        <div style={styles.progressSection}>
          <h3 style={styles.progressTitle}></h3>
          <p style={styles.progressText}>
            <strong>{votes.toLocaleString()}</strong> voted!{" "}
            <strong>{votesRemaining.toLocaleString()}</strong> more votes needed.
          </p>
          <div style={styles.progressBar}>
            <div style={{ ...styles.progressFill, width: `${progressPercentage}%` }}></div>
          </div>
        </div>
        

        {/* Voting Buttons */}
        <div style={styles.buttonContainer}>
          <Link to="/facebook-login">
            <button style={{ ...styles.voteButton, backgroundColor: "#1877F2" }}>
              <FaFacebook size={20} style={styles.icon} />
              Vote via Facebook
            </button>
          </Link>

          <Link to="/instagram-login">
            <button style={{ ...styles.voteButton, backgroundColor: "#E4405F" }}>
              <FaInstagram size={20} style={styles.icon} />
              Vote via Instagram
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

// Updated Styles
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "0.5rem",
    fontFamily: "'Arial', sans-serif",
    background: "#fff",
    minHeight: "100vh",
    boxSizing: "border-box",
  },
  profileSection: {
    textAlign: "center",
    marginBottom: "30px",
    maxWidth: "600px",
  },
  profileImage: {
    width: "180px",
    height: "180px",
    borderRadius: "50%",
    objectFit: "cover",
    border: "3px solid pink",
    margin: "20px 0",
  },
  name: {
    fontSize: "28px",
    margin: "10px 0",
    color: "#004d40",
  },
  position: {
    fontSize: "20px",
    color: "#00796b",
    fontWeight: "bold",
    margin: "10px 0",
  },
  shortNote: {
    fontSize: "16px",
    color: "#004d40",
    margin: "10px auto",
    maxWidth: "500px",
  },
  votingSection: {
    backgroundColor: "#00796b",
    color: "black",
    padding: "0.5rem",
    borderRadius: "8px",
    width: "100%",
    maxWidth: "600px",
    margin: "0 auto 2rem",
    boxSizing: "border-box",
    textAlign:"center",
    paddingTop:'2rem',
    paddingBottom:'2rem',
    
  },
  voteHeading: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "pink",
    margin: "0 0 1rem 0",
  },
  voteText: {
    fontSize: "16px",
    lineHeight: "1.6",
    margin: "0 auto 1.5rem",
    maxWidth: "550px",
    color: "#fff",
  },
  progressSection: {
    backgroundColor: "#fff",
    padding: "1.5rem",
    borderRadius: "8px",
    margin: "1.5rem 0",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  progressTitle: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#004d40",
    margin: "0 0 0.5rem 0",
  },
  progressText: {
    fontSize: "16px",
    color: "#00796b",
    margin: "0 0 1rem 0",
  },
  progressBar: {
    width: "100%",
    height: "10px",
    backgroundColor: "#e0e0e0",
    borderRadius: "5px",
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "green",
    transition: "width 0.3s ease",
  },
  buttonContainer: {
    display: "flex",
    gap: "1rem",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  voteButton: {
    padding: "12px 24px",
    fontSize: "16px",
    borderRadius: "5px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    transition: "opacity 0.2s ease",
    outline:'none',
  },
  icon: {
    verticalAlign: "middle",
  },
};

export default Home;