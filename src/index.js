import React from "react";
import ReactDOM from "react-dom";
import Core from "./core";
import * as serviceWorker from "./serviceWorker";

// TODO: USE STRICT MODE WHEN:
// https://github.com/apollographql/react-apollo/issues/3635  # APOLLO
// https://github.com/mui-org/material-ui/issues/13394  # MATERIAL_UI
// https://github.com/jaydenseric/apollo-upload-client/issues/174  # APOLLO_UPLOAD_CLIENT
ReactDOM.render(<Core />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
