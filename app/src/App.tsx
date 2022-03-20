import { lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "components/layout/Layout";
import { AuthProvider } from "state/auth/AuthContext";

const Home = lazy(() => import("views/home/Home"));
const SignIn = lazy(() => import("views/sign-in/SignIn"));
const SignUp = lazy(() => import("views/sign-up/SignUp"));

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
