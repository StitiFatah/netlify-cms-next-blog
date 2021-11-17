import Head from "next/head";
import CommonPost from "../../components/common_id_posts";
import Date from "../../components/dates";
import Layout from "../../components/layout";
import { getAllPostIds, getPostData } from "../../lib/posts";
import utilStyles from "../../styles/utils.module.css";

const posts_directory = "posts/fr";
const lang = "fr";

export async function getStaticPaths() {
  const paths = getAllPostIds(posts_directory);
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id, posts_directory);
  return {
    props: {
      postData,
    },
  };
}

export default function Post({ postData, dark_mode, set_dark_mode }) {
  return (
    <Layout
      home={false}
      lang="fr"
      //dark_mode={dark_mode}
      //set_dark_mode={set_dark_mode}
    >
      <CommonPost post_data={postData} lang={lang} />
    </Layout>
  );
}
