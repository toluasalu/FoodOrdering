import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";

type AuthData = {
  session: Session | null;
  profile: any;
  loading: boolean;
  isAdmin: boolean;
};

type DataObj = {
  avatar_url: null | string;
  full_name: null | string;
  group: string;
  id: null | string;
  updated_at: null | string;
  username: null | string;
  website: null | string;
};

export const AuthContext = createContext<AuthData>({
  session: null,
  profile: null,
  loading: true,
  isAdmin: false,
});

export default function AuthProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<DataObj | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Auth Provider is mounted");
    const fetchSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);

      if (session) {
        const { data } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", session?.user.id)
          .single();
        console.log("Data Obj", data);
        setProfile(data || null);
      }
      setLoading(false);
    };

    fetchSession();
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);
  console.log("Profile Obj:", profile);
  return (
    <AuthContext.Provider
      value={{ session, loading, profile, isAdmin: profile?.group == "ADMIN" }}
    >
      {children}
    </AuthContext.Provider>
  );
}
