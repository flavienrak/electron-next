"use client";

import qs from "query-string";
import RootLayout from "../components/RootLayout";

import { unAuthenticadedPaths } from "../lib/paths";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, createContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "../lib/allFunctions";
import { verifyTokenController } from "../controllers/authController";
import { updatePersistInfos } from "../redux/slices/persistSlice";
import { fetchUserInfos } from "../redux/slices/userSlice";
import { getUserController } from "../controllers/userController";
import { getAllPostesController } from "../controllers/posteController";
import { fetchPostesInfos } from "../redux/slices/postesSlice";

export const UidContext = createContext();

export default function UidContextProvider({ children }) {
  const path = usePathname();
  const params = useSearchParams();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);
  const { authToken, ip } = useSelector((state) => state.persistInfos);
  const { push } = useRouter();

  const [widthProgressBar, setWidthProgressBar] = useState(0);
  const [userId, setUserId] = useState(null);
  const [isLoadingJWT, setIsLoadingJWT] = useState(null);
  const [fetchPostes, setFetchPostes] = useState(null);
  const [isVerifyAuthJWT, setIsVerifyAuthJWT] = useState(false);
  const [isLogout, setIsLogout] = useState(false);
  const [letter, setLetter] = useState("");
  const [currentQuery, setCurrentQuery] = useState({});
  const [messages, setMessages] = useState([]);
  const [showLogout, setShowLogout] = useState(false);

  // update current query
  useEffect(() => {
    const newParams = qs.parse(params?.toString());
    setCurrentQuery(newParams);
  }, [params]);

  useEffect(() => {
    if (!isEmpty(ip)) {
      if (
        unAuthenticadedPaths.includes(currentQuery?.path) &&
        !isEmpty(authToken)
      ) {
        push("/home?path=accueil");
      } else if (!isVerifyAuthJWT) {
        setIsLoadingJWT(true);
        setIsVerifyAuthJWT(true);
      }
    } else {
      push("/home?path=signIn");
    }
  }, [currentQuery?.path]);

  useEffect(() => {
    if (isVerifyAuthJWT) {
      (async () => {
        if (authToken) {
          const res = await verifyTokenController({ ip, token: authToken });

          if (isEmpty(res?.decodedToken)) {
            setIsLogout(true);
          } else {
            setUserId(res.decodedToken.id);
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
    if (userId) {
      (async () => {
        let res = await getUserController({ ip, userId });
        if (res?.user) {
          dispatch(fetchUserInfos({ user: res.user }));
        }

        setFetchPostes(true);
        res = await getAllPostesController({ ip, userId });
        setFetchPostes(false);

        if (res?.postes) {
          dispatch(fetchPostesInfos({ postes: res.postes }));
        }
      })();
    }
  }, [userId]);

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

  const loginOut = (value) => {
    setShowLogout(value);
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
          fetchPostes,
          showLogout,
          loginOut,
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
