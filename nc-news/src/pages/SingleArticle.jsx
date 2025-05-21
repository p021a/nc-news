import { useParams } from "react-router-dom";
import { fetchArticleById } from "../api";
import { useEffect, useState } from "react";
export default function SingleArticleById() {
  const { article_id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticleById(article_id).then((data) => {
      setArticle(data);
      setLoading(false);
    });
  }, [article_id]);

  if (loading) return <p>Loading...</p>;
  if (!article) return <p>Article not found</p>;

  return (
    <article className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
      <div className="flex flex-wrap gap-4 text-gray-400 mb-4 text-sm">
        <span>
          Topic: <span className="font-medium">{article.topic}</span>
        </span>
        <span>
          Author: <span className="font-medium">{article.author}</span>
        </span>
        <span>{new Date(article.created_at).toLocaleDateString()}</span>
      </div>
      <img
        src={article.article_img_url}
        alt={article.title}
        className="mb-6 w-full rounded"
      />
      <p className="text-white whitespace-pre-line">{article.body}</p>
    </article>
  );
}
