import { createContext, useEffect, useReducer } from "react";
import "./App.css";
import authReducer from "./authReducer";

const AuthContext = createContext();

const App = () => {
  const initialState = {
    isAuthenticated: false,
    token: null,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const token = localStorage.getItem("token");

    token && dispatch({ type: "login", payload: { token: token } });
  }, []);

  return (
    <AuthContext.Provider
      value={{ state, dispatch }}
    ></AuthContext.Provider>
  );
};

export default App;
