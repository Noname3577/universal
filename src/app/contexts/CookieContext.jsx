/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { createContext, useState, useEffect } from "react";
import Cookies from "universal-cookie";

export const CookieContext = createContext();

export const CookieProvider = ({ children }) => {
  const cookies = new Cookies();
  const [cookiesAccepted, setCookiesAccepted] = useState(false);
  const [cookiesPreferences, setCookiesPreferences] = useState({
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const savedPreferences = cookies.get("cookiePreferences");
    if (savedPreferences) {
      setCookiesPreferences(savedPreferences);
      setCookiesAccepted(true);
    }
  }, [cookies]);

  const acceptAllCookies = () => {
    setCookiesAccepted(true);
    const preferences = { analytics: true, marketing: true };
    setCookiesPreferences(preferences);
    cookies.set("cookiePreferences", preferences, { path: "/" });
  };

  const saveCookiePreferences = (preferences) => {
    setCookiesPreferences(preferences);
    setCookiesAccepted(true);
    cookies.set("cookiePreferences", preferences, { path: "/" });
  };

  return (
    <CookieContext.Provider
      value={{
        cookiesAccepted,
        cookiesPreferences,
        acceptAllCookies,
        saveCookiePreferences,
      }}
    >
      {children}
    </CookieContext.Provider>
  );
};
