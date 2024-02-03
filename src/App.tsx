import { Route, Switch, useLocation } from "wouter";
import About from "./pages/About.tsx";
import Login from "./components/Login.tsx";
import BottomNav from "./components/BottomNav.tsx";
import { ProtectedRoute } from "./components/ProtectedRoute.tsx";
import Items from "./pages/Items.tsx";
import { Logout } from "./pages/Logout.tsx";
import { UserInfoType, useUserStore } from "./store/userStore.ts";
import { useEffect } from "react";

function App() {
  const userInfo: UserInfoType = useUserStore((state) => state.userInfo);
  const getToken = useUserStore((state) => state.getToken);
  const [location] = useLocation();

  console.log("at home route:", location);

  useEffect(() => {
    getToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const displayUserName = () => {
    if (location !== "/" && location !== "/home") {
      return null;
    }

    if (userInfo.name.length) {
      return `Welcome back ${userInfo.name}!`;
    }

    return `Please Log In`;
  };

  return (
    <>
      <h1>{displayUserName()}</h1>
      <Switch>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <ProtectedRoute path="/items">
          <Items />
        </ProtectedRoute>
        <Route path="/logout" component={Logout} />
      </Switch>
      <BottomNav />
    </>
  );
}

export default App;
