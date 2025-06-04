import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchCommentsByArticleId } from "../api";
import { supabase } from "../supabaseClient";

export default function Comments() {
  const { article_id } = useParams();
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    fetchCommentsByArticleId(article_id).then((data) => {
      setComments(data);
      setLoading(false);
    });

    async function fetchUser() {
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (sessionError || !session) {
        console.log("No active session found");
        setAuthor("");
        return;
      }

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) {
        console.error("Error getting user:", userError);
        setAuthor("");
      } else if (user) {
        setAuthor(user.email || "");
      } else {
        setAuthor("");
      }
    }

    fetchUser();
  }, [article_id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!body.trim()) {
      setError("Please write a comment.");
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
            article_id: parseInt(article_id),
            author: author.trim(),
            body: body.trim(),
            votes: 0,
          },
        ]);

      console.log("Insert data:", insertData);
      console.log("Insert error:", insertError);

      if (insertError) throw insertError;

      setBody("");
      setSuccess("Your comment was posted successfully!");
      setTimeout(() => setSuccess(null), 3000);

      // Refresh comments
      const updatedComments = await fetchCommentsByArticleId(article_id);
      setComments(updatedComments);
    } catch (err) {
      console.error("Error submitting comment:", err);
      setError("Failed to post comment.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mt-6">
      <h3 className="text-xl font-bold mb-4">Comments:</h3>

      <form onSubmit={handleSubmit} className="mb-6">
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
