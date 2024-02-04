import { Redirect, RouteProps, useLocation, useRoute } from "wouter";
import { createElement } from "react";
import { setRedirectedFrom } from "../store/redirectStore";

export function ProtectedRoute(props: RouteProps) {
  const [location] = useLocation();

  console.log(`location is ${location}, checking to see if token exists`);

  const { path, component, children } = props;
  const token = localStorage.getItem("token"); // save to store and read props
  if (!token) {
    setRedirectedFrom(location);
    return <Redirect to="/login" />;
  }

  if (!path) {
    return <Redirect to="/login" />;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const useRouteMatch = useRoute(path);
  const [matches, params] = useRouteMatch;
  if (!matches) {
    return null;
  }

  if (component) {
    return createElement(component, { params });
  }

  return typeof children === "function" ? children(params) : children;
}
