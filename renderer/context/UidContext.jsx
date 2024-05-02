"use client";

import qs from "query-string";
import TopLoadingBar from "../components/utils/TopLoadingBar";
import RootLayout from "../components/RootLayout";

// import {
//   refreshJWTController,
//   verifyJWTController,
// } from "@/lib/controllers/jwt.controller";
// import { isEmpty } from "@/lib/utils/isEmpty";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, createContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { removeUserInfos, fetchUserInfos } from "@/redux/slices/userSlice";
// import { updatePersistInfos } from "@/redux/slices/persistSlice";
// import { fetchUserInfosController } from "@/lib/controllers/user.controller";
// import { logoutController } from "@/lib/controllers/auth.controller";
// import { protecedPaths } from "@/lib/utils/paths";
// import { fetchProjets } from "@/redux/slices/projetSlice";
// import { fetchUsers } from "@/redux/slices/usersSlice";

export const UidContext = createContext();

export default function UidContextProvider({ children }) {
  const path = usePathname();
  const params = useSearchParams();

  const { authToken } = useSelector((state) => state.persistInfos);
  const { push } = useRouter();

  const dispatch = useDispatch();

  const [widthProgressBar, setWidthProgressBar] = useState(0);
  const [userId, setUserId] = useState(null);
  const [isRefreshed, setIsRefreshed] = useState(false);
  const [isLoadingJWT, setIsLoadingJWT] = useState(false);
  const [isVerifyAuthJWT, setIsVerifyAuthJWT] = useState(false);
  const [isLogout, setIsLogout] = useState(false);
  const [infosToUpdate, setInfosToUpdate] = useState({});
  const [isFetch, setIsFetch] = useState(false);
  const [currentQuery, setCurrentQuery] = useState(null);
  const [newQuery, setNewQuery] = useState(currentQuery);

  // update current query
  useEffect(() => {
    const newParams = qs.parse(params?.toString());
    setCurrentQuery(newParams);
  }, [params]);

  // useEffect(() => {
  //   if (path === "/home" && !isEmpty(currentQuery?.token)) {
  //     (async () => {
  //       const res = await verifyJWTController(currentQuery.token);

  //       if (res?.active) {
  //         confetti.onActive();
  //         popup.onActive();

  //         dispatch(fetchUserInfos({ user: res.user }));
  //         dispatch(
  //           updatePersistInfos({
  //             userType: res.userType,
  //             lang: res.lang,
  //           })
  //         );
  //         setUserId(res.user._id);

  //         push("/home");
  //       } else {
  //         setIsVerifyAuthJWT(true);
  //       }
  //     })();
  //   } else if (
  //     protecedPaths.includes(path)
  //     // || (path === "/home" && isEmpty(currentQuery?.token))
  //   ) {
  //     // if (confetti.isActive) {
  //     //   confetti.onDisable();
  //     // }

  //     // if (popup.isActive) {
  //     //   popup.onDisable();
  //     // }

  //     setIsLoadingJWT(true);
  //     setIsVerifyAuthJWT(true);
  //   }
  // }, [currentQuery?.token]);

  // useEffect(() => {
  //   if (isVerifyAuthJWT) {
  //     (async () => {
  //       if (authToken) {
  //         const res = await verifyJWTController(authToken);

  //         if (isEmpty(res?.infos)) {
  //           setIsLogout(true);
  //         } else {
  //           if (userType !== res.infos?.userType) {
  //             setInfosToUpdate((prev) => ({
  //               ...prev,
  //               userType: res.infos.userType,
  //             }));
  //           }
  //           if (lang !== res.infos?.lang) {
  //             setInfosToUpdate((prev) => ({
  //               ...prev,
  //               lang: res.infos.lang,
  //             }));
  //           }
  //           if (lang !== res.infos?.isAdmin) {
  //             setInfosToUpdate((prev) => ({
  //               ...prev,
  //               isAdmin: res.infos.isAdmin,
  //             }));
  //           }
  //           setIsFetch(true);
  //           setUserId(res.infos?.id);
  //         }
  //       } else {
  //         window.location = "/login";
  //       }
  //     })();
  //   }
  // }, [isVerifyAuthJWT]);

  // useEffect(() => {
  //   if (isLogout) {
  //     (async () => {
  //       if (authToken) {
  //         await logoutController(authToken);
  //         dispatch(updatePersistInfos({ authToken }));
  //       }

  //       dispatch(removeUserInfos());
  //       setIsLoadingJWT(false);
  //       setIsLogout(false);

  //       window.location = "/login";
  //     })();
  //   }
  // }, [isLogout]);

  // useEffect(() => {
  //   if (isFetch) {
  //     (async () => {
  //       const res = await refreshJWTController(authToken);
  //       if (res?.authToken) {
  //         dispatch(updatePersistInfos({ authToken: res.authToken }));
  //         setIsRefreshed(true);
  //       }
  //     })();
  //   }
  // }, [isFetch]);

  // useEffect(() => {
  //   if (userId && isRefreshed) {
  //     (async () => {
  //       const res = await fetchUserInfosController(userId);

  //       if (isEmpty(res?.user)) {
  //         setIsLogout(true);
  //       } else {
  //         setUserId(res.user._id);
  //         dispatch(updatePersistInfos(infosToUpdate));
  //         dispatch(fetchUserInfos({ user: res.user }));
  //         dispatch(fetchUsers({ users: res.users }));
  //         dispatch(fetchProjets({ projets: res.projets }));
  //         setIsLoadingJWT(false);
  //         setIsRefreshed(false);

  //         if (!protecedPaths.includes(path) && path !== "/home") {
  //           push("/home");
  //         }
  //       }
  //     })();
  //   }
  // }, [isRefreshed]);

  // useEffect(() => {
  //   let timeoutId;
  //   if (popup.isActive) {
  //     timeoutId = setTimeout(() => {
  //       popup.onDisable();
  //     }, 6000);
  //   }
  //   return () => {
  //     clearTimeout(timeoutId);
  //   };
  // }, [popup]);

  const removeQueries = (values) => {
    return Object.keys(currentQuery).reduce((nouvelObjet, cle) => {
      if (!values.includes(cle)) {
        nouvelObjet[cle] = currentQuery[cle];
      }
      return nouvelObjet;
    }, {});
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
          setLoadingBar,
          removeQueries,
        }}
      >
        <RootLayout>
          <TopLoadingBar
            width={widthProgressBar}
            visible={widthProgressBar > 0}
          />
          {children}
        </RootLayout>
      </UidContext.Provider>
    );
}
