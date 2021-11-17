import React, { useState, useEffect } from "react";
import DarkModeToggle from "react-dark-mode-toggle";
import {
  set_styles_to_light,
  set_styles_to_dark,
  set_ls_to,
  useDarkMode,
} from "../pages/_app";

export default function DarkMode() {
  const [dark_mode, set_dark_mode] = useDarkMode();

  const change_mode = () => {
    set_dark_mode(!dark_mode);
  };

  useEffect(() => {
    console.log("App useEffect");

    if (dark_mode !== null) {
      console.log("App useEffect validated");

      if (dark_mode) {
        set_styles_to_dark();
        set_ls_to("dark");
      } else {
        set_styles_to_light();
        set_ls_to("light");
      }
    }
  }, [dark_mode]);

  return (
    <DarkModeToggle onChange={change_mode} checked={dark_mode} size={50} />
  );
}
