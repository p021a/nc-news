import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchTopics } from "../api";

export default function Topics() {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTopics()
      .then((data) => {
        setTopics(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching topics:", err);
        setError(`Failed to load topics: ${err.message}`);
        setLoading(false);
      });
  }, []);

  return (
    <main className="p-4 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-4 text-white">Topics</h2>
      {loading ? (
        <p className="text-center text-gray-400">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : topics.length ? (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {topics.map((topic) => (
            <li key={topic}>
              <Link
                to={`/topics/${topic}`}
                className="block p-4 bg-gray-800 rounded-lg shadow hover:shadow-lg transition text-white hover:bg-gray-700"
              >
                <h3 className="text-xl font-semibold capitalize">{topic}</h3>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-400">No topics available.</p>
      )}
    </main>
  );
}
