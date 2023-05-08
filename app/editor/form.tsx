"use client";

import { v4 as uuidv4 } from 'uuid';

const NON_ALPHANUMERIC_PATTERN = new RegExp(/[^a-zA-Z0-9']+/g);
const LEADING_TRAILING_HYPHEN_PATTERN = new RegExp(/^-+|-+$/g);
const SINGLE_QUOTE_PATTERN = new RegExp(/\'/g);

export function CreateArticleForm() {

  return (
    <div className="col-start-3 col-span-8 flex flex-col gap-2 m-4">
      <div className="flex flex-col">
        <label htmlFor="title" className="text-lg">
          Title
        </label>
        <input type="text" className="border border-slate-500 rounded-sm p-2" />
      </div>
      <div className="flex flex-col">
        <label htmlFor="description" className="text-lg">
          Description
        </label>
        <input type="text" className="border border-slate-500 rounded-sm p-2" />
      </div>
      <div className="flex flex-col">
        <label htmlFor="body" className="text-lg">
          Body
        </label>
        <textarea className="border border-slate-500 rounded-sm p-2"></textarea>
      </div>
    </div>
  );
}
