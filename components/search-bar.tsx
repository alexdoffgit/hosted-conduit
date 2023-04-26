"use client";

import { useCallback, useState } from "react";
import SearchIcon from "./icons/search";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export function SearchFallback() {
  return (
    <div className="flex">
      <input
        type="text"
        name="search"
        className="border"
      />
      <button className="p-1 bg-slate-200">
        ?
      </button>
    </div>
  );
}

export default function SearchBar() {
  const [search, setSearch] = useState("");
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams() as unknown as string | string[][] | Record<string, string> | URLSearchParams ;
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );
  const clickUpdate = () => {
    router.push(pathName + "?" + createQueryString("q", search))
  }


  return (
    <div className="flex">
      <input
        type="text"
        name="search"
        value={search}
        onChange={(e) => setSearch(e.currentTarget.value)}
        className="border"
      />
      <button className="p-1 bg-slate-200" onClick={clickUpdate}>
        <SearchIcon />
      </button>
    </div>
  );
}
