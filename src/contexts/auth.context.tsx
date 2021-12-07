import React from "react"
import { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie"
import { api } from "../framework/api";


type AUTHCONTEXT_TYPE = {
  loading: boolean;
  signed: boolean | null;
  user: any;
  login?: any;
  logout?: any;
  register?: any;
};

export const AuthContext = createContext<AUTHCONTEXT_TYPE>({
  loading: true,
  signed: null,
  user: null,
});

export const AuthContextProvider: React.FC = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [signed, setSigned] = useState<any>(Cookies.get("@auth-token"));
  const [user, setUser] = useState(Cookies.get("@signed-user") ? JSON.parse(Cookies.get("@signed-user")) : {} );

  const getUser = async (uid: string) => {};

  useEffect(() => {
    return () => {};
  }, []);

  const login = async (phone, password) => {
    try {
      const { data } = await api.post("/users/login", { phone, password }); 
      Cookies.set("@auth-token", data.token)
      Cookies.set("@signed-user", JSON.stringify(data));
      setSigned(true)
    } catch (error) {
      alert(error.message)
    }
  }

  const register = async (body: any) => {
    try {
      const { data } = await api.post("/users", body); 
      return { status: "success"}
    } catch (error) {
      alert("Ooops alguma coisa correu mal")
      return { status: "error"}
    }
  }

  const logout = () => {
    Cookies.remove("@auth-token")
    Cookies.remove("@signed-user");
    return true
  }

  const ctx_value = { loading, setLoading, signed, user, login, logout, register };
  return (
    <AuthContext.Provider value={ctx_value}>{children}</AuthContext.Provider>
  );
};
