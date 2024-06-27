import "./App.css";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { ThemeProvider } from "./features/theming/context/themeProvider";
import { Theme } from "./features/theming/context/themeContext";
import { I18nProvider, LOCALES } from "./intl";
import { getUser } from "./redux/slices/user";
import MainLayout from "./layouts/main-layout/MainLayout";
import { MainPage } from "./pages/MainPage/MainPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";

const AuthRoutes = () => (
  <Routes>
    <Route path="/" element={<MainLayout />}>
      <Route path="" element={<MainPage />} />
      <Route path="/auth" element={<LoginPage />} />
      <Route path="/registration" element={<RegistrationPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  </Routes>
);

function App() {
  const dispatch = useDispatch();
  const [locale, setLocale] = useState(LOCALES.ENGLISH);

  useEffect(() => {
    // @ts-ignore
    dispatch(getUser());
  }, []);

  const themeDefautl =
    (window.localStorage.getItem("doggee-theme") as Theme) ?? "light";

  return (
    <I18nProvider locale={locale}>
      <ThemeProvider theme={themeDefautl}>
        <AuthRoutes />
      </ThemeProvider>
    </I18nProvider>
  );
}

export default App;
