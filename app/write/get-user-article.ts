import "server-only"
import { getSessionId } from "@utils/session-id"
import { createServerClient } from "@utils/supabase-server"

export async function getUserArticles() {
    const { sessionId, error } = await getSessionId()
    const supabase = createServerClient()

    if(error) {
        return {
            articles: null,
            error
        }
    }

    if(sessionId) {
        const { data, error } = await supabase.from('articles').select('id,title,description').eq('author_id', sessionId).eq('published', true)
        if(error) {
            return {
                articles: null,
                error
            }
        }

        if(data) {
            return {
                articles: data,
                error: null
            }
        }

        return {
            articles: null,
            error: null
        }
    }

    return {
        articles: null,
        error: null
    }
}