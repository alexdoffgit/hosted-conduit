"use client";

import { useState } from "react";
import EyeSlash from "@components/icons/EyeSlash";
import Eye from "@components/icons/Eye";

function FormContainer() {
    const [togglePassword, setTogglePassword] = useState(false);

    return (
        <form className="col-start-2 col-span-4 flex flex-col gap-3">
          <h1 className="text-center text-xl">Sign In</h1>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="border border-black"
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
                    />
                    <button className="bg-slate-300" type="button" onClick={() => setTogglePassword(false)}>
                      <EyeSlash />
                    </button>
                  </>
                ) : (
                  <>
                    <input
                      type="password"
                      className="border border-black flex-grow"
                    />
                    <button className="bg-slate-300" type="button" onClick={() => setTogglePassword(true)}>
                      <Eye />
                    </button>
                  </>
                )}
              </div>
            </div>
            <button className="bg-green-700 text-white" type="button">
              Sign In
            </button>
          </div>
        </form>
      );
}

export default function Login() {
    return (
        <div className="w-full">
            <div className="grid grid-cols-6">
                <FormContainer />
            </div>
        </div>
    )
}