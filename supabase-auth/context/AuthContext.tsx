import {
  Dispatch,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";

import React from "react";
import { supabase } from "@/Supabase";
import { Session } from "@supabase/supabase-js";

interface authProps {
  children: React.ReactNode;
}

interface contextStateInterface {
  session: Session | null;
  setSession: Dispatch<SetStateAction<Session | null>>;
}

const contextState = {
  session: {},
  setSession: (user: Session) => {},
} as contextStateInterface;

export const AuthContext = createContext(contextState);

const AuthContextProvider = ({ children }: authProps) => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ session, setSession }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

