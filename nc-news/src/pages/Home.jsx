import React, { useEffect, useState } from "react";
import { fetchArticles } from "../api";
import ArticlesList from "../components/ArticlesList";

export default function Home() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticles()
      .then((data) => {
        setArticles(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <main className="p-4">
      {loading ? (
        <p className="text-center text-gray-400">Loading ...</p>
      ) : (
        <ArticlesList articles={articles} />
      )}
    </main>
  );
}
