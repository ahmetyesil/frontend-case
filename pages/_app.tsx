import { AppProps } from "next/app";
import wrapper from "@/Redux/store";
import "@/Public/styles/global.css";
import React from "react";

function MyApp({ Component, pageProps }: AppProps) {
  return (
      <Component {...pageProps} />
  );
}
export default wrapper.withRedux(MyApp);
