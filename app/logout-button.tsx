"use client";

import { useEffect, useState } from "react";
import { useSupabase } from "./supabase-provider";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();
  const { supabase } = useSupabase();
  const [loggedIn, setLoggedIn] = useState(false);

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
      .catch((e) => {
        console.error(e);
      });
  }, [loggedIn]);

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error(error.message);
    } else {
      router.replace("/");
    }
  };

  if (loggedIn) {
    return (
      <button className="p-1 bg-slate-500 text-white" onClick={logout}>
        Logout
      </button>
    );
  }
  return null;
}
