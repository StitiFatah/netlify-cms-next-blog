import "../styles/global.css";
import React, { useState, useEffect } from "react";

const darkbgcolor = "#282C35";

const initial_color_mode = () => {
  if (typeof window !== "undefined") {
    const ls_dark_mode = localStorage.getItem("fs_blog_dark_mode");
    if (ls_dark_mode === "dark") {
      console.log("initial dark theme");
      return true;
    }
    console.log("initial white theme");
    return false;
  }
};

export const set_styles_to_dark = () => {
  console.log("set style to dark");
  document.querySelector("html").style.background = darkbgcolor;
  document.querySelector("html").classList.add("dark");
};

export const set_styles_to_light = () => {
  console.log("set style to light");

  document.querySelector("html").style.background = "white";
  document.querySelector("html").classList.remove("dark");
};

export const set_ls_to = (dark_white: "dark" | "light") => {
  localStorage.setItem(
    "fs_blog_dark_mode",
    dark_white === "dark" ? "dark" : "light"
  );
};

const DarkContext = React.createContext(undefined);

const useDarkModeValues = () => {
  const [dark, setDark] = useState<boolean>(() => initial_color_mode());
  const values = [dark, setDark];

  return values;
};

const DarkModeContextProvider = (props) => {
  const values = useDarkModeValues();

  return <DarkContext.Provider value={values} {...props} />;
};

export const useDarkMode = () => {
  const context = React.useContext(DarkContext);
  if (!context) {
    throw new Error("This Should be wrapped inside a DarkModeContextProvider");
  }
  return context;
};

export default function App({ Component, pageProps }) {
  return (
    <DarkModeContextProvider>
      <Component {...pageProps} />
    </DarkModeContextProvider>
  );
}
