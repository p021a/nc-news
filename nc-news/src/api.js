import { supabase } from "./supabaseClient";

export async function fetchArticles() {
  const { data, error } = await supabase
    .from("articles")
    .select(
      "article_id, title, topic, author, created_at, votes, article_img_url"
    )
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
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
    console.error(error);
    return null;
  }
  return data;
}
