import { createContext, useContext, useState } from "react";

const InitialContext = createContext({
  initial: null,
  addValue: () => {},
});

export const InitialContextProvider = ({ children }) => {
  const [initial, setInitial] = useState(window.__FASTIFY_REACT_PROPS);

  const addValue = (name, value) => {
    initial[name] = value;
    setInitial({ ...initial });
  };

  return (
    <InitialContext.Provider value={{ initial, addValue }}>{children}</InitialContext.Provider>
  );
};

export const useInitial = () => {
  return useContext(InitialContext);
};
