import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import './styles/common.css'; // Import the common CSS file
import { SessionProvider } from './context/SessionContext';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <SessionProvider>
      <App />
    </SessionProvider>
    </Provider>
  </React.StrictMode>
);
