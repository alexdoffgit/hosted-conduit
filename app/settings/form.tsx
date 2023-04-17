"use client";

import { useSupabase } from "@components/supabase-provider";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";

function useFormData() {
  const { supabase } = useSupabase();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState<string | undefined>();
  const [oldpassword, setOldpassword] = useState("");
  const [newpassword, setNewpassword] = useState("");

  useEffect(() => {
    supabase.auth
      .getSession()
      .then((val) => {
        if (val.error) {
          return Promise.reject(val.error);
        }

        if (val.data.session) {
          setEmail(val.data.session.user.email as string);
          supabase
            .from("profiles")
            .select("username,bio")
            .eq("auth_id", val.data.session.user.id)
            .limit(1)
            .single()
            .then(val => {
              if(val.data) {
                setUsername(val.data.username)
                setBio(val.data.bio ?? undefined)
              }
            });
        }
      })
      .catch((e) => console.error(e));
  }, []);

  const changeUsername = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value)
  }

  const changeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const changeOldpassword = (e: ChangeEvent<HTMLInputElement>) => {
    setOldpassword(e.target.value)
  }

  const changeNewpassword = (e: ChangeEvent<HTMLInputElement>) => {
    setNewpassword(e.target.value)
  }

  const changeBio = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setBio(e.target.value)
  }

  return {
    username,
    email,
    bio,
    oldpassword,
    newpassword,
    changeUsername,
    changeEmail,
    changeBio,
    changeOldpassword,
    changeNewpassword
  }
}

export function Form() {
  const { supabase } = useSupabase();
  const router = useRouter();
  const {
    bio,
    changeBio,
    changeEmail,
    changeNewpassword,
    changeOldpassword,
    changeUsername,
    email,
    newpassword,
    oldpassword,
    username
  } = useFormData()

  const logoutAction = function () {
    supabase.auth
      .signOut()
      .then(({ error }) => {
        if (error) {
          return Promise.reject(error);
        }
        router.replace("/");
      })
      .catch((e) => console.error(e));
  };

  return (
    <>
      <h1 className="col-start-5 col-span-4">Your Settings</h1>
      <div className="flex flex-col col-start-5 col-span-4">
        <label htmlFor="">username</label>
        <input type="text" className="border border-black" value={username} onChange={changeUsername} />
      </div>
      <div className="flex flex-col col-start-5 col-span-4">
        <label htmlFor="">bio</label>
        <textarea className="border border-black resize-none" value={bio} onChange={changeBio}></textarea>
      </div>
      <div className="flex flex-col col-start-5 col-span-4">
        <label htmlFor="">email</label>
        <input type="email" className="border border-black" value={email} onChange={changeEmail} />
      </div>
      <h2 className="col-start-5 col-span-4">password</h2>
      <div className="flex flex-col col-start-5 col-span-4">
        <label htmlFor="">old password</label>
        <input className="border border-black" type="password" value={oldpassword} onChange={changeOldpassword} />
      </div>
      <div className="flex flex-col col-start-5 col-span-4">
        <label htmlFor="">new password</label>
        <input className="border border-black" type="password" value={newpassword} onChange={changeNewpassword} />
      </div>
      <button className="col-start-8 p-1 bg-green-500 text-white">
        Update
      </button>
      <button className="col-start-5 p-1 bg-slate-400" onClick={logoutAction}>
        Logout
      </button>
    </>
  );
}
