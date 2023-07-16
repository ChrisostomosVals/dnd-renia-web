import { FC, ReactNode, useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import { theme } from "../theme";
import { RootState, store } from "../store";
import { Provider, useSelector } from "react-redux";
import GlobalStyle from "../global/GlobalStyle";
import NestedProvider from "./nestedProvider/NestedProvider";

export const Providers: FC<{ children: ReactNode }> = ({ children }) => {

  return (
    <Provider store={store}>
      <NestedProvider>
          <GlobalStyle />
          {children}
      </NestedProvider>
    </Provider>
  );
};
