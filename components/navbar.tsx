import { createServerClient } from "@utils/supabase-server";
import Link from "next/link";
import SearchBar, { SearchFallback } from "./search-bar";
import { Suspense } from "react";

async function AuthTopNav() {
  const supabase = createServerClient();
  const { data: authData, error: authError } = await supabase.auth.getSession();
  let userlink = (
    <Link href={"/"}>
      <p className="text-white">???</p>
    </Link>
  );
  if (authError) {
    throw new Error(authError.message);
  }

  if (authData.session) {
    const { data, error } = await supabase
      .from("profiles")
      .select("username")
      .eq("auth_id", authData.session.user.id)
      .limit(1)
      .single();
    if (error) {
      throw new Error(error.message);
    }
    if (data) {
      userlink = (
        <Link href={"/"}>
          <p className="text-white">{data.username}</p>
        </Link>
      );
    }
  }

  return (
    <div className="col-span-full flex justify-between items-center w-full bg-slate-800">
      <Link href={"/"}>
        <p className="font-bold text-green-500 ml-4">conduit</p>
      </Link>
      <div className="flex items-center gap-2">
        <Suspense fallback={<SearchFallback />}>
          <SearchBar />
        </Suspense>
        <nav className="my-2 mr-4 flex gap-2">
          <Link href={"/"}>
            <p className="text-white">Home</p>
          </Link>
          <Link href={"/settings"}>
            <p className="text-white">Settings</p>
          </Link>
          <Link href={"/editor"}>
            <p className="text-white">New Article</p>
          </Link>
          {userlink}
        </nav>
      </div>
    </div>
  );
}

function TopNav() {
  return (
    <div className="col-span-full flex justify-between items-center w-full bg-slate-800">
      <Link href={"/"}>
        <p className="font-bold text-green-500 ml-4">conduit</p>
      </Link>
      <div className="flex items-center gap-2">
        <Suspense fallback={<SearchFallback />}>
          <SearchBar />
        </Suspense>
        <nav className="my-2 mr-4 flex gap-2">
          <Link href={"/"}>
            <p className="text-white">Home</p>
          </Link>
          <Link href={"/login"}>
            <p className="text-white">Sign In</p>
          </Link>
          <Link href={"/register"}>
            <p className="text-white">Sign Up</p>
          </Link>
        </nav>
      </div>
    </div>
  );
}

export default async function Navigation() {
  const supabase = createServerClient();
  const { data } = await supabase.auth.getSession();

  if (data.session) {
    {
      /* @ts-expect-error Async Server Component */
    }
    return <AuthTopNav />;
  }

  return <TopNav />;
}
