import { Link } from "wouter";
import { UserInfoType, useUserStore } from "../store/userStore.ts";
import { useEffect } from "react";

function BottomNav() {
  const userInfo: UserInfoType = useUserStore((state) => state.userInfo);
  const getToken = useUserStore((state) => state.getToken);

  useEffect(() => {
    getToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderLoginLink = () => {
    if (userInfo.name) {
      return null;
    }

    return (
      <li>
        <Link href="/login">Login</Link>
      </li>
    );
  };

  const renderLogoutLink = () => {
    if (userInfo.name) {
      return (
        <li>
          <Link href="/logout">Logout</Link>
        </li>
      );
    }
    return null;
  };
  return (
    <>
      <hr />
      <ul className="navul">
        {renderLoginLink()}
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/items">Items</Link>
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>
        {renderLogoutLink()}
      </ul>
    </>
  );
}

export default BottomNav;
