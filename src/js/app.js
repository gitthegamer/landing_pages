// Import React and ReactDOM
import React from "react";
import { createRoot } from "react-dom/client";

// Import Framework7
import Framework7 from "framework7/lite-bundle";

// Import Framework7-React Plugin
import Framework7React from "framework7-react";

// Import Icons and App Custom Styles
import "../css/custom-style-class.scss";

//TODO:REMOVE OLD CLASS WHEN custom-style-class FINISHED
import "../css/custom-style-class-old.scss";

// Import Framework7 Styles
import "framework7/css/bundle";

import "../css/icons.css";
import "../css/app.scss";

import "../css/web.scss";

// Import App Component
import "../library/Axios.jsx";
import "../i18n.jsx";
import Main from "../components/main.jsx";
// Init F7 React Plugin
Framework7.use(Framework7React);

// Mount React App
const root = createRoot(document.getElementById("app"));
root.render(React.createElement(Main));
