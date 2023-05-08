"use client";

import { useSupabase } from "@components/supabase-provider";
import { AuthError } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

export function useSessionId() {
  const [sessionId, setSessionId] = useState<string | undefined>();
  const [error, setError] = useState<AuthError | null>(null);
  const { supabase } = useSupabase();

  useEffect(() => {
    const fetchSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        setError(error);
      } else if(data.session) {
        setSessionId(data.session.user.id);
      } else {
        // no-op
      }
    };

    fetchSession();
  }, [sessionId]);

  return { sessionId, error };
}
