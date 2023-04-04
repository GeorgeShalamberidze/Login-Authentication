import React, { createContext, useContext } from "react";
import REGISTERED_USERS from "../Query/registeredUsersSub";
import { useSubscription } from "@apollo/client";

export const Context = createContext();

export const StateContext = ({ children }) => {
  const { loading, error, data } = useSubscription(REGISTERED_USERS);

  console.log(loading, error, data);

  return (
    <Context.Provider value={{ data, loading, error }}>
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
