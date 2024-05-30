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
import { fetchUserInfos } from "../redux/slices/userSlice";

export const UidContext = createContext();

export default function UidContextProvider({ children }) {
  const path = usePathname();
  const params = useSearchParams();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);
  const { authToken } = useSelector((state) => state.persistInfos);
  const { push } = useRouter();

  const [widthProgressBar, setWidthProgressBar] = useState(0);
  const [userId, setUserId] = useState(null);
  const [isLoadingJWT, setIsLoadingJWT] = useState(null);
  const [isVerifyAuthJWT, setIsVerifyAuthJWT] = useState(false);
  const [isLogout, setIsLogout] = useState(false);
  const [letter, setLetter] = useState("");
  const [currentQuery, setCurrentQuery] = useState({});
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
      push("/home?path=accueil");
    } else if (!isVerifyAuthJWT) {
      setIsLoadingJWT(true);
      setIsVerifyAuthJWT(true);
    }
  }, [currentQuery?.path]);

  useEffect(() => {
    if (isVerifyAuthJWT) {
      (async () => {
        if (authToken) {
          const res = await verifyTokenController(authToken);

          if (isEmpty(res?.decodedToken)) {
            setIsLogout(true);
          } else {
            setUserId(res.decodedToken.id);
            dispatch(fetchUserInfos({ user: res.user }));
            setIsLoadingJWT(false);
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

  useEffect(() => {
    if (user?.prenom) {
      console.log(user.prenom);
      setLetter(user.prenom?.charAt(0));
    }
  }, [user?.prenom]);

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
          letter,
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
