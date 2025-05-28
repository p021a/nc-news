import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchCommentsByArticleId } from "../api";
import { supabase } from "../supabaseClient";

export default function Comments() {
  const { article_id } = useParams();
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [author, setAuthor] = useState("");
  const [body, setBody] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    fetchCommentsByArticleId(article_id).then((data) => {
      setComments(data);
      setLoading(false);
    });
  }, [article_id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!author.trim() || !body.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    setSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      const { error } = await supabase.from("comments").insert([
        {
          article_id: parseInt(article_id),
          author: author.trim(),
          body: body.trim(),
          votes: 0,
        },
      ]);

      if (error) throw error;

      setAuthor("");
      setBody("");
      setSuccess("Your comment was posted successfully!");

      setTimeout(() => setSuccess(null), 3000);

      const { data, error: fetchError } = await supabase
        .from("comments")
        .select("*")
        .eq("article_id", parseInt(article_id))
        .order("created_at", { ascending: false });

      if (fetchError) throw fetchError;

      setComments(data);
    } catch (err) {
      console.error(err);
      setError("Failed to post comment.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mt-6">
      <h3 className="text-xl font-bold mb-4">Comments:</h3>

      <form onSubmit={handleSubmit} className="mb-6">
        <input
          type="text"
          placeholder="Your name"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="block bg-white w-full mb-2 p-2 rounded text-black"
        />
        <textarea
          placeholder="Write a comment..."
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="block bg-white w-full mb-2 p-2 rounded text-black"
        />
        <button
          type="submit"
          disabled={submitting}
          className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {submitting ? "Posting..." : "Post Comment"}
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        {success && <p className="text-green-500 mt-2">{success}</p>}
      </form>

      {loading ? (
        <p>Loading comments...</p>
      ) : comments.length ? (
        <ul className="space-y-4">
          {comments.map((comment) => (
            <li
              key={comment.comment_id}
              className="border p-3 rounded bg-white"
            >
              <p className="text-sm text-black">{comment.body}</p>
              <div className="text-xs text-gray-500 mt-1 flex justify-between">
                <span>{comment.author}</span>
                <span>
                  {new Date(comment.created_at).toLocaleString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                  })}
                </span>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No comments yet.</p>
      )}
    </div>
  );
}
