import "../styles/globals.css";
import { createContext } from "react";
import ReduxProvider from "../redux/ReduxProvider";
import UidContextProvider from "../context/UidContext";

export const UidContext = createContext();
export default function MyApp({ Component, pageProps }) {
  return (
    <ReduxProvider>
      <UidContextProvider>
        <Component {...pageProps} />
      </UidContextProvider>
    </ReduxProvider>
  );
}
