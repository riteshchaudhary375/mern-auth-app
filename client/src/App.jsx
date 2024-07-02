import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Header from "./components/Header";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import PrivateRouter from "./components/PrivateRouter";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import PageNotFound from "./pages/PageNotFound";
import Success from "./pages/Success";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<PrivateRouter />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/success" element={<Success />} />
        <Route path="/page-not-found" element={<PageNotFound />} />
        <Route path="/forgot/password" element={<ForgotPassword />} />
        <Route path="/reset/password/:id/:token" element={<ResetPassword />} />
        {/* <Route path="/reset/password" element={<ResetPassword />} /> */}
      </Routes>
    </BrowserRouter>
  );
}
