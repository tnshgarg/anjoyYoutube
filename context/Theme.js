import React, { createContext } from "react";

const ThemeContext = createContext("light");

const ThemeProvider = (props) => {
  const theme = {
    primary: "#ff6d00",
    background: "#FFF5F2",
    textColor: "#000",
  };
  return (
    <ThemeContext.Provider value={theme}>
      {props.children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeProvider };
