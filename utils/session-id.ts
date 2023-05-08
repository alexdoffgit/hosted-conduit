import "server-only";
import { createServerClient } from "./supabase-server";

export async function getSessionId() {
    const supabase = createServerClient()

    const { data, error } = await supabase.auth.getSession()

    if(error || data.session === null) {
        return {
            sessionId: null,
            error
        }
    }

    return {
        sessionId: data.session.user.id,
        error
    }
}