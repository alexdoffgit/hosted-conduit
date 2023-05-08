"use client";

import { useSupabase } from "@components/supabase-provider";
import { useInitialDraftById } from "./use-draft-data";
import debounce from "lodash.debounce";
import { useCallback } from "react";

type Props = {
  pageId: string;
};

export function DraftForm(props: Props) {
  const { supabase } = useSupabase();
  const { article, loading, setArticle } = useInitialDraftById(props.pageId);

  async function updateTitle(title: string) {
    await supabase
      .from("articles")
      .update({
        title,
      })
      .eq("id", props.pageId);
  }

  async function updateDescription(description: string | undefined | null) {
    await supabase
      .from("articles")
      .update({
        description,
      })
      .eq("id", props.pageId);
  }

  async function updateBody(body: string) {
    await supabase
      .from("articles")
      .update({
        body,
      })
      .eq("id", props.pageId);
  }

  const debouncedUpdateTitle = useCallback(debounce(updateTitle, 2000), []);
  const debounceUpdateDescription = useCallback(
    debounce(updateDescription, 2000),
    []
  );
  const debounceUpdateBody = useCallback(debounce(updateBody, 2000), []);

  if (loading) {
    return (
      <p className="col-start-3 col-span-8 flex justify-center">loading...</p>
    );
  }

  return (
    <div className="col-start-3 col-span-8">
      <div className="flex flex-col">
        <div className="flex flex-col">
          <label className="text-lg">Title</label>
          <input
            type="text"
            className="border border-slate-400 rounded-sm p-1"
            value={article.title}
            onChange={(e) => {
              setArticle((state) => ({...state, title: e.target.value}))
              debouncedUpdateTitle(e.target.value);
            }}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-lg">Description</label>
          <input
            type="text"
            className="border border-slate-400 rounded-sm p-1"
            value={article.description ?? ""}
            onChange={(e) => {
              setArticle((state) => ({
                ...state,
                description: e.target.value,
              }));
              debounceUpdateDescription(e.target.value);
            }}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-lg">Title</label>
          <textarea
            className="border border-slate-400 rounded-sm p-1"
            value={article.body}
            onChange={(e) => {
              setArticle(state => ({...state, body: e.target.value}))
              debounceUpdateBody(e.target.value);
            }}
          ></textarea>
        </div>
      </div>
    </div>
  );
}
