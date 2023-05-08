import { useSupabase } from "@components/supabase-provider";
import { useSessionId } from "@utils/use-session-id";
import { useEffect, useState } from "react";

type DraftArticleById = {
  title: string;
  description: string | undefined | null;
  body: string;
};

export function useInitialDraftById(id: string) {
  const { supabase } = useSupabase()
  const { sessionId } = useSessionId()
  const [articleLoading, setArticleLoading] = useState(true)
  const [article, setArticle] = useState<DraftArticleById>({
    title: '',
    description: null,
    body: ''
  })

  useEffect(() => {
    const fetchData = async () => {
      if(sessionId) {
        const { data, error } = await supabase.from('articles').select('title,description,body').eq('id', id).eq('published', false).eq('author_id', sessionId).limit(1).single()
        if(error) {
          console.error(error)
          setArticleLoading(false)
        }

        if(data) {
          setArticle({
            body: data.body,
            description: data.description,
            title: data.title
          })
          setArticleLoading(false)
        }
      }
    }

    fetchData()
  }, [sessionId, articleLoading])

  return { article, loading: articleLoading, setArticle }
}