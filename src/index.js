import React from "react";
import ReactDOM from "react-dom";
import Form from "./js/components/Form";

import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';

const wrapper = document.getElementById("container");
wrapper ? ReactDOM.render(<Form />, wrapper) : false;