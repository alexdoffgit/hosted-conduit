"use client";

import { useSupabase } from "@components/supabase-provider";
import { useInitialDraftById } from "./use-draft-data";
import debounce from "lodash.debounce";
import { useCallback, useState } from "react";
import { useRouter } from 'next/navigation'

type Props = {
  pageId: string;
};

export function DraftForm(props: Props) {
  const { supabase } = useSupabase();
  const { article, loading, setArticle } = useInitialDraftById(props.pageId);
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  const openModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)

  const overlayClass = isOpen ? "fixed inset-0 flex justify-center items-center" : "hidden inset-0 flex justify-center items-center"

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

  const deleteAction = async () => {
    await supabase.from("articles").delete().eq("id", props.pageId);
    router.replace('/write')
  };

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
              setArticle((state) => ({ ...state, title: e.target.value }));
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
          <label className="text-lg">Body</label>
          <textarea
            className="border border-slate-400 rounded-sm p-1"
            value={article.body}
            onChange={(e) => {
              setArticle((state) => ({ ...state, body: e.target.value }));
              debounceUpdateBody(e.target.value);
            }}
          ></textarea>
        </div>
        <div className="flex flex-col items-end">
          <button onClick={openModal} className="my-4 p-2 bg-green-500 text-slate-200">Delete Draft</button>
        </div>
      </div>
      {/* modal */}
      <div className={overlayClass}>
        <div className="bg-slate-200 p-5 border border-slate-600">
          <div className="flex flex-col">
            <p>Do you want to delete?</p>
            <div className="flex gap-2">
              <button className="p-1 bg-red-500" onClick={deleteAction}>Yes</button>
              <button className="p-1 bg-green-500" onClick={closeModal}>No</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
