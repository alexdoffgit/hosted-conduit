"use client"

import { useSupabase } from "@components/supabase-provider"
import { useEffect, useState } from "react"

export function useSessionId() {
    const [sessionId, setSessionId] = useState<string | undefined>()
    const { supabase } = useSupabase()

    useEffect(() => {
        supabase.auth.getSession().then(value => {
            setSessionId(value.data.session?.user.id)
        })
    }, [sessionId])

    return sessionId
}