import "server-only";
import { getSessionId } from "@utils/session-id";
import { createServerClient } from "@utils/supabase-server";

export async function getDrafts() {
  const supabase = createServerClient();
  const { sessionId, error } = await getSessionId();

  if (sessionId) {
    let { data, error } = await supabase
      .from("articles")
      .select("id,title,description")
      .eq("published", false)
      .eq("author_id", sessionId);

    if (error) {
      return {
        articles: null,
        error,
      };
    }

    return {
      articles: data,
      error,
    };
  }

  return {
    articles: null,
    error,
  };
}
