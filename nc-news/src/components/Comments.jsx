import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  fetchCommentsByArticleId,
  deleteComment,
  fetchArticleById,
} from "../api";
import { supabase } from "../supabaseClient";

export default function Comments() {
  const { article_id } = useParams();
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [body, setBody] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const defaultAuthor = "cooljmessy";

  useEffect(() => {
    const parsedArticleId = parseInt(article_id);
    if (isNaN(parsedArticleId)) {
      setError("Invalid article ID.");
      setLoading(false);
      return;
    }

    fetchArticleById(parsedArticleId)
      .then(() => {
        fetchCommentsByArticleId(parsedArticleId)
          .then((data) => {
            setComments(data);
            setLoading(false);
          })
          .catch((err) => {
            console.error("Error fetching comments:", err);
            setError("Failed to load comments.");
            setLoading(false);
          });
      })
      .catch((err) => {
        console.error("Error fetching article:", err);
        setError("Article not found.");
        setLoading(false);
      });
  }, [article_id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!body.trim()) {
      setError("Comment cannot be empty.");
      setTimeout(() => setError(null), 3000);
      return;
    }
    const parsedArticleId = parseInt(article_id);
    if (isNaN(parsedArticleId)) {
      setError("Invalid article ID.");
      setTimeout(() => setError(null), 3000);
      return;
    }

    setSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      const { data: insertData, error: insertError } = await supabase
        .from("comments")
        .insert([
          {
            article_id: parsedArticleId,
            author: defaultAuthor,
            body: body.trim(),
            votes: 0,
          },
        ])
        .select()
        .single();

      if (insertError) {
        console.error("Error inserting comment:", insertError);
        throw new Error(insertError.message);
      }

      setComments((prev) => [insertData, ...prev]);
      setBody("");
      setSuccess("Comment posted successfully!");
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      console.error("Comment insert error details:", err);
      setError(`Failed to post comment: ${err.message}`);
      setTimeout(() => setError(null), 3000);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (comment_id) => {
    try {
      await deleteComment(comment_id);
      setComments((prev) =>
        prev.filter((comment) => comment.comment_id !== comment_id)
      );
      setSuccess("Comment deleted successfully!");
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      console.error("Error deleting comment:", err);
      setError("Failed to delete comment.");
      setTimeout(() => setError(null), 3000);
    }
  };

  return (
    <div className="mt-6">
      <h3 className="text-xl font-bold mb-4 text-white">Comments:</h3>

      <form onSubmit={handleSubmit} className="mb-6">
        <textarea
          placeholder="Write a comment..."
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="block bg-gray-800 w-full mb-2 p-2 rounded text-white border border-gray-600"
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
        <p className="text-gray-400">Loading comments...</p>
      ) : comments.length ? (
        <ul className="space-y-4">
          {comments.map((comment) => (
            <li
              key={comment.comment_id}
              className="border p-3 rounded bg-gray-800 text-white"
            >
              <div className="flex flex-col gap-2">
                <p className="text-sm">{comment.body}</p>
                <div className="flex justify-between items-center text-xs text-gray-400 mt-1">
                  <span>{comment.author}</span>
                  <div className="flex items-center gap-4">
                    <span className="min-w-[120px] text-right">
                      {new Date(comment.created_at).toLocaleString("en", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false,
                      })}
                    </span>
                    <button
                      onClick={() => handleDelete(comment.comment_id)}
                      className="bg-red-600 px-2 py-1 rounded hover:bg-red-700 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-400">No comments yet.</p>
      )}
    </div>
  );
}
