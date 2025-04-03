// CodeList.tsx
import React, { useState, useEffect } from 'react';
import { useSite } from '../context/SiteContext';

interface Code {
  id: number;
  code: string;
  created_at: string;
}

const CodeList: React.FC = () => {
  const [codes, setCodes] = useState<Code[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { siteId } = useSite();

  useEffect(() => {
    if (!siteId) return;

    const fetchCodes = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `https://bossj.pythonanywhere.com/api/search/codes/?site_id=${siteId}`
        );
        
        if (!response.ok) throw new Error(`Error: ${response.statusText}`);
        const data = await response.json();
        setCodes(data);
      } catch (err) {
        setError("Failed to fetch codes. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchCodes();
  }, [siteId]);

  return (
    <div className="container">
      <h2 className="header">Code List</h2>

      {loading && <p className="status-message">Loading codes...</p>}
      {error && <p className="error-message">{error}</p>}

      {!loading && !error && codes.length === 0 && (
        <p className="status-message">No codes found.</p>
      )}

      {!loading && !error && codes.length > 0 && (
        <table className="data-table">
          <thead>
            <tr>
              <th>Code</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {codes.map((code) => (
              <tr key={code.id}>
                <td>{code.code}</td>
                <td>{new Date(code.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CodeList;

