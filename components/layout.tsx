import Head from "next/head";
import Image from "next/image";
import styles from "./layout.module.css";
import utilStyles from "../styles/utils.module.css";
import Link from "next/link";
import Navbar from "./navbar";
import React, { useState, useEffect } from "react";
import style from "react-syntax-highlighter/dist/esm/styles/hljs/a11y-dark";

const name = "Stiti Fatah";
export const siteTitle = "Fatah Stiti -- Blog Potfolio";
const blog_name = "Portfolio/Blog";

const get_back_to_home_link = (lang) => {
  if (lang === "fr") {
    return (
      <Link href="/">
        <a>← Retour Acceuil</a>
      </Link>
    );
  } else if (lang === "en") {
    return (
      lang === "en" && (
        <Link href="/en">
          <a>← Back To Home </a>
        </Link>
      )
    );
  }
};

const get_back_to_home_simple_link = (lang) => {
  if (lang === "fr") {
    return "/";
  } else if (lang === "en") {
    return "/en";
  }
};

const get_image = () => {
  return (
    <Image
      priority
      src="/images/arch_logo.png"
      className="rounded-full"
      height={70}
      width={70}
      alt={name}
    />
  );
};

export default function Layout({
  children,
  home,
  lang,
  // dark_mode,
  // set_dark_mode,
}) {
  return (
    <div className="w-11/12 mx-auto md:w-3/4 lg:w-2/3 ">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Stiti Fatah's protfolio and blog" />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <header className="">
        <Navbar
          home={home}
          lang={lang}
          blog_name={blog_name}
          // dark_mode={dark_mode}
          // set_dark_mode={set_dark_mode}
        />
      </header>
      <main className="">{children}</main>
      {!home && <div className="">{get_back_to_home_link(lang)}</div>}
    </div>
  );
}
