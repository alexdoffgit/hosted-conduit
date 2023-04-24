"use client";

import { FormEvent, useState } from "react";
import EyeSlash from "@components/icons/eye-slash";
import Eye from "@components/icons/eye";
import { useSupabase } from "@components/supabase-provider";
import { useRouter } from "next/navigation";
import { AuthError } from "@supabase/supabase-js";

export function FormContainer() {
  const router = useRouter();
  const { supabase } = useSupabase();
  const [togglePassword, setTogglePassword] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const login = (e: FormEvent) => {
    e.preventDefault();
    supabase.auth
      .signInWithPassword({
        email: formData.email,
        password: formData.password,
      })
      .then(({ data, error }) => {
        if (error) {
          return Promise.reject(error);
        }

        router.replace("/");
      })
      .catch((e) => {
        if (e instanceof AuthError) {
          setLoginError(e.message);
        } else {
          setLoginError("some error occured");
          console.error(e);
        }
      });
  };

  return (
    <form
      className="col-start-2 col-span-4 flex flex-col gap-3"
      onSubmit={login}
    >
      <h1 className="text-center text-xl">Sign In</h1>
      <div className="flex flex-col gap-3">
        <div className="flex flex-col">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="border border-black"
            value={formData.email}
            onChange={(e) =>
              setFormData((data) => ({ ...data, email: e.target.value }))
            }
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password">Password</label>
          <div className="flex">
            {togglePassword ? (
              <>
                <input
                  type="text"
                  className="border border-black flex-grow"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData((data) => ({
                      ...data,
                      password: e.target.value,
                    }))
                  }
                />
                <button
                  className="bg-slate-300"
                  type="button"
                  onClick={() => setTogglePassword(false)}
                >
                  <EyeSlash />
                </button>
              </>
            ) : (
              <>
                <input
                  type="password"
                  className="border border-black flex-grow"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData((data) => ({
                      ...data,
                      password: e.target.value,
                    }))
                  }
                />
                <button
                  className="bg-slate-300"
                  type="button"
                  onClick={() => setTogglePassword(true)}
                >
                  <Eye />
                </button>
              </>
            )}
          </div>
        </div>
        <button className="bg-green-700 text-white" type="submit">
          Sign In
        </button>
        {loginError !== "" ? <p className="text-red-500">{loginError}</p> : ""}
      </div>
    </form>
  );
}
