import "@/styles/globals.css";
import { SettingsControl } from "@/components/dashboard/controls/settings/settings-control";
import React, { useState, useEffect } from "react";
import type { AppProps } from "next/app";
import Head from "next/head";
import {
  ThemeProvider,
  CssBaseline,
  Box,
  StyledEngineProvider,
} from "@mui/material";
import { darkTheme, lightTheme } from "../styles/themes";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import { store } from "@/app";
import { BackgroundChanger } from "@/components/dashboard/controls";
import { Files } from "@/components/dashboard/controls/files";

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [backgroundImage, setBackgroundImage] =
    useState<string>("/background.jpeg");

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

    const fetchBackgroundImage = async () => {
      try {
        const response = await fetch("/api/config/background");
        const blob = await response.blob();
        const imageUrl = URL.createObjectURL(blob);
        setBackgroundImage(imageUrl);
      } catch (error) {
        console.error("Error fetching background image:", error);
      }
    };

    fetchBackgroundImage();
  }, [isDarkMode]);

  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>

      <Provider store={store}>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
            <CssBaseline />
            <div className="global-controls">
              <BackgroundChanger className="global-control" />
              <SettingsControl className="global-control" />
              <Files className="global-control" />
            </div>
            <Box
              className="mainWrapper"
              sx={{
                bgcolor: "background.default",
                margin: 0,
                padding: 0,
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: "cover",
              }}
            >
              <ToastContainer />
              <Component {...pageProps} />
            </Box>
          </ThemeProvider>
        </StyledEngineProvider>
      </Provider>
    </>
  );
};

export default App;
