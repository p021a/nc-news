import { useParams } from "react-router-dom";
import { fetchArticleById } from "../api";
import { useEffect, useState } from "react";
import Comments from "../components/Comments";
import { supabase } from "../supabaseClient";

export default function SingleArticleById() {
  const { article_id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [votes, setVotes] = useState(0);
  const [error, setError] = useState(null);
  const [userVote, setUserVote] = useState(0);

  useEffect(() => {
    fetchArticleById(article_id).then((data) => {
      setArticle(data);
      setVotes(data.votes || 0);
      setLoading(false);
    });
  }, [article_id]);

  const handleVote = async (inc) => {
    const votedKey = `voted-article-${article_id}`;
    const hasVoted = localStorage.getItem(votedKey);

    if (hasVoted) {
      setError("You have already voted on this article.");
      return;
    }

    if (votes + inc < 0) {
      setError("Votes cannot go below 0.");
      return;
    }

    setVotes((prev) => prev + inc);
    setError(null);

    const { error } = await supabase
      .from("articles")
      .update({ votes: votes + inc })
      .eq("article_id", article_id);

    if (error) {
      setVotes((prev) => prev - inc);
      setError("Failed to update vote. Try again.");
    } else {
      localStorage.setItem(votedKey, true);
    }
  };

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
      <div className="mt-4 flex items-center justify-between p-3 rounded ">
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleVote(1)}
            className="px-3 py-1 bg-green-600 rounded hover:bg-green-700"
          >
            👍
          </button>
          <button
            onClick={() => handleVote(-1)}
            className="px-3 py-1 bg-red-600 rounded hover:bg-red-700"
          >
            👎
          </button>
        </div>
        <p className="text-xl text-green-400 font-semibold">Votes: {votes}</p>
      </div>
      <Comments />
    </article>
  );
}
