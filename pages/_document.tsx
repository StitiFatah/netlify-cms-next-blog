import Document, { Html, Head, Main, NextScript } from "next/document";
import React, { useState, useEffect } from "react";

export default class MyDocument extends Document {
  render() {
    return (
      <Html className="">
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Allison&display=swap"
            rel="stylesheet"
          ></link>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
