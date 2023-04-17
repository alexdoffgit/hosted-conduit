"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSupabase } from "./supabase-provider";

function AuthTopNav() {
  const [username, setUsername] = useState("");
  const { supabase } = useSupabase();

  useEffect(() => {
    supabase.auth
      .getSession()
      .then(({ data, error }) => {
        if (data.session) {
          supabase
            .from("profiles")
            .select("username")
            .eq("auth_id", data.session.user.id)
            .limit(1)
            .single()
            .then((value) => {
              if (value.data) {
                setUsername(value.data.username);
              }
            });
        }

        if (error) {
          return Promise.reject(error);
        }
      })
      .catch((e) => console.error(e));
  }, [username]);

  return (
    <div className="col-span-full flex justify-between items-center w-full bg-slate-800">
      <Link href={"/"}>
        <p className="font-bold text-green-500 ml-4">conduit</p>
      </Link>
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
        {username !== "" ? (
          <Link href={`/${username}`}>
            <p className="text-white">{username}</p>
          </Link>
        ) : null}
      </nav>
    </div>
  );
}

function TopNav() {
  return (
    <div className="col-span-full flex justify-between items-center w-full bg-slate-800">
      <Link href={"/"}>
        <p className="font-bold text-green-500 ml-4">conduit</p>
      </Link>
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
  );
}

export default function Navigation() {
  const [loggedIn, setLoggedIn] = useState(false);
  const { supabase } = useSupabase();

  useEffect(() => {
    supabase.auth
      .getSession()
      .then(({ data, error }) => {
        if (data.session) {
          setLoggedIn(true);
        }

        if (error) {
          setLoggedIn(false);
          return Promise.reject(error);
        }
      })
      .catch((e) => console.error(e));
  }, [loggedIn]);

  if (loggedIn) {
    return <AuthTopNav />;
  }

  return <TopNav />;
}
