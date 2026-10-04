import { createContext, useCallback, useContext, useState } from "react";
import { checkAcc } from "../service/api";

const LoginContext = createContext();

export const useLogin = () => useContext(LoginContext);

export const LoginProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loginHighlight, setLoginHighlight] = useState(false);

  const promptLogin = useCallback(() => setLoginHighlight(true), []);
  const clearLoginHighlight = useCallback(() => setLoginHighlight(false), []);

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
      console.error(err);
      setLoggedIn(false);
    } finally {
      return loggedIn;
    }
  }

  return (
    <LoginContext.Provider
      value={{
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
