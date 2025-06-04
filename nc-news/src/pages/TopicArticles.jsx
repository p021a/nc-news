import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchArticlesByTopic } from "../api";
import ArticlesList from "../components/ArticlesList";

export default function TopicArticles() {
  const { topic } = useParams();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetchArticlesByTopic(topic)
      .then((data) => {
        setArticles(data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load articles for this topic.");
        setLoading(false);
      });
  }, [topic]);

  return (
    <main className="p-4">
      <h2 className="text-3xl font-bold mb-4 text-white capitalize">
        Articles on {topic}
      </h2>
      {loading ? (
        <p className="text-center text-gray-400">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <ArticlesList articles={articles} />
      )}
    </main>
  );
}
