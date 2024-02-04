import { createRef, useEffect, useState } from "react";
import { validateLogin } from "../libs/validateLogin.js";
import { useLocation } from "wouter";
import { useUserStore } from "../store/userStore.ts";
import { getRedirectedFrom } from "../store/redirectStore.ts";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [, setLocation] = useLocation();

  // import user store
  const saveUserInfo = useUserStore((state) => state.saveUserInfo);

  const canBeSubmitted = () => {
    const notEmpty = !(username.length && password.length);
    return setDisabled(notEmpty);
  };

  const updateUsername = (event: { target: HTMLInputElement }) => {
    const newValue = event.target.value;
    setUsername(newValue.replace(/\s/g, ""));
  };

  const updatePassword = (event: { target: HTMLInputElement }) => {
    setPassword(event.target.value);
  };

  const textInput = createRef<HTMLInputElement>();
  const focusTextInput = () => {
    if (textInput.current) {
      textInput.current.focus();
    }
  };

  const validateCreds = async () => {
    try {
      const user = await validateLogin(username, password);
      localStorage.setItem("token", JSON.stringify(user));
      if (user) {
        saveUserInfo(user);
      }

      const goto = getRedirectedFrom();
      if (goto) {
        setLocation(goto);
        return;
      }
      setLocation("/home");
    } catch (err) {
      console.log("auth failed!");
    }
  };

  useEffect(focusTextInput, []);
  useEffect(canBeSubmitted, [username, password]);

  return (
    <div>
      <div>
        <label htmlFor="emailFormControlInput1">Email address</label>
        <input
          type="email"
          id="emailFormControlInput1"
          placeholder="name@example.com"
          value={username}
          onChange={updateUsername}
          ref={textInput}
        />
      </div>

      <div>
        <label htmlFor="passwordFormControlInput1" className="">
          Password
        </label>
        <input
          type={showPass ? "text" : "password"}
          id="passwordFormControlInput1"
          value={password}
          onChange={updatePassword}
        />
        <input
          id="showPassword1"
          type="checkbox"
          onClick={() => setShowPass(!showPass)}
        />
        <label htmlFor="showPassword1"> Show Password</label>
        <br />
      </div>
      <div>
        <button disabled={disabled} onClick={validateCreds}>
          Submit
        </button>
      </div>
    </div>
  );
}

export default Login;
