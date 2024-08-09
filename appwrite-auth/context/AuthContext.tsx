import { account } from "@/Appwrite";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";

import React from "react";
import { Models } from "react-native-appwrite";

interface authProps {
  children: React.ReactNode;
}

interface contextStateInterface {
  session: Models.User<Models.Preferences> | null;
  setSession: Dispatch<SetStateAction<Models.User<Models.Preferences> | null>>;
}

const contextState = {
  session: {},
  setSession: (user: Models.User<Models.Preferences>) => {},
} as contextStateInterface;

export const AuthContext = createContext(contextState);

const AuthContextProvider = ({ children }: authProps) => {
  const [session, setSession] =
  useState<Models.User<Models.Preferences> | null>(null);

  return (
    <AuthContext.Provider value={{ session, setSession }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
