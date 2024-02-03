import { create } from "zustand";

export type UserInfoType = {
  username: string;
  name: string;
  password: string;
};

export type UserState = {
  userInfo: UserInfoType;
  saveUserInfo: (data: UserInfoType) => void;
  logout: () => void;
  getToken: () => void;
};

const readTokenFromStorage = (): UserInfoType => {
  console.log("getting token from local storage...");
  const token = localStorage.getItem("token");
  if (token) {
    const { username, name, password } = JSON.parse(token);
    console.log("...its values are:", `${username} | ${name} | ${password}`);
    return { username, name, password };
  }

  return { username: "", name: "", password: "" };
};

// this is one thing I hate about TypeScript, defining stores is way wonky
const useUserStore = create<UserState>()((set) => ({
  userInfo: { username: "", password: "", name: "" },
  saveUserInfo: (data: UserInfoType) => set({ userInfo: data }),
  logout: () => set({ userInfo: { username: "", password: "", name: "" } }),
  getToken: () => set({ userInfo: readTokenFromStorage() }),
}));

export { useUserStore };
