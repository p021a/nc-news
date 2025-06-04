import { supabase } from "./supabaseClient";

export async function fetchArticles() {
  const { data, error } = await supabase
    .from("articles")
    .select(
      "article_id, title, topic, author, created_at, votes, article_img_url"
    )
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(`Failed to fetch articles: ${error.message}`);
  }
  return data;
}

export async function fetchArticleById(article_id) {
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .eq("article_id", article_id)
    .single();

  if (error) {
    throw new Error(`Failed to fetch article: ${error.message}`);
  }
  return data;
}

export async function fetchCommentsByArticleId(article_id) {
  const { data, error } = await supabase
    .from("comments")
    .select("*")
    .eq("article_id", article_id)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(`Failed to fetch comments: ${error.message}`);
  }
  return data;
}

export async function deleteComment(comment_id) {
  const { error } = await supabase
    .from("comments")
    .delete()
    .eq("comment_id", comment_id);

  if (error) {
    throw new Error(`Failed to delete comment: ${error.message}`);
  }
}

export async function fetchTopics() {
  const { data, error } = await supabase
    .from("articles")
    .select("topic")
    .distinct();

  if (error) {
    throw new Error(`Failed to fetch topics: ${error.message}`);
  }

  return data.map((item) => item.topic).filter(Boolean);
}

export async function fetchArticlesByTopic(topic) {
  const { data, error } = await supabase
    .from("articles")
    .select(
      "article_id, title, topic, author, created_at, votes, article_img_url"
    )
    .eq("topic", topic)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(
      `Failed to fetch articles for topic ${topic}: ${error.message}`
    );
  }
  return data;
}
