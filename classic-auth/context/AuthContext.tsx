import { Dispatch, SetStateAction, createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Text } from "react-native";
import React from "react";
import axios from "axios";
import { router } from "expo-router";

interface authProps {
  children: React.ReactNode;
}
interface registerProps {
  username: string;
  email: string;
  password: string;
}
interface loginProps {
  email: string;
  password: string;
}

interface User {
  id:string,
  email:string,
  username:string
}
interface contextStateInterface {
  userInfo: User;
  setUserInfo: Dispatch<SetStateAction<User>>;
  userToken: string;
  setUserToken: Dispatch<SetStateAction<string>>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  register: (registerInput: registerProps) => void;
  login: (loginInput: loginProps) => void;
  logout: () => void;
}
const contextState = {
  userInfo: {
    id: "",
    email: "",
    username: "",
  },
  setUserInfo: (user: User) => {},
  userToken: "",
  setUserToken: (token: string) => {},
  loading: false,
  setLoading: (load: boolean) => {},
  register: (registerInput: registerProps) => {},
  login: (loginInput: loginProps) => {},
  logout: () => {},
} as contextStateInterface;

export const AuthContext = createContext(contextState);


const AuthContextProvider = ({ children }: authProps) => {
  const [userInfo, setUserInfo] = useState<User>({ id: "", email: "", username: "" });
  const [userToken, setUserToken] = useState("");
  const [loading, setLoading] = useState(false);

  const register = async (data: registerProps) => {
    setLoading(true);

    await axios
      .post("http://your-local-ip-address:5000/api/auth/register", data)
      .then(async (response) => {
        setUserInfo(response.data);
        let token = response.headers["set-cookie"]
          ? response.headers["set-cookie"]?.[0].split("=")[1]
          : "";
        setUserToken(token);

        await AsyncStorage.setItem("auth-token", userToken);
        await AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
        router.push("/");
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log("error", error.message);
        throw error;
      });
  };

  const login = async (data: loginProps) => {
    setLoading(true);
  
      await axios
        .post("http://your-local-ip-address:5000/api/auth/login", data)
        .then(async (response) => {
          setUserInfo(response.data);
          let token = response.headers["set-cookie"]
            ? response.headers["set-cookie"]?.[0].split("=")[1]
            : "";
          setUserToken(token);

          await AsyncStorage.setItem("auth-token", userToken);
          await AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
          router.push("/");
          setLoading(false)
        })
        .catch((error)=>{
          setLoading(false);
          console.log("error",error)
          throw error
        });
        
        
    }

    const logout = async ()=>{
      setLoading(true)
      setUserToken("")
      await AsyncStorage.removeItem('auth-token')
      await AsyncStorage.removeItem('userInfo')
      router.push('/welcome')
      setLoading(false)
    }

 console.log(userInfo)
 console.log(userToken)

    const isLoggin = async()=>{
      setLoading(true)
      try {
        
        let user = await AsyncStorage.getItem('userInfo')
        let token = await AsyncStorage.getItem('auth-token')
        if(user){
          setUserInfo(JSON.parse(user))
          setUserToken(token ? token : "")
          router.replace('/')
        }
        router.replace('/welcome')

        
        setLoading(false)
      } catch (error) {
        console.log(error)
      }finally{
        setLoading(false)
      }

    }

    useEffect(()=>{
      isLoggin()
    },[])
    

  return (
    <AuthContext.Provider value={{ userInfo, setUserInfo, login, userToken, setUserToken, register, logout, loading, setLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;


function httpErrorHandler(reason: any): PromiseLike<never> {
  throw new Error("Function not implemented.");
}

