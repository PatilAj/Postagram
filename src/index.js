import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// import 'bootstrap/dist/css/bootstrap.min.css';
import "./index.css";
import { Toaster } from "react-hot-toast";
import GlobalContextProvider from "./State/Context/GlobalContext";

const Index = () => {
  return (
    <GlobalContextProvider>
      <App />
      <Toaster />
    </GlobalContextProvider>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<Index />);
