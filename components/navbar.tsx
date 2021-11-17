import Link from "next/link";
import * as React from "react";
import { useState, useEffect } from "react";
import DarkMode from "./darkmode";
import LangageSwitcher from "./langage_switcher";
import style from "../styles/utils.module.css";

export default function Navbar({
  home,
  blog_name,
  lang,
  // dark_mode,
  // set_dark_mode,
}) {
  const home_link = (lang) => {
    if (lang === "fr") {
      return "/";
    } else if (lang === "en") {
      return "/en";
    }
  };

  const get_name = (home, lang) => {
    const get_name_class = `${style.blogTitle} ${
      home
        ? "text-black dark:text-white"
        : "text-purple-700 dark:text-purple-200"
    } `;
    if (home) {
      return <div className={get_name_class}> {blog_name}</div>;
    } else {
      return (
        <Link href={home_link(lang)}>
          <a style={{ textDecoration: "none" }} className={get_name_class}>
            {blog_name}
          </a>
        </Link>
      );
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-center mt-6 mb-16">
      {get_name(home, lang)}

      <div className="flex flex-row items-center mt-4 md:mt-0">
        <div className="mx-2">
          <LangageSwitcher actual_langage={lang} />
        </div>
        <DarkMode />
      </div>
    </div>
  );
}
