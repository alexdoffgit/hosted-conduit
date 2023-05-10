"use client";

import PlusIcon from "@components/icons/plus";
import { useSupabase } from "@components/supabase-provider";
import { useRouter } from "next/navigation";
import { nanoid } from "nanoid";
import { useSessionId } from "@utils/use-session-id";
import { useEffect, useState } from "react";

export function NewDraftAction() {
  const router = useRouter();
  const { supabase } = useSupabase();
  const { sessionId, error: sessionError } = useSessionId();
  const [profileId, setProfileId] = useState(0);

  useEffect(() => {
    if (sessionId) {
      const fetchProfileId = async () => {
        const { data } = await supabase
          .from("profiles")
          .select("id")
          .eq("auth_id", sessionId)
          .limit(1)
          .single();

        if (data) {
          setProfileId(data.id);
        }
      };
      fetchProfileId();
    }
  }, [sessionId]);

  const newDraft = async () => {
    const { data, error } = await supabase
      .from("articles")
      .insert({
        title: "New draft article, edit this title",
        body: "lorem ipsum",
        slug: nanoid(),
        author_id: sessionId,
        profile_id: profileId,
      })
      .select("id")
      .limit(1)
      .single();
    if (sessionError) {
      throw error;
    }
    if (error) {
      throw error;
    }
    if (data) {
      router.push(`/draft/${data.id}`);
    }
  };

  return (
    <div
      className="border border-slate-400 rounded p-2 m-3 flex gap-2 cursor-pointer"
      onClick={newDraft}
    >
      <PlusIcon className="w-6 h-6" />
      <p>New Draft</p>
    </div>
  );
}
