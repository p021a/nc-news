import { Link } from "react-router-dom";

export default function ArticlesList({ articles }) {
  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap6">
        {articles.map((article) => (
          <Link to={`/article/${article.article_id}`} key={article.article_id}>
            <article
              key={article.article_id}
              className="border rounded-lg p-4 shadow hover:shadow-lg transition cursor-pointer"
            >
              {article.article_img_url && (
                <img src={article.article_img_url} alt={article.title} />
              )}
              <div>
                <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
                <div className="flex flex-wrap gap-4 text-gray-400 mb-4 text-sm">
                  <span>
                    Topic: <span className="font-medium">{article.topic}</span>
                  </span>
                  <span>
                    Author:{" "}
                    <span className="font-medium">{article.author}</span>
                  </span>
                  <span>
                    {new Date(article.created_at).toLocaleString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: false,
                    })}
                  </span>
                </div>
                <p className="text-gray-700 line-clamp-3">{article.body}</p>
                <p className="text-gray-700 line-clamp-3">{article.body}</p>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
}
