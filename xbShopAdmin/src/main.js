import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
// import {
//     BrowserRouter as Router,
//     Route,
//     Redirect,
//     Switch,
// } from 'react-router-dom';

import App from "./App";
import Store from "./store";

// import { initGoogleService } from './assets/scripts/googlePlace.init';
// import { getPath, validRouteParams } from './utils/routeHelper';
// import CalConfig from './assets/scripts/calendar.config';
// import '../../lib/style/iconfont.scss';
// import '../../lib/scripts/iconfont';

// window.initGoogleService = initGoogleService; // as callback

// const redirectPath = getPath(new Date(), {
//     lang: CalConfig.defaultLocale,
//     layout: CalConfig.defaultLayout,
// });

ReactDOM.render(
  <Provider store={Store}>
    <App />
    {/* <Router basename="/">
            <Switch>
                <Route
                    path="/:lang/:layout/:year/:month/:date"
                    render={({ ...props }) => {
                        if (validRouteParams(props.match.params)) {
                            return <App {...props} />;
                        } else {
                            return <Redirect to={redirectPath} />;
                        }
                    }}
                />
                <Redirect from="*" to={redirectPath} />
            </Switch>
        </Router> */}
  </Provider>,
  document.getElementById("root")
);

if (module.hot && process.env.NODE_ENV === "development") {
  module.hot.accept();
}
