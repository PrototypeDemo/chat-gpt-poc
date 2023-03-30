import { useState, useEffect } from "react";
import "./App.css";
import "@fontsource/roboto"; // Loading Roboto font. MUI was designed with this font in mind.
import {
  FormGroup,
  FormControlLabel,
  CssBaseline,
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Tooltip,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MessageIcon from "@mui/icons-material/Message";
import QuillEditor from "./QuillEditor/QuillEditor";
import Footer from "./CommonComponents/Footer/Footer";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

// Define custom palette colors
const customColors = {
  primary: {
    main: "#861DDD",
  },
  primaryLight: {
    main: "#EDDDF6",
  },
  newprimary: {
    main: "#FFFFFF",
  },
  secondary: {
    main: "#665A6F",
  },
  error: {
    main: "#ba1b1b",
  },
  charcoal: {
    main: "#333333",
  },
  background: {
    default: "#f9f9f9",
  },
};

// Define custom palette colors
const darkCustomColors = {
  primary: {
    main: "#861DDD",
  },
  primaryLight: {
    main: "#EDDDF6",
  },
  secondary: {
    main: "#665A6F",
  },
  error: {
    main: "#ba1b1b",
  },
  charcoal: {
    main: "#333333",
  },
};

// Define theme settings with custom colors
const light = createTheme({
  palette: {
    mode: "light",
    ...customColors,
  },
});

const dark = createTheme({
  palette: {
    mode: "dark",
    ...darkCustomColors,
  },
});

const App = () => {
  // Load the theme preference from local storage
  const [isDarkTheme, setIsDarkTheme] = useState(
    localStorage.getItem("isDarkTheme") === "true"
  );

  // This function is triggered when the Switch component is toggled
  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  // Save the theme preference to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("isDarkTheme", isDarkTheme);
  }, [isDarkTheme]);

  // const [isDarkTheme, setIsDarkTheme] = useState(
  //   localStorage.getItem("isDarkTheme") === "true"
  // );

  // const toggleTheme = () => {
  //   setIsDarkTheme(!isDarkTheme);
  // };

  // useEffect(() => {
  //   localStorage.setItem("isDarkTheme", isDarkTheme);
  // }, [isDarkTheme]);

  return (
    <ThemeProvider theme={isDarkTheme ? dark : light}>
      <CssBaseline />

      <div className="App">
        <Box>
          <AppBar position="static">
            <Toolbar color="newprimary">
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <MessageIcon />
              </IconButton>
              <Typography variant="h6" className="logo-text">
                ChatGPT-POC
              </Typography>
              {/* <FormGroup className="theme-btn">
                <FormControlLabel
                  control={
                    <Switch checked={isDarkTheme} onChange={changeTheme} />
                  }
                  label="Dark Theme"
                />
              </FormGroup> */}

              <FormGroup className="theme-btn">
                <FormControlLabel
                  control={
                    isDarkTheme ? (
                      <Tooltip title="Light Theme">
                        <LightModeIcon onClick={toggleTheme} />
                      </Tooltip>
                    ) : (
                      <Tooltip title="Dark Theme">
                        <DarkModeIcon onClick={toggleTheme} />
                      </Tooltip>
                    )
                  }
                  // label={isDarkTheme ? "Light Theme" : "Dark Theme"}
                />
              </FormGroup>
            </Toolbar>
          </AppBar>
        </Box>
        <QuillEditor />
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default App;
