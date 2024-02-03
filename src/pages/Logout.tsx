import { Redirect } from "wouter";
import { useUserStore } from "../store/userStore.ts";

export const Logout = () => {
  const logout = useUserStore((state) => state.logout);

  localStorage.removeItem("token");
  logout();
  return <Redirect to="/home" />;
};
