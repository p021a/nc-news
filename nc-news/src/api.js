import { supabase } from "./supabaseClient";

// Fetch all articles
export async function fetchArticles() {
  const { data, error } = await supabase
    .from("articles")
    .select(
      "article_id, title, topic, author, created_at, votes, article_img_url"
    )
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching articles:", error);
    throw new Error(`Error fetching articles: ${error.message}`);
  }
  return data;
}

// Fetch a single article by ID
export async function fetchArticleById(article_id) {
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .eq("article_id", article_id)
    .single();

  if (error) {
    console.error("Error fetching article:", error);
    throw new Error(`Error fetching article: ${error.message}`);
  }
  return data;
}

// Fetch comments for an article
export async function fetchCommentsByArticleId(article_id) {
  const { data, error } = await supabase
    .from("comments")
    .select("*")
    .eq("article_id", article_id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching comments:", error);
    throw new Error(`Error fetching comments: ${error.message}`);
  }
  return data;
}

// Delete a comment
export async function deleteComment(comment_id) {
  const { error } = await supabase
    .from("comments")
    .delete()
    .eq("comment_id", comment_id);

  if (error) {
    console.error("Error deleting comment:", error);
    throw new Error(`Error deleting comment: ${error.message}`);
  }
}

// Fetch unique topics
export async function fetchTopics() {
  const { data, error } = await supabase.from("articles").select("topic");

  if (error) {
    console.error("Error fetching topics:", error);
    throw new Error(`Error fetching topics: ${error.message}`);
  }

  // Get unique topics using Set
  const uniqueTopics = [...new Set(data.map((item) => item.topic))].filter(
    Boolean
  );
  return uniqueTopics;
}

// Fetch articles by topic
export async function fetchArticlesByTopic(topic) {
  const { data, error } = await supabase
    .from("articles")
    .select(
      "article_id, title, topic, author, created_at, votes, article_img_url"
    )
    .eq("topic", topic)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching articles by topic:", error);
    throw new Error(
      `Error fetching articles for topic ${topic}: ${error.message}`
    );
  }
  return data;
}
