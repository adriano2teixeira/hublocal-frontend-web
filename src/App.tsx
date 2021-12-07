import React from "react";
import GlobalStyle from "./styles/global";

import Routes from "./routes";
import { AuthContextProvider } from "./contexts/auth.context";

function App() {
  return (
    <>
      <AuthContextProvider>
        <GlobalStyle />
        <Routes />
      </AuthContextProvider>
    </>
  );
}

export default App;
