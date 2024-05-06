"use client";

import qs from "query-string";
import RootLayout from "../components/RootLayout";
import { unAuthenticadedPaths } from "../lib/paths";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, createContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "../lib/isEmpty";
import { verifyTokenController } from "../controllers/authController";
import { updatePersistInfos } from "../redux/slices/persistSlice";

export const UidContext = createContext();

export default function UidContextProvider({ children }) {
  const path = usePathname();
  const params = useSearchParams();
  const dispatch = useDispatch();

  const { authToken } = useSelector((state) => state.persistInfos);
  const { push } = useRouter();

  const [widthProgressBar, setWidthProgressBar] = useState(0);
  const [userId, setUserId] = useState(null);
  const [isLoadingJWT, setIsLoadingJWT] = useState(false);
  const [isVerifyAuthJWT, setIsVerifyAuthJWT] = useState(false);
  const [isLogout, setIsLogout] = useState(false);
  const [currentQuery, setCurrentQuery] = useState(null);
  const [messages, setMessages] = useState([]);

  // update current query
  useEffect(() => {
    const newParams = qs.parse(params?.toString());
    setCurrentQuery(newParams);
  }, [params]);

  useEffect(() => {
    if (
      unAuthenticadedPaths.includes(currentQuery?.path) &&
      !isEmpty(authToken)
    ) {
      push("/home?path=home");
    } else {
      setIsLoadingJWT(true);
      setIsVerifyAuthJWT(true);
    }
  }, [currentQuery?.path]);

  useEffect(() => {
    if (isVerifyAuthJWT) {
      (async () => {
        if (authToken) {
          const res = await verifyTokenController(authToken);

          if (isEmpty(res?.id)) {
            setIsLogout(true);
          } else {
            setUserId(res.id);
          }
        } else {
          if (!unAuthenticadedPaths.includes(currentQuery?.path)) {
            push("/home?path=signIn");
          }
        }
      })();
    }
  }, [isVerifyAuthJWT]);

  useEffect(() => {
    if (isLogout) {
      (async () => {
        if (authToken) {
          dispatch(updatePersistInfos({ authToken: "" }));
        }

        setIsLoadingJWT(false);
        setIsLogout(false);

        window.location = "/home?path=signIn";
      })();
    }
  }, [isLogout]);

  useEffect(() => {
    if (!isEmpty(messages)) {
      const timeoutId = setTimeout(() => {
        setMessages((prevMessages) => prevMessages.slice(0, -1));
      }, 6000);

      return () => clearTimeout(timeoutId);
    }
  }, [messages]);

  const removeQueries = (values) => {
    return Object.keys(currentQuery).reduce((nouvelObjet, cle) => {
      if (!values.includes(cle)) {
        nouvelObjet[cle] = currentQuery[cle];
      }
      return nouvelObjet;
    }, {});
  };

  const addMessage = (message) => {
    setMessages((prev) => {
      let newState = [...prev];
      newState.unshift(message);
      return newState;
    });
  };

  const removeMessage = (index) => {
    setMessages((prev) =>
      prev.filter((_, indexToRemove) => indexToRemove !== index)
    );
  };

  const setLoadingBar = (value) => {
    if (!isNaN(value)) {
      const numericValue = Number(value);
      if (Number.isInteger(numericValue)) {
        setWidthProgressBar(numericValue);
      }
    }
  };

  if (typeof window !== "undefined")
    return (
      <UidContext.Provider
        value={{
          path,
          userId,
          isLoadingJWT,
          currentQuery,
          widthProgressBar,
          messages,
          addMessage,
          removeMessage,
          setLoadingBar,
          removeQueries,
        }}
      >
        <RootLayout>{children}</RootLayout>
      </UidContext.Provider>
    );
}
