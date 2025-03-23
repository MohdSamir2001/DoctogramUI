import React from "react";
import AppRoutes from "./routes/AppRoutes";
import { BrowserRouter } from "react-router";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Provider store={appStore}>
          <AppRoutes />
        </Provider>
      </BrowserRouter>
    </div>
  );
};

export default App;
