"use client";

import { useSupabase } from "@components/supabase-provider";
import { useSessionId } from "@utils/use-session-id";
import Link from "next/link";
import { useState } from "react";

type Props = {
  slug: string;
};

export function CommentForm(props: Props) {
  const sessionId = useSessionId();
  const { supabase } = useSupabase();
  const [comment, setComment] = useState("");

  const submitComment = async () => {
    const article = (
      await supabase
        .from("articles")
        .select("id")
        .eq("slug", props.slug)
        .limit(1)
        .single()
    ).data;
    const profile = await supabase
      .from("profiles")
      .select("id")
      .eq("auth_id", sessionId)
      .limit(1)
      .single();
    if (profile.error) {
      console.error(profile.error.message);
      return;
    }

    await supabase
      .from("comments")
      .insert({
        article_id: article!.id,
        auth_id: sessionId!,
        body: comment,
        profile_id: profile.data.id,
      });
  };

  if (sessionId) {
    return (
      <div className="col-start-4 col-span-6">
        <div className="flex flex-col">
          <textarea
            className="border border-slate-500 rounded-t-sm p-2"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
          <div className="flex justify-between p-2 bg-slate-300 border border-slate-300 rounded-b-sm">
            <button
              className="text-white p-1 bg-green-500 rounded-sm"
              onClick={submitComment}
            >
              Post Comment
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <span className="col-start-2 col-span-10 flex justify-center gap-1">
      <Link href={`/login`}>
        <p className="text-green-500">Sign in</p>
      </Link>{" "}
      <p>to add comment to this article</p>
    </span>
  );
}
