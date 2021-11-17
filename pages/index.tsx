import Head from "next/head";
import Link from "next/link";
import CommonHome from "../components/common_index";
import Date from "../components/dates";
import Layout, { siteTitle } from "../components/layout";
import { getSortedPostsData } from "../lib/posts";
import utilStyles from "../styles/utils.module.css";
import { useContext } from "react";

const lang = "fr";
const posts_directory = "posts/fr";

export async function getStaticProps() {
  const allPostsData = getSortedPostsData(posts_directory);

  return {
    props: {
      allPostsData,
    },
  };
}

export default function Home({ allPostsData, dark_mode, set_dark_mode }) {
  return (
    <Layout
      home={true}
      lang={lang}
      // dark_mode={dark_mode}
      // set_dark_mode={set_dark_mode}
    >
      <CommonHome post_data={allPostsData} lang={lang} />
    </Layout>
  );
}
