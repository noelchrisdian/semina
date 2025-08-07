import "bootstrap/dist/css/bootstrap.min.css";
import { createRoot } from 'react-dom/client';
import { Provider } from "react-redux";
import { StrictMode } from 'react';
import { App } from './App';
import { store } from "./redux/store";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
)