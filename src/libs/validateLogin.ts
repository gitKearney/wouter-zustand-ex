import { UserInfoType } from "../store/userStore.ts";

export const validateLogin = (
  username: string,
  password: string,
): Promise<UserInfoType | null> => {
  return new Promise((resolve, reject) => {
    const testInfo = () => {
      if (username === "john" && password === "abc123") {
        resolve({
          username: "john",
          name: "Johnny Appleseed",
          password: "abc123",
        });
        return;
      }

      reject(null);
    };

    setTimeout(testInfo, 500);
  });
};
