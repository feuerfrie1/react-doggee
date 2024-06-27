import ReactDOM from "react-dom/client";
import "./static/css/fonts.css";
import "./static/css/global.css";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import { StoreProvider } from "./utils/contextes/store/StoreProvider";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <StoreProvider>
        <App />
      </StoreProvider>
    </Provider>
  </BrowserRouter>
);
