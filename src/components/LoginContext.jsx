import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { checkAcc, pingServer } from "../service/api";

const LoginContext = createContext();

export const useLogin = () => useContext(LoginContext);

export const LoginProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loginHighlight, setLoginHighlight] = useState(false);
  const [online, setOnline] = useState(true);

  const promptLogin = useCallback(() => setLoginHighlight(true), []);
  const clearLoginHighlight = useCallback(() => setLoginHighlight(false), []);

  async function checkServer() {
    const ok = await pingServer();
    setOnline(ok);
    return ok;
  };

  useEffect(() => {
    checkServer()
  }, [])

  async function checkLogin() {
    if (!localStorage.getItem("token")) {
      setLoggedIn(false);
      return loggedIn;
    }
    try {
      const account = await checkAcc();
      console.log(account);
      setLoggedIn(true);
    } catch (err) {
      setLoggedIn(false);
      throw err;
    } finally {
      return loggedIn;
    }
  }

  return (
    <LoginContext.Provider
      value={{
        online,
        loggedIn,
        loginHighlight,
        promptLogin,
        clearLoginHighlight,
        checkLogin,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};
