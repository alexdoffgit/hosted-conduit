import { createMiddlewareSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";
import type { Database } from "@utils/database.types";

export async function middleware(req: NextRequest) {
  const protectedRoutes = ['/editor', '/settings', '/draft']
  
  const res = NextResponse.next();
  const supabase = createMiddlewareSupabaseClient<Database>({ req, res });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  for (let route of protectedRoutes) {
    if(!session && req.nextUrl.pathname.startsWith(route)) {
      const redirectUrl = req.nextUrl.clone();
      redirectUrl.pathname = '/';
      return NextResponse.redirect(redirectUrl)
    }
  }

  return res;
}
