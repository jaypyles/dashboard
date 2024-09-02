import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";

import React, { useState, useEffect } from "react";
import type { AppProps } from "next/app";
import Head from "next/head";
import { ThemeProvider, CssBaseline, Container, Box } from "@mui/material";
import { darkTheme, lightTheme } from "../styles/themes";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setIsDarkMode(savedTheme === "dark");
    } else {
      const prefersDarkMode = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setIsDarkMode(prefersDarkMode);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
  };

  return (
    <>
      <Head>
        <title>Managerr</title>
      </Head>
      <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
        <CssBaseline />
        <Box
          className="mainWrapper"
          sx={{ bgcolor: "background.default", margin: 0, padding: 0 }}
        >
          <ToastContainer />
          <Component {...pageProps} />
        </Box>
      </ThemeProvider>
    </>
  );
};

export default App;
