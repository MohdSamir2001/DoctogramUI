import React from "react";
import AppRoutes from "./routes/AppRoutes";
import { BrowserRouter } from "react-router";
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </div>
  );
};

export default App;
