import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchCommentsByArticleId } from "../api";

export default function Comments() {
  const { article_id } = useParams();
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCommentsByArticleId(article_id).then((data) => {
      setComments(data);
      setLoading(false);
    });
  }, [article_id]);

  if (loading) return <p>Loading comments...</p>;

  if (!comments.length) return <p>No comments yet.</p>;

  return (
    <div className="mt-6">
      <h3 className="text-xl font-bold mb-4">Comments:</h3>
      <ul className="space-y-4">
        {comments.map((comment) => (
          <li key={comment.comment_id} className="border p-3 rounded bg-white">
            <p className="text-sm text-black">{comment.body}</p>
            <div className="text-xs text-gray-500 mt-1 flex justify-between">
              <span>{comment.author}</span>
              <span>{new Date(comment.created_at).toLocaleDateString()}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
